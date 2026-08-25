import dotenv from 'dotenv';
dotenv.config();

export function validateLinkedInUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  // Validates standard LinkedIn profile URLs
  const linkedinRegex = /^https?:\/\/(?:[a-z]{2,3}\.)?linkedin\.com\/(?:in|pub)\/([a-zA-Z0-9_-]+)/i;
  return linkedinRegex.test(trimmed);
}

export interface FirecrawlScrapeResult {
  success: boolean;
  markdown?: string;
  metadata?: any;
  error?: string;
  isBlockedOrPrivate?: boolean;
}

/**
 * Scrapes a public LinkedIn URL using Firecrawl
 */
export async function scrapeLinkedInProfile(url: string): Promise<FirecrawlScrapeResult> {
  const trimmedUrl = url.trim();
  
  if (!validateLinkedInUrl(trimmedUrl)) {
    return {
      success: false,
      error: "Please enter a valid public LinkedIn profile URL (e.g. https://www.linkedin.com/in/username)"
    };
  }

  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "undefined") {
    return {
      success: false,
      error: "Firecrawl API key is not configured. Please provide your profile details manually or configure FIRECRAWL_API_KEY in server settings.",
      isBlockedOrPrivate: true
    };
  }

  try {
    // Dynamic import of @mendable/firecrawl-js
    const FirecrawlApp = (await import('@mendable/firecrawl-js')).default;
    const firecrawl = new FirecrawlApp({ apiKey: apiKey.trim() });

    console.log(`[Firecrawl Service]: Scraping LinkedIn profile: ${trimmedUrl}`);
    
    // Call scrape with markdown format and main content extraction
    const scrapeResponse: any = await firecrawl.scrapeUrl(trimmedUrl, {
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 2500, // Allow JS hydrate
      timeout: 15000
    });

    if (scrapeResponse && scrapeResponse.success && scrapeResponse.markdown) {
      const content = scrapeResponse.markdown;
      
      // Check if LinkedIn returned an auth wall or login screen
      const lowerContent = content.toLowerCase();
      if (
        lowerContent.includes("sign in | linkedin") || 
        lowerContent.includes("authwall") ||
        lowerContent.includes("join linkedin") ||
        lowerContent.length < 150
      ) {
        return {
          success: false,
          markdown: content,
          error: "This LinkedIn profile requires login or is set to private. Please use the manual paste option to evaluate your profile.",
          isBlockedOrPrivate: true
        };
      }

      return {
        success: true,
        markdown: content,
        metadata: scrapeResponse.metadata || {}
      };
    } else {
      const rawError = scrapeResponse?.error || "";
      const isSiteBlocked = rawError.toLowerCase().includes("do not support this site") || 
                            rawError.toLowerCase().includes("typeform") ||
                            rawError.toLowerCase().includes("blocked") ||
                            rawError.toLowerCase().includes("forbidden");

      return {
        success: false,
        error: isSiteBlocked 
          ? "LinkedIn requires authentication to view profiles directly and restricts external automated web crawlers. Please paste your profile details below (or load our example profile) to run your 100-point AI audit."
          : (rawError || "We couldn't automatically access this LinkedIn profile. Please paste your profile details below for a full audit."),
        isBlockedOrPrivate: true
      };
    }
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    console.warn("[Firecrawl Service Notice]:", errorMsg);
    
    // Catch site-not-supported or auth restrictions gracefully
    return {
      success: false,
      error: "LinkedIn requires authentication to view profiles directly and restricts automated web crawlers. Please paste your profile details below (or load our example profile) to run your 100-point AI audit.",
      isBlockedOrPrivate: true
    };
  }
}
