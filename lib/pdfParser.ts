import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure pdf.js worker URL locally
try {
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
  }
} catch (e) {
  console.warn('pdfjs worker configuration warning:', e);
}

/**
 * Fast direct extraction of readable text from uncompressed PDF streams
 * Serves as an instant 0ms fallback if worker initialization is delayed
 */
function fastExtractAsciiTextFromPdf(uint8: Uint8Array): string {
  try {
    if (!uint8 || uint8.byteLength === 0) return '';
    if ('detached' in (uint8.buffer as any) && (uint8.buffer as any).detached) return '';

    const textDecoder = new TextDecoder('latin1');
    const raw = textDecoder.decode(uint8);
    
    // Find text inside TJ / Tj operators: e.g. (Some Text) Tj or [(Some) -20 (Text)] TJ
    const textMatches: string[] = [];
    const tjRegex = /\(((?:\\.|[^\(\)])*)\)\s*Tj/g;
    let match;
    while ((match = tjRegex.exec(raw)) !== null) {
      const clean = match[1].replace(/\\([()\\])/g, '$1').trim();
      if (clean.length > 0) textMatches.push(clean);
    }
    
    // Also parse array TJ: [ (text) 10 (text2) ] TJ
    const arrayTjRegex = /\[((?:[^\]]*))\s*\]\s*TJ/g;
    while ((match = arrayTjRegex.exec(raw)) !== null) {
      const inner = match[1];
      const innerStrRegex = /\(((?:\\.|[^\(\)])*)\)/g;
      let innerMatch;
      const rowParts: string[] = [];
      while ((innerMatch = innerStrRegex.exec(inner)) !== null) {
        const clean = innerMatch[1].replace(/\\([()\\])/g, '$1');
        if (clean) rowParts.push(clean);
      }
      if (rowParts.length > 0) {
        textMatches.push(rowParts.join(''));
      }
    }

    if (textMatches.length >= 10) {
      return textMatches.join(' ').replace(/\s{2,}/g, ' ').trim();
    }
    return '';
  } catch (e) {
    return '';
  }
}

/**
 * Extracts plain text from an ArrayBuffer containing PDF bytes directly on the client side.
 * Protected against ArrayBuffer detachment and timeouts.
 */
export async function extractTextFromPdfBuffer(arrayBuffer: ArrayBuffer, timeoutMs = 1500): Promise<string> {
  if (!arrayBuffer || arrayBuffer.byteLength === 0 || (('detached' in (arrayBuffer as any)) && (arrayBuffer as any).detached)) {
    return '';
  }

  // Pre-extract fallback string synchronously from an independent copy BEFORE any worker operations.
  // This guarantees we never attempt to construct a TypedArray on a detached ArrayBuffer.
  let fallbackAscii = '';
  try {
    if (!('detached' in (arrayBuffer as any) && (arrayBuffer as any).detached)) {
      const backupBuffer = arrayBuffer.slice(0);
      fallbackAscii = fastExtractAsciiTextFromPdf(new Uint8Array(backupBuffer));
    }
  } catch (backupErr) {
    console.warn('Initial PDF stream extraction note:', backupErr);
  }

  let timeoutTimer: ReturnType<typeof setTimeout> | null = null;
  let loadingTask: any = null;

  const parsePromise = async (): Promise<string> => {
    try {
      if (('detached' in (arrayBuffer as any)) && (arrayBuffer as any).detached) {
        return fallbackAscii;
      }
      // Pass a dedicated slice clone to pdfjs so that even if pdfjs detaches its buffer via postMessage transfer,
      // no other references in the app are affected.
      const workerBuffer = arrayBuffer.slice(0);
      const uint8Data = new Uint8Array(workerBuffer);

      loadingTask = pdfjsLib.getDocument({
        data: uint8Data,
        useSystemFonts: true,
      });

      const pdf = await loadingTask.promise;
      const numPages = Math.min(pdf.numPages, 10); // Limit to first 10 pages for resumes/profiles
      const pageTextPromises: Promise<string>[] = [];

      for (let i = 1; i <= numPages; i++) {
        pageTextPromises.push(
          pdf.getPage(i).then(async (page: any) => {
            const textContent = await page.getTextContent();
            let lastY: number | null = null;
            let text = '';

            for (const item of textContent.items as any[]) {
              if (!('str' in item)) continue;
              
              if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                text += '\n';
              } else if (text.length > 0 && !text.endsWith(' ') && !text.endsWith('\n')) {
                text += ' ';
              }
              
              text += item.str;
              lastY = item.transform[5];
            }
            return text;
          }).catch((pageErr: any) => {
            console.warn(`Error parsing PDF page ${i}:`, pageErr);
            return '';
          })
        );
      }

      const pagesText = await Promise.all(pageTextPromises);
      const combined = pagesText.join('\n\n').trim();

      const formatted = combined.replace(/\n{3,}/g, '\n\n');
      if (formatted.length > 50) {
        return formatted;
      }
      
      return fallbackAscii;
    } catch (parseErr) {
      console.warn('pdfjs parser notice, falling back to stream or server:', parseErr);
      return fallbackAscii;
    }
  };

  const timeoutPromise = new Promise<string>((resolve) => {
    timeoutTimer = setTimeout(() => {
      if (loadingTask) {
        try {
          loadingTask.destroy();
        } catch (_) {}
      }
      resolve(fallbackAscii);
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([parsePromise(), timeoutPromise]);
    if (result && result.trim().length > 30) {
      return result.trim();
    }
    return fallbackAscii;
  } catch (err) {
    console.warn('Client-side PDF extraction error:', err);
    return fallbackAscii;
  } finally {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
      timeoutTimer = null;
    }
  }
}
