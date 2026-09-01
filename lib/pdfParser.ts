import * as pdfjsLib from 'pdfjs-dist';

// Configure pdf.js worker URL
try {
  if (typeof window !== 'undefined') {
    const version = pdfjsLib.version || '4.0.379';
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
  }
} catch (e) {
  console.warn('pdfjs worker configuration warning:', e);
}

/**
 * Extracts plain text from an ArrayBuffer containing PDF bytes directly on the client side.
 * Protected with a strict 1200ms timeout to prevent UI freezes.
 */
export async function extractTextFromPdfBuffer(arrayBuffer: ArrayBuffer): Promise<string> {
  const parsePromise = async (): Promise<string> => {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
    });
    const pdf = await loadingTask.promise;
    const numPages = Math.min(pdf.numPages, 10); // Limit to first 10 pages for resumes
    const pageTextPromises: Promise<string>[] = [];

    for (let i = 1; i <= numPages; i++) {
      pageTextPromises.push(
        pdf.getPage(i).then(async (page) => {
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
        }).catch(pageErr => {
          console.warn(`Error parsing PDF page ${i}:`, pageErr);
          return '';
        })
      );
    }

    const pagesText = await Promise.all(pageTextPromises);
    const combined = pagesText.join('\n\n').trim();

    return combined.replace(/\n{3,}/g, '\n\n');
  };

  const timeoutPromise = new Promise<string>((resolve) => {
    setTimeout(() => resolve(''), 1200);
  });

  try {
    return await Promise.race([parsePromise(), timeoutPromise]);
  } catch (err) {
    console.warn('Client-side PDF extraction skipped:', err);
    return '';
  }
}
