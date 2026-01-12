import { useEffect, useRef } from "react";

export default function SugarMute() {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupLoadedRef = useRef(false);

  // Load and inject SugarMute CSS
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    // Force body to be visible and reset global styles (override CSS that hides it)
    const styleOverride = document.createElement('style');
    styleOverride.setAttribute('data-sugarmute-override', 'true');
    styleOverride.textContent = `
      /* Reset and visibility overrides */
      body { 
        display: block !important; 
        opacity: 1 !important;
        visibility: visible !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Ensure sugarmute wrapper is visible and isolated */
      .sugarmute-wrapper { 
        display: block !important; 
        opacity: 1 !important;
        visibility: visible !important;
        position: relative !important;
        width: 100% !important;
        min-height: 100vh !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        font-size: 16px !important;
        line-height: 1.5 !important;
        color: #272727 !important;
        background: white !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Ensure all elements inside wrapper inherit properly */
      .sugarmute-wrapper * {
        box-sizing: border-box !important;
      }
      
      /* Force visibility of all content */
      .sugarmute-wrapper img {
        display: inline-block !important;
        max-width: 100% !important;
        height: auto !important;
      }
      
      .sugarmute-wrapper a {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      .sugarmute-wrapper button,
      .sugarmute-wrapper .btn,
      .sugarmute-wrapper .btn-new {
        display: inline-block !important;
        padding: 0.5rem 1rem !important;
        background-color: #007953 !important;
        color: white !important;
        border: none !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        text-decoration: none !important;
      }
      
      .async-hide {
        opacity: 1 !important;
      }

      /* Override Tailwind/global resets inside sugarmute wrapper */
      .sugarmute-wrapper * {
        box-sizing: border-box;
      }

      /* Ensure Bootstrap grid works properly */
      .sugarmute-wrapper .container-fluid,
      .sugarmute-wrapper .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }

      .sugarmute-wrapper .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
      }

      .sugarmute-wrapper [class*="col-"] {
        position: relative;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
      }
      
      /* Hide Vercel badge/button */
      [data-vercel-badge],
      [data-vercel-badge-wrapper],
      a[href*="vercel.com"],
      a[href*="vercel.live"],
      iframe[src*="vercel"],
      div[class*="vercel"],
      div[id*="vercel"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
      }
    `;
    document.head.appendChild(styleOverride);

    // Cleanup - remove CSS when unmounting
    return () => {
      links.forEach(link => link.remove());
      const overrideStyle = document.head.querySelector('style[data-sugarmute-override="true"]');
      if (overrideStyle) {
        overrideStyle.remove();
      }
    };
  }, []);

  // Update meta tags for SugarMute page
  useEffect(() => {
    // Save original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');

    // Set SugarMute specific meta tags
    document.title = "SugarMute™ Official | Natural Blood Sugar Support Supplement - 90 Day Guarantee";
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', 'Support healthy blood sugar levels naturally with SugarMute™. 10 carefully-selected ingredients including Black Walnut, Glucomannan & Aloe Vera. 90-day money-back guarantee. Free US shipping on 6-bottle orders.');
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', 'SugarMute™ Official | Natural Blood Sugar Support Supplement - 90 Day Guarantee');
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', 'Support healthy blood sugar levels naturally with SugarMute™. 10 carefully-selected ingredients. 90-day money-back guarantee. Free US shipping!');
    }

    // Cleanup - restore original meta tags on unmount
    return () => {
      document.title = originalTitle;
      
      if (descriptionMeta && originalDescription) {
        descriptionMeta.setAttribute('content', originalDescription);
      }
      
      if (ogTitleMeta && originalOgTitle) {
        ogTitleMeta.setAttribute('content', originalOgTitle);
      }
      
      if (ogDescriptionMeta && originalOgDescription) {
        ogDescriptionMeta.setAttribute('content', originalOgDescription);
      }
    };
  }, []);

  // Load external script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.ventrocdn.com/code/8223-762e1492-00fa-4aa2-9459-0aecc610de69";
    script.defer = true;
    script.setAttribute("data-sugarmute-external", "true");
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup - remove script on unmount
      const existingScript = document.querySelector('script[data-sugarmute-external="true"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    const loadHTML = async () => {
      try {
        // Pre-load main CSS file FIRST before anything else
        const mainCssLink = document.createElement("link");
        mainCssLink.rel = "stylesheet";
        mainCssLink.href = "/sugarmute/assets/css/style.css";
        mainCssLink.setAttribute("data-sugarmute-css-preload", "true");
        
        const cssPreloadPromise = new Promise<void>((resolve) => {
          mainCssLink.onload = () => {
            console.log("Pre-loaded main CSS successfully");
            resolve();
          };
          mainCssLink.onerror = () => {
            console.error("Failed to pre-load main CSS, will try again later");
            resolve(); // Continue anyway
          };
          setTimeout(() => {
            console.warn("CSS preload timeout");
            resolve();
          }, 3000);
        });
        
        document.head.appendChild(mainCssLink);
        await cssPreloadPromise;
        
        // Wait a bit more to ensure CSS is applied
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Try to load the HTML file with retry mechanism
        const urlsToTry = [
          "/sugarmute/index.html",
          `${window.location.origin}/sugarmute/index.html`,
          "/sugarmute/index.html?v=" + Date.now()
        ];
        
        let response: Response | null = null;
        let lastError: Error | null = null;
        
        for (const url of urlsToTry) {
          try {
            console.log(`Trying to fetch: ${url}`);
            const fetchResponse = await fetch(url, {
              headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
              },
              cache: 'no-store'
            });
            
            if (fetchResponse.ok) {
              response = fetchResponse;
              console.log(`Successfully fetched from: ${url}`);
              break;
            } else {
              console.warn(`Failed to fetch ${url}: ${fetchResponse.status} ${fetchResponse.statusText}`);
              lastError = new Error(`HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`);
            }
          } catch (fetchError) {
            console.warn(`Error fetching ${url}:`, fetchError);
            lastError = fetchError as Error;
          }
        }
        
        if (!response || !response.ok) {
          console.error('All fetch attempts failed');
          console.error('Response headers:', response ? Object.fromEntries(response.headers.entries()) : 'No response');
          throw lastError || new Error('HTML file not found - all URLs failed');
        }
        
        // Check content type
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        
        if (contentType && !contentType.includes('text/html')) {
          console.warn(`Unexpected content type: ${contentType}`);
        }
        
        const html = await response.text();
        
        // Verify we got HTML content
        if (!html || html.trim().length === 0) {
          throw new Error('Empty HTML content received');
        }
        
        if (!html.includes('<!DOCTYPE') && !html.includes('<html')) {
          console.error('Invalid HTML received (first 200 chars):', html.substring(0, 200));
          throw new Error('Invalid HTML content received - not an HTML document');
        }
        
        console.log('Successfully loaded HTML, length:', html.length);
        
        if (!containerRef.current) {
          return;
        }

        // Pre-process HTML string to fix ALL asset paths before parsing
        let preprocessedHTML = html;
        
        // Fix href attributes (CSS, links)
        preprocessedHTML = preprocessedHTML
          .replace(/href\s*=\s*["']assets\//gi, 'href="/sugarmute/assets/')
          .replace(/href\s*=\s*["']\/assets\//gi, 'href="/sugarmute/assets/')
          // Fix src attributes (images, scripts)
          .replace(/src\s*=\s*["']assets\//gi, 'src="/sugarmute/assets/')
          .replace(/src\s*=\s*["']\/assets\//gi, 'src="/sugarmute/assets/')
          // Fix srcset attributes (responsive images)
          .replace(/srcset\s*=\s*["']assets\//gi, 'srcset="/sugarmute/assets/')
          .replace(/srcset\s*=\s*["']\/assets\//gi, 'srcset="/sugarmute/assets/')
          // Fix url() in style attributes and inline styles
          .replace(/url\(["']?assets\//gi, 'url("/sugarmute/assets/')
          .replace(/url\(["']?\/assets\//gi, 'url("/sugarmute/assets/');
        
        // Verify that the CSS link was corrected
        if (preprocessedHTML.includes('href="assets/') || preprocessedHTML.includes("href='assets/")) {
          console.warn("Warning: Some asset paths may not have been corrected in preprocess step");
          preprocessedHTML = preprocessedHTML
            .replace(/href\s*=\s*["']assets\//gi, 'href="/sugarmute/assets/')
            .replace(/src\s*=\s*["']assets\//gi, 'src="/sugarmute/assets/');
        }
        
        // Log verification
        const cssLinkCheck = preprocessedHTML.match(/href=["']\/sugarmute\/assets\/css\/style\.css["']/);
        if (cssLinkCheck) {
          console.log("✓ CSS link path corrected successfully");
        } else {
          console.error("✗ CSS link path NOT corrected! HTML may still have incorrect paths");
          preprocessedHTML = preprocessedHTML.replace(/href=["']assets\/css\/style\.css["']/gi, 'href="/sugarmute/assets/css/style.css"');
        }
        
        // Parse the HTML AFTER all paths are corrected
        const parser = new DOMParser();
        const doc = parser.parseFromString(preprocessedHTML, "text/html");

        // Adjust asset paths to work from the root
        const basePath = "/sugarmute/assets/";
        
        // Fix and inject stylesheet links from HTML FIRST
        const cssLinks: Promise<void>[] = [];
        const cssHrefs: string[] = [];
        
        doc.head.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          const href = link.getAttribute("href");
          if (href) {
            let fixedHref = href;
            if (!href.startsWith("http") && !href.startsWith("/")) {
              if (href.startsWith("assets/")) {
                fixedHref = "/sugarmute/" + href;
              } else {
                fixedHref = basePath + href;
              }
            } else if (href.startsWith("/") && !href.startsWith("/sugarmute/")) {
              if (href.startsWith("/assets/")) {
                fixedHref = "/sugarmute" + href;
              }
            }
            
            cssHrefs.push(fixedHref);
            
            const existingLink = document.head.querySelector(`link[href="${fixedHref}"]`);
            if (!existingLink) {
              const newLink = document.createElement("link");
              newLink.rel = "stylesheet";
              newLink.href = fixedHref;
              newLink.setAttribute("data-sugarmute-css", "true");
              
              const cssPromise = new Promise<void>((resolve) => {
                newLink.onerror = () => {
                  console.error(`Failed to load CSS from HTML: ${fixedHref}`);
                  const altHref = fixedHref.replace("/sugarmute/sugarmute/", "/sugarmute/");
                  if (altHref !== fixedHref) {
                    console.log(`Trying alternative path: ${altHref}`);
                    newLink.href = altHref;
                  } else {
                    resolve();
                  }
                };
                newLink.onload = () => {
                  console.log(`Successfully loaded CSS from HTML: ${fixedHref}`);
                  resolve();
                };
                setTimeout(() => {
                  console.warn(`CSS load timeout for: ${fixedHref}`);
                  resolve();
                }, 5000);
              });
              
              document.head.appendChild(newLink);
              cssLinks.push(cssPromise);
            }
          }
        });
        
        // Also ensure main CSS is loaded directly as fallback
        const mainCssHref = "/sugarmute/assets/css/style.css";
        if (!cssHrefs.includes(mainCssHref)) {
          const existingMainCss = document.head.querySelector(`link[href="${mainCssHref}"]`);
          if (!existingMainCss) {
            const mainCssLink = document.createElement("link");
            mainCssLink.rel = "stylesheet";
            mainCssLink.href = mainCssHref;
            mainCssLink.setAttribute("data-sugarmute-css", "true");
            
            const mainCssPromise = new Promise<void>((resolve) => {
              mainCssLink.onload = () => {
                console.log(`Successfully loaded main CSS: ${mainCssHref}`);
                resolve();
              };
              mainCssLink.onerror = () => {
                console.error(`Failed to load main CSS: ${mainCssHref}`);
                resolve();
              };
              setTimeout(() => resolve(), 5000);
            });
            
            document.head.appendChild(mainCssLink);
            cssLinks.push(mainCssPromise);
          }
        }
        
        // Wait for all CSS files to load before injecting HTML
        await Promise.all(cssLinks);
        
        // Verify CSS was loaded
        const loadedCss = document.head.querySelectorAll('link[data-sugarmute-css="true"]');
        console.log(`Loaded ${loadedCss.length} CSS files for SugarMute`);
        
        // Force a reflow to ensure CSS is applied
        if (containerRef.current) {
          containerRef.current.offsetHeight;
        }
        
        // Remove stylesheet links from parsed doc to avoid duplication
        doc.head.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          link.remove();
        });
        
        doc.head.querySelectorAll("script[src]").forEach((script) => {
          script.remove();
        });

        // Fix link hrefs
        doc.querySelectorAll("link[href]").forEach((link) => {
          const href = link.getAttribute("href");
          if (href && !href.startsWith("http") && !href.startsWith("/")) {
            if (href.startsWith("assets/")) {
              link.setAttribute("href", "/sugarmute/" + href);
            } else {
              link.setAttribute("href", "/sugarmute/" + href);
            }
          }
        });

        // Fix script sources
        doc.querySelectorAll("script[src]").forEach((script) => {
          const src = script.getAttribute("src");
          if (src) {
            let fixedSrc = src;
            if (!src.startsWith("http") && !src.startsWith("/")) {
              if (src.startsWith("assets/")) {
                fixedSrc = "/sugarmute/" + src;
              } else {
                fixedSrc = "/sugarmute/" + src;
              }
              script.setAttribute("src", fixedSrc);
            } else if (src.startsWith("/assets/") && !src.startsWith("/sugarmute/")) {
              fixedSrc = "/sugarmute" + src;
              script.setAttribute("src", fixedSrc);
            }
          }
        });

        // Fix image sources
        doc.querySelectorAll("img[src]").forEach((img) => {
          const src = img.getAttribute("src");
          if (src) {
            let fixedSrc = src;
            if (!src.startsWith("http") && !src.startsWith("/") && !src.startsWith("data:")) {
              if (src.startsWith("assets/")) {
                fixedSrc = "/sugarmute/" + src;
              } else {
                fixedSrc = "/sugarmute/" + src;
              }
              img.setAttribute("src", fixedSrc);
            } else if (src.startsWith("/assets/") && !src.startsWith("/sugarmute/")) {
              fixedSrc = "/sugarmute" + src;
              img.setAttribute("src", fixedSrc);
            }
          }
        });

        // Fix picture sources
        doc.querySelectorAll("source[srcset]").forEach((source) => {
          const srcset = source.getAttribute("srcset");
          if (srcset) {
            let fixedSrcset = srcset;
            if (!srcset.startsWith("http") && !srcset.startsWith("/")) {
              if (srcset.startsWith("assets/")) {
                fixedSrcset = "/sugarmute/" + srcset;
              } else {
                fixedSrcset = basePath + srcset;
              }
              source.setAttribute("srcset", fixedSrcset);
            } else if (srcset.startsWith("/assets/") && !srcset.startsWith("/sugarmute/")) {
              fixedSrcset = "/sugarmute" + srcset;
              source.setAttribute("srcset", fixedSrcset);
            }
          }
        });

        // Extract and inject styles from both head and body
        const headStyles = doc.head.querySelectorAll("style");
        const bodyStyles = doc.body.querySelectorAll("style");
        const allStyles = [...Array.from(headStyles), ...Array.from(bodyStyles)];
        
        allStyles.forEach((style, index) => {
          const existingStyle = document.head.querySelector(`style[data-sugarmute-style="${index}"]`);
          if (!existingStyle) {
            const newStyle = document.createElement("style");
            newStyle.setAttribute("data-sugarmute-style", index.toString());
            let styleContent = style.textContent || "";
            styleContent = styleContent.replace(/url\(["']?assets\//g, 'url("/sugarmute/assets/');
            newStyle.textContent = styleContent;
            document.head.appendChild(newStyle);
          }
        });

        // Wait a bit more to ensure CSS is fully applied
        await new Promise(resolve => setTimeout(resolve, 100));

        // Remove scripts from body before injecting HTML
        const scriptsToExecute: { src?: string; content?: string; attributes: { [key: string]: string } }[] = [];
        doc.body.querySelectorAll("script").forEach((script) => {
          const scriptData: { src?: string; content?: string; attributes: { [key: string]: string } } = {
            attributes: {}
          };
          
          if (script.src) {
            let scriptSrc = script.getAttribute("src") || "";
            if (scriptSrc) {
              if (!scriptSrc.startsWith("http") && !scriptSrc.startsWith("/")) {
                if (scriptSrc.startsWith("assets/")) {
                  scriptSrc = "/sugarmute/" + scriptSrc;
                } else {
                  scriptSrc = "/sugarmute/" + scriptSrc;
                }
              } else if (scriptSrc.startsWith("/assets/") && !scriptSrc.startsWith("/sugarmute/")) {
                scriptSrc = "/sugarmute" + scriptSrc;
              }
            }
            console.log(`Loading script: ${scriptSrc}`);
            scriptData.src = scriptSrc;
          } else if (script.innerHTML) {
            scriptData.content = script.innerHTML;
          }
          
          Array.from(script.attributes).forEach((attr) => {
            if (attr.name !== 'src' && attr.name !== 'innerHTML') {
              scriptData.attributes[attr.name] = attr.value;
            }
          });
          
          scriptsToExecute.push(scriptData);
          script.remove();
        });

        // Final verification: ensure all paths in the HTML are correct
        let bodyHTML = doc.body.innerHTML;
        bodyHTML = bodyHTML
          .replace(/src=["']assets\//g, 'src="/sugarmute/assets/')
          .replace(/src=["']\/assets\//g, 'src="/sugarmute/assets/')
          .replace(/href=["']assets\//g, 'href="/sugarmute/assets/')
          .replace(/href=["']\/assets\//g, 'href="/sugarmute/assets/')
          .replace(/srcset=["']assets\//g, 'srcset="/sugarmute/assets/')
          .replace(/srcset=["']\/assets\//g, 'srcset="/sugarmute/assets/')
          .replace(/url\(["']?assets\//g, 'url("/sugarmute/assets/')
          .replace(/url\(["']?\/assets\//g, 'url("/sugarmute/assets/');
        
        let correctedBodyHTML = bodyHTML;

        // Final safety check
        const finalCheck = correctedBodyHTML.match(/["']assets\//g);
        if (finalCheck && finalCheck.length > 0) {
          console.warn(`Warning: Found ${finalCheck.length} uncorrected asset paths, fixing now...`);
          correctedBodyHTML = correctedBodyHTML
            .replace(/src=["']assets\//g, 'src="/sugarmute/assets/')
            .replace(/src=["']\/assets\//g, 'src="/sugarmute/assets/')
            .replace(/href=["']assets\//g, 'href="/sugarmute/assets/')
            .replace(/href=["']\/assets\//g, 'href="/sugarmute/assets/')
            .replace(/srcset=["']assets\//g, 'srcset="/sugarmute/assets/')
            .replace(/srcset=["']\/assets\//g, 'srcset="/sugarmute/assets/');
        }
        
        // Inject body content with corrected paths
        if (containerRef.current) {
          containerRef.current.innerHTML = correctedBodyHTML;

          // Execute scripts after a brief delay
          setTimeout(() => {
            scriptsToExecute.forEach((scriptData) => {
              const newScript = document.createElement("script");
              
              if (scriptData.src) {
                let finalSrc = scriptData.src;
                if (!finalSrc.startsWith("http") && !finalSrc.startsWith("/")) {
                  finalSrc = "/sugarmute/" + finalSrc;
                } else if (finalSrc.startsWith("/assets/") && !finalSrc.startsWith("/sugarmute/")) {
                  finalSrc = "/sugarmute" + finalSrc;
                }
                
                newScript.src = finalSrc;
                
                newScript.onerror = (error) => {
                  console.error(`Failed to load script: ${finalSrc}`, error);
                  fetch(finalSrc)
                    .then(response => response.text())
                    .then(text => {
                      console.error(`Response for ${finalSrc} (first 200 chars):`, text.substring(0, 200));
                    })
                    .catch(err => console.error("Fetch error:", err));
                };
                newScript.onload = () => {
                  console.log(`Successfully loaded script: ${finalSrc}`);
                };
              } else if (scriptData.content) {
                newScript.textContent = scriptData.content;
              }
              
              Object.entries(scriptData.attributes).forEach(([name, value]) => {
                if (name === 'defer' || name === 'async') {
                  (newScript as any)[name] = true;
                } else if (name !== 'src') {
                  newScript.setAttribute(name, value);
                }
              });
              
              document.body.appendChild(newScript);
              
              if (scriptData.content) {
                setTimeout(() => {
                  if (newScript.parentNode) {
                    newScript.parentNode.removeChild(newScript);
                  }
                }, 0);
              }
            });
          }, 100);
        }
      } catch (error) {
        console.error("Error loading SugarMute page:", error);
        
        console.error('Current location:', window.location.href);
        console.error('Base URL:', window.location.origin);
        
        try {
          const debugResponse = await fetch("/sugarmute/index.html", { method: 'HEAD' });
          console.error('Debug HEAD request status:', debugResponse.status);
          console.error('Debug HEAD request headers:', Object.fromEntries(debugResponse.headers.entries()));
        } catch (debugError) {
          console.error('Debug HEAD request failed:', debugError);
        }
        
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <h1 style="color: #dc3545; margin-bottom: 1rem;">Error loading page</h1>
              <p style="font-size: 1.1rem; margin-bottom: 1rem;">Could not load SugarMute page. Please try again later.</p>
              <details style="margin-top: 2rem; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
                <summary style="cursor: pointer; color: #007953; font-weight: bold;">Technical Details</summary>
                <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 0.85rem; margin-top: 1rem;">${JSON.stringify({
                  error: error instanceof Error ? error.message : String(error),
                  location: window.location.href,
                  timestamp: new Date().toISOString()
                }, null, 2)}</pre>
              </details>
            </div>
          `;
        }
      }
    };

    loadHTML();

    // Dispatch staticsDone event to trigger any scripts waiting for it
    setTimeout(() => {
      const event = new Event('staticsDone');
      window.dispatchEvent(event);
      document.dispatchEvent(event);
    }, 500);

    // Load discount popup after 2 seconds
    const loadDiscountPopup = () => {
      if (popupLoadedRef.current) return;
      popupLoadedRef.current = true;

      try {
        // Check if popup already exists from index.html
        const existingPopup = document.getElementById('discount-popup-overlay');
        if (existingPopup) {
          setTimeout(() => {
            if (typeof (window as any).showDiscountPopup === 'function') {
              (window as any).showDiscountPopup();
            }
          }, 200);
          return;
        }
      } catch (error) {
        console.error("Error loading discount popup:", error);
      }
    };

    const popupTimeout = setTimeout(loadDiscountPopup, 1200);

    // Cleanup
    return () => {
      clearTimeout(popupTimeout);
      
      // Remove sugarmute styles on unmount
      document.querySelectorAll("style[data-sugarmute-style]").forEach((style) => {
        style.remove();
      });
    };
  }, []);

  return (
    <div 
      className="sugarmute-wrapper" 
      ref={containerRef} 
      style={{ 
        minHeight: "100vh", 
        width: "100%", 
        isolation: "isolate",
        position: "relative",
        overflow: "visible",
        display: "block",
        opacity: 1,
        visibility: "visible"
      }} 
    />
  );
}
