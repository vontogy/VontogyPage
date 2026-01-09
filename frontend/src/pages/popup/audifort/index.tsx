import { useEffect, useRef } from "react";

export default function Audifort() {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupLoadedRef = useRef(false);

  // Load and inject Audifort CSS
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    // Force body to be visible and reset global styles (override CSS that hides it)
    const styleOverride = document.createElement('style');
    styleOverride.setAttribute('data-audifort-override', 'true');
    styleOverride.textContent = `
      /* Reset and visibility overrides */
      body { 
        display: block !important; 
        opacity: 1 !important;
        visibility: visible !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Ensure audifort wrapper is visible and isolated */
      .audifort-wrapper { 
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
      .audifort-wrapper * {
        box-sizing: border-box !important;
      }
      
      /* Force visibility of all content */
      .audifort-wrapper img {
        display: inline-block !important;
        max-width: 100% !important;
        height: auto !important;
      }
      
      .audifort-wrapper a {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      .audifort-wrapper button,
      .audifort-wrapper .btn,
      .audifort-wrapper .btn-new {
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

      /* Override Tailwind/global resets inside audifort wrapper */
      .audifort-wrapper * {
        box-sizing: border-box;
      }

      /* Ensure Bootstrap grid works properly */
      .audifort-wrapper .container-fluid,
      .audifort-wrapper .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }

      .audifort-wrapper .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
      }

      .audifort-wrapper [class*="col-"] {
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
      const overrideStyle = document.head.querySelector('style[data-audifort-override="true"]');
      if (overrideStyle) {
        overrideStyle.remove();
      }
    };
  }, []);

  // Update meta tags for Audifort page
  useEffect(() => {
    // Save original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');

    // Set Audifort specific meta tags
    document.title = "Audifort - Natural Hearing Health Support";
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', 'Audifort is a natural formula with over 20 carefully-selected ingredients that support healthy hearing. Order now with special discount!');
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', 'Audifort - Natural Hearing Health Support');
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', 'Audifort is a natural formula with over 20 carefully-selected ingredients that support healthy hearing. Order now with special discount!');
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

  useEffect(() => {
    const loadHTML = async () => {
      try {
        // Pre-load main CSS file FIRST before anything else
        const mainCssLink = document.createElement("link");
        mainCssLink.rel = "stylesheet";
        mainCssLink.href = "/audifort/assets/css/style.css";
        mainCssLink.setAttribute("data-audifort-css-preload", "true");
        
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
        
        // Try to load the HTML file
        // In development, Vite might serve it, in production we need it in public
        const response = await fetch("/audifort/index.html");
        
        if (!response.ok) {
          throw new Error("HTML file not found");
        }
        
        const html = await response.text();
        
        if (!containerRef.current) {
          return;
        }

        // Pre-process HTML string to fix ALL asset paths before parsing
        // This MUST happen before parsing to prevent browser from loading wrong paths
        let preprocessedHTML = html;
        
        // Fix href attributes (CSS, links) - handle both single and double quotes, with or without spaces
        preprocessedHTML = preprocessedHTML
          .replace(/href\s*=\s*["']assets\//gi, 'href="/audifort/assets/')
          .replace(/href\s*=\s*["']\/assets\//gi, 'href="/audifort/assets/')
          // Fix src attributes (images, scripts)
          .replace(/src\s*=\s*["']assets\//gi, 'src="/audifort/assets/')
          .replace(/src\s*=\s*["']\/assets\//gi, 'src="/audifort/assets/')
          // Fix srcset attributes (responsive images)
          .replace(/srcset\s*=\s*["']assets\//gi, 'srcset="/audifort/assets/')
          .replace(/srcset\s*=\s*["']\/assets\//gi, 'srcset="/audifort/assets/')
          // Fix url() in style attributes and inline styles
          .replace(/url\(["']?assets\//gi, 'url("/audifort/assets/')
          .replace(/url\(["']?\/assets\//gi, 'url("/audifort/assets/');
        
        // Verify that the CSS link was corrected
        if (preprocessedHTML.includes('href="assets/') || preprocessedHTML.includes("href='assets/")) {
          console.warn("Warning: Some asset paths may not have been corrected in preprocess step");
          // Force correction one more time
          preprocessedHTML = preprocessedHTML
            .replace(/href\s*=\s*["']assets\//gi, 'href="/audifort/assets/')
            .replace(/src\s*=\s*["']assets\//gi, 'src="/audifort/assets/');
        }
        
        // Log verification
        const cssLinkCheck = preprocessedHTML.match(/href=["']\/audifort\/assets\/css\/style\.css["']/);
        if (cssLinkCheck) {
          console.log("✓ CSS link path corrected successfully");
        } else {
          console.error("✗ CSS link path NOT corrected! HTML may still have incorrect paths");
          // Emergency fix: try one more aggressive replacement
          preprocessedHTML = preprocessedHTML.replace(/href=["']assets\/css\/style\.css["']/gi, 'href="/audifort/assets/css/style.css"');
        }
        
        // Parse the HTML AFTER all paths are corrected
        const parser = new DOMParser();
        const doc = parser.parseFromString(preprocessedHTML, "text/html");

        // Adjust asset paths to work from the root
        const basePath = "/audifort/assets/";
        
        // Fix and inject stylesheet links from HTML FIRST, and wait for them to load
        const cssLinks: Promise<void>[] = [];
        const cssHrefs: string[] = [];
        
        doc.head.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          const href = link.getAttribute("href");
          if (href) {
            let fixedHref = href;
            // Handle relative paths
            if (!href.startsWith("http") && !href.startsWith("/")) {
              // If it starts with "assets/", replace with absolute path
              if (href.startsWith("assets/")) {
                fixedHref = "/audifort/" + href;
              } else {
                fixedHref = basePath + href;
              }
            } else if (href.startsWith("/") && !href.startsWith("/audifort/")) {
              // If it's an absolute path but not starting with /audifort/, add it
              if (href.startsWith("/assets/")) {
                fixedHref = "/audifort" + href;
              }
            }
            
            cssHrefs.push(fixedHref);
            
            // Inject the stylesheet link into the document head if not already loaded
            const existingLink = document.head.querySelector(`link[href="${fixedHref}"]`);
            if (!existingLink) {
              const newLink = document.createElement("link");
              newLink.rel = "stylesheet";
              newLink.href = fixedHref;
              newLink.setAttribute("data-audifort-css", "true");
              
              // Create a promise that resolves when the CSS loads
              const cssPromise = new Promise<void>((resolve) => {
                newLink.onerror = () => {
                  console.error(`Failed to load CSS from HTML: ${fixedHref}`);
                  // Try alternative path
                  const altHref = fixedHref.replace("/audifort/audifort/", "/audifort/");
                  if (altHref !== fixedHref) {
                    console.log(`Trying alternative path: ${altHref}`);
                    newLink.href = altHref;
                  } else {
                    // Still resolve to continue even if CSS fails
                    resolve();
                  }
                };
                newLink.onload = () => {
                  console.log(`Successfully loaded CSS from HTML: ${fixedHref}`);
                  resolve();
                };
                // Timeout after 5 seconds
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
        const mainCssHref = "/audifort/assets/css/style.css";
        if (!cssHrefs.includes(mainCssHref)) {
          const existingMainCss = document.head.querySelector(`link[href="${mainCssHref}"]`);
          if (!existingMainCss) {
            const mainCssLink = document.createElement("link");
            mainCssLink.rel = "stylesheet";
            mainCssLink.href = mainCssHref;
            mainCssLink.setAttribute("data-audifort-css", "true");
            
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
        
        // Verify CSS was loaded by checking if stylesheets are in the document
        const loadedCss = document.head.querySelectorAll('link[data-audifort-css="true"]');
        console.log(`Loaded ${loadedCss.length} CSS files for Audifort`);
        
        // Force a reflow to ensure CSS is applied
        if (containerRef.current) {
          containerRef.current.offsetHeight;
        }
        
        // Remove stylesheet links from parsed doc to avoid duplication
        // They've already been loaded manually with correct paths
        doc.head.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          link.remove();
        });
        
        // Also remove any script tags from head that might have incorrect paths
        doc.head.querySelectorAll("script[src]").forEach((script) => {
          script.remove();
        });

        // Fix link hrefs (like favicon)
        doc.querySelectorAll("link[href]").forEach((link) => {
          const href = link.getAttribute("href");
          if (href && !href.startsWith("http") && !href.startsWith("/")) {
            // If it starts with "assets/", replace with absolute path
            if (href.startsWith("assets/")) {
              link.setAttribute("href", "/audifort/" + href);
            } else {
              // Fix other relative paths (like apple-touch-icon.png, favicon, etc.)
              link.setAttribute("href", "/audifort/" + href);
            }
          }
        });

        // Fix script sources - MUST fix ALL paths before injecting HTML
        doc.querySelectorAll("script[src]").forEach((script) => {
          const src = script.getAttribute("src");
          if (src) {
            let fixedSrc = src;
            // Fix relative paths that don't start with http or /
            if (!src.startsWith("http") && !src.startsWith("/")) {
              // If it starts with "assets/", replace with absolute path
              if (src.startsWith("assets/")) {
                fixedSrc = "/audifort/" + src;
              } else {
                fixedSrc = "/audifort/" + src;
              }
              script.setAttribute("src", fixedSrc);
            } else if (src.startsWith("/assets/") && !src.startsWith("/audifort/")) {
              // Fix absolute paths that start with /assets/ but not /audifort/
              fixedSrc = "/audifort" + src;
              script.setAttribute("src", fixedSrc);
            }
          }
        });

        // Fix image sources - MUST fix ALL paths before injecting HTML
        doc.querySelectorAll("img[src]").forEach((img) => {
          const src = img.getAttribute("src");
          if (src) {
            let fixedSrc = src;
            // Fix relative paths that don't start with http, /, or data:
            if (!src.startsWith("http") && !src.startsWith("/") && !src.startsWith("data:")) {
              // If it starts with "assets/", replace with absolute path
              if (src.startsWith("assets/")) {
                fixedSrc = "/audifort/" + src;
              } else {
                // Fix other relative paths
                fixedSrc = "/audifort/" + src;
              }
              img.setAttribute("src", fixedSrc);
            } else if (src.startsWith("/assets/") && !src.startsWith("/audifort/")) {
              // Fix absolute paths that start with /assets/ but not /audifort/
              fixedSrc = "/audifort" + src;
              img.setAttribute("src", fixedSrc);
            }
          }
        });

        // Fix picture sources - MUST fix ALL paths before injecting HTML
        doc.querySelectorAll("source[srcset]").forEach((source) => {
          const srcset = source.getAttribute("srcset");
          if (srcset) {
            let fixedSrcset = srcset;
            // Fix relative paths that don't start with http or /
            if (!srcset.startsWith("http") && !srcset.startsWith("/")) {
              // If it starts with "assets/", replace with absolute path
              if (srcset.startsWith("assets/")) {
                fixedSrcset = "/audifort/" + srcset;
              } else {
                fixedSrcset = basePath + srcset;
              }
              source.setAttribute("srcset", fixedSrcset);
            } else if (srcset.startsWith("/assets/") && !srcset.startsWith("/audifort/")) {
              // Fix absolute paths that start with /assets/ but not /audifort/
              fixedSrcset = "/audifort" + srcset;
              source.setAttribute("srcset", fixedSrcset);
            }
          }
        });

        // Extract and inject styles from both head and body BEFORE injecting HTML
        const headStyles = doc.head.querySelectorAll("style");
        const bodyStyles = doc.body.querySelectorAll("style");
        const allStyles = [...Array.from(headStyles), ...Array.from(bodyStyles)];
        
        allStyles.forEach((style, index) => {
          const existingStyle = document.head.querySelector(`style[data-audifort-style="${index}"]`);
          if (!existingStyle) {
            const newStyle = document.createElement("style");
            newStyle.setAttribute("data-audifort-style", index.toString());
            // Fix font paths in CSS (assets/fonts/... -> /audifort/assets/fonts/...)
            let styleContent = style.textContent || "";
            styleContent = styleContent.replace(/url\(["']?assets\//g, 'url("/audifort/assets/');
            newStyle.textContent = styleContent;
            document.head.appendChild(newStyle);
          }
        });

        // Wait a bit more to ensure CSS is fully applied
        await new Promise(resolve => setTimeout(resolve, 100));

        // Remove scripts from body before injecting HTML (to prevent auto-execution with wrong paths)
        const scriptsToExecute: { src?: string; content?: string; attributes: { [key: string]: string } }[] = [];
        doc.body.querySelectorAll("script").forEach((script) => {
          const scriptData: { src?: string; content?: string; attributes: { [key: string]: string } } = {
            attributes: {}
          };
          
          if (script.src) {
            let scriptSrc = script.getAttribute("src") || "";
            if (scriptSrc) {
              // Fix relative paths
              if (!scriptSrc.startsWith("http") && !scriptSrc.startsWith("/")) {
                if (scriptSrc.startsWith("assets/")) {
                  scriptSrc = "/audifort/" + scriptSrc;
                } else {
                  scriptSrc = "/audifort/" + scriptSrc;
                }
              } else if (scriptSrc.startsWith("/assets/") && !scriptSrc.startsWith("/audifort/")) {
                // Fix absolute paths that start with /assets/ but not /audifort/
                scriptSrc = "/audifort" + scriptSrc;
              }
            }
            // Log for debugging
            console.log(`Loading script: ${scriptSrc}`);
            scriptData.src = scriptSrc;
          } else if (script.innerHTML) {
            scriptData.content = script.innerHTML;
          }
          
          // Copy all attributes
          Array.from(script.attributes).forEach((attr) => {
            if (attr.name !== 'src' && attr.name !== 'innerHTML') {
              scriptData.attributes[attr.name] = attr.value;
            }
          });
          
          scriptsToExecute.push(scriptData);
          script.remove(); // Remove from DOM before injecting
        });

        // Final verification: ensure all paths in the HTML are correct before injection
        // This is a safety check to catch any paths we might have missed
        let bodyHTML = doc.body.innerHTML;
        // Apply comprehensive path corrections
        bodyHTML = bodyHTML
          .replace(/src=["']assets\//g, 'src="/audifort/assets/')
          .replace(/src=["']\/assets\//g, 'src="/audifort/assets/')
          .replace(/href=["']assets\//g, 'href="/audifort/assets/')
          .replace(/href=["']\/assets\//g, 'href="/audifort/assets/')
          .replace(/srcset=["']assets\//g, 'srcset="/audifort/assets/')
          .replace(/srcset=["']\/assets\//g, 'srcset="/audifort/assets/')
          .replace(/url\(["']?assets\//g, 'url("/audifort/assets/')
          .replace(/url\(["']?\/assets\//g, 'url("/audifort/assets/');
        
        let correctedBodyHTML = bodyHTML;

        // Final safety check: ensure no incorrect paths remain
        const finalCheck = correctedBodyHTML.match(/["']assets\//g);
        if (finalCheck && finalCheck.length > 0) {
          console.warn(`Warning: Found ${finalCheck.length} uncorrected asset paths, fixing now...`);
          // Apply one more round of corrections - be more aggressive
          correctedBodyHTML = correctedBodyHTML
            .replace(/src=["']assets\//g, 'src="/audifort/assets/')
            .replace(/src=["']\/assets\//g, 'src="/audifort/assets/')
            .replace(/href=["']assets\//g, 'href="/audifort/assets/')
            .replace(/href=["']\/assets\//g, 'href="/audifort/assets/')
            .replace(/srcset=["']assets\//g, 'srcset="/audifort/assets/')
            .replace(/srcset=["']\/assets\//g, 'srcset="/audifort/assets/');
        }
        
        // Inject body content (without scripts) with corrected paths
        if (containerRef.current) {
          containerRef.current.innerHTML = correctedBodyHTML;

          // Execute scripts with corrected paths after a brief delay
          setTimeout(() => {
            scriptsToExecute.forEach((scriptData) => {
              const newScript = document.createElement("script");
              
              if (scriptData.src) {
                // Ensure the path is absolute and correct
                let finalSrc = scriptData.src;
                if (!finalSrc.startsWith("http") && !finalSrc.startsWith("/")) {
                  finalSrc = "/audifort/" + finalSrc;
                } else if (finalSrc.startsWith("/assets/") && !finalSrc.startsWith("/audifort/")) {
                  // Fix absolute paths that start with /assets/ but not /audifort/
                  finalSrc = "/audifort" + finalSrc;
                }
                
                newScript.src = finalSrc;
                
                // For external scripts, add error handling
                newScript.onerror = (error) => {
                  console.error(`Failed to load script: ${finalSrc}`, error);
                  // Try to fetch and see what we're getting
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
              
              // Set all attributes (including defer, async, etc.)
              Object.entries(scriptData.attributes).forEach(([name, value]) => {
                if (name === 'defer' || name === 'async') {
                  (newScript as any)[name] = true;
                } else if (name !== 'src') {
                  newScript.setAttribute(name, value);
                }
              });
              
              // Append to body for better compatibility with defer/async
              document.body.appendChild(newScript);
              
              // Remove inline scripts after execution to keep DOM clean
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
        console.error("Error loading Audifort page:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #000;">
              <h1>Error loading page</h1>
              <p>Could not load Audifort page. Please try again later.</p>
              <p style="color: red; font-size: 0.9rem;">${error}</p>
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
    const loadDiscountPopup = async () => {
      if (popupLoadedRef.current) return;
      popupLoadedRef.current = true;

      try {
        // Check if popup already exists from index.html
        const existingPopup = document.getElementById('discount-popup-overlay');
        if (existingPopup) {
          // Popup already exists in HTML, just ensure it shows automatically
          // The index.html script will handle showing it, but we can trigger it here as backup
          setTimeout(() => {
            if (typeof (window as any).showDiscountPopup === 'function') {
              (window as any).showDiscountPopup();
            }
          }, 200);
          return;
        }

        // Try to load discount-popup.html from public folder
        try {
          console.log("Attempting to load /audifort/discount-popup.html");
          const popupResponse = await fetch("/audifort/discount-popup.html");
          console.log("Popup response status:", popupResponse.status, popupResponse.ok);
          
          if (popupResponse.ok) {
            const popupHTML = await popupResponse.text();
            console.log("Successfully fetched discount-popup.html, length:", popupHTML.length);
            
            // Parse the popup HTML
            const parser = new DOMParser();
            const popupDoc = parser.parseFromString(popupHTML, "text/html");
            
            // Extract and inject styles FIRST
            const popupStyles = popupDoc.querySelectorAll("style");
            popupStyles.forEach((style) => {
              const existingStyle = document.head.querySelector(`style[data-audifort-popup-style="true"]`);
              if (!existingStyle) {
                const newStyle = document.createElement("style");
                newStyle.setAttribute("data-audifort-popup-style", "true");
                newStyle.textContent = style.textContent || "";
                document.head.appendChild(newStyle);
              }
            });
            
            // Extract and inject popup HTML FIRST (before executing scripts)
            const popupOverlay = popupDoc.getElementById('discount-popup-overlay');
            if (popupOverlay) {
              const popupContainer = document.createElement("div");
              popupContainer.id = "audifort-discount-popup-container";
              // Clone the element and append it
              const clonedOverlay = popupOverlay.cloneNode(true) as HTMLElement;
              popupContainer.appendChild(clonedOverlay);
              document.body.appendChild(popupContainer);
            }
            
            // Extract and execute scripts AFTER HTML is injected
            const popupScripts = popupDoc.querySelectorAll("script");
            const scriptPromises: Promise<void>[] = [];
            
            popupScripts.forEach((script) => {
              const newScript = document.createElement("script");
              if (script.src) {
                // Fix script src path if needed
                let scriptSrc = script.src;
                if (!scriptSrc.startsWith("http") && !scriptSrc.startsWith("/")) {
                  scriptSrc = "/audifort/" + scriptSrc;
                }
                newScript.src = scriptSrc;
                
                // Create promise for script loading
                const scriptPromise = new Promise<void>((resolve) => {
                  newScript.onload = () => resolve();
                  newScript.onerror = () => resolve(); // Continue even if script fails
                  setTimeout(() => resolve(), 5000); // Timeout after 5 seconds
                });
                scriptPromises.push(scriptPromise);
              } else if (script.textContent) {
                // For inline scripts, inject as script element and let browser execute it
                // This is more reliable than using Function constructor or eval
                console.log("Injecting inline script from discount-popup.html");
                const inlineScript = document.createElement("script");
                inlineScript.textContent = script.textContent;
                
                // Copy all attributes from original script
                Array.from(script.attributes).forEach((attr) => {
                  if (attr.name !== 'textContent') {
                    inlineScript.setAttribute(attr.name, attr.value);
                  }
                });
                
                // Append to body and let browser execute it naturally
                document.body.appendChild(inlineScript);
                console.log("Inline script injected, waiting for execution...");
                
                // Note: We don't remove the script as it may be needed for the popup to work
                // The browser will execute it and it will define window.showDiscountPopup
              }
              
              // Only append to DOM if it has src (external script)
              if (script.src) {
                // Copy all attributes
                Array.from(script.attributes).forEach((attr) => {
                  if (attr.name !== 'src' && attr.name !== 'textContent') {
                    newScript.setAttribute(attr.name, attr.value);
                  }
                });
                
                document.body.appendChild(newScript);
              }
            });
            
            // Wait for all external scripts to load
            await Promise.all(scriptPromises);
            
            // Give a delay for inline scripts to execute (they execute asynchronously when injected)
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Verify popup was loaded correctly
            const popupElement = document.getElementById('discount-popup-overlay');
            const hasShowFunction = typeof (window as any).showDiscountPopup === 'function';
            
            if (!popupElement || !hasShowFunction) {
              console.warn("Popup not properly loaded from discount-popup.html");
              console.warn("Popup element exists:", !!popupElement);
              console.warn("showDiscountPopup function exists:", hasShowFunction);
              // Remove what was loaded and fall through to fallback
              const popupContainer = document.getElementById("audifort-discount-popup-container");
              if (popupContainer) {
                popupContainer.remove();
              }
              const popupStyle = document.head.querySelector(`style[data-audifort-popup-style="true"]`);
              if (popupStyle) {
                popupStyle.remove();
              }
              // Fall through to fallback
            } else {
              // Show popup after brief delay to ensure everything is loaded
              setTimeout(() => {
                console.log("Calling showDiscountPopup from discount-popup.html");
                (window as any).showDiscountPopup();
              }, 300);
              
              return; // Successfully loaded from discount-popup.html
            }
          } else {
            console.warn("discount-popup.html response not ok, status:", popupResponse.status);
            // Fall through to fallback
          }
        } catch (fetchError) {
          console.error("Failed to load discount-popup.html, using fallback:", fetchError);
          // Continue to fallback below
        }
        
        // If we reach here, fetch failed or response was not ok - use fallback
        console.log("Using fallback: injecting popup HTML directly");

        // If popup doesn't exist and fetch failed, inject it (fallback)
        // Inject popup HTML directly
        const popupHTML = `
          <div id="discount-popup-overlay" class="discount-popup-overlay">
            <div class="discount-popup-container">
              <div class="discount-popup-content">
            <a href="https://audifort.com/d/order-now.php#aff=vontogy" 
               class="discount-popup-close-x" 
               id="discount-popup-close-x" 
               aria-label="Close"
               rel="noopener noreferrer nofollow">×</a>
                <h2 class="discount-popup-title">Special Discount</h2>
                
                <div class="discount-popup-details">
                  <div class="discount-detail-row">
                    <span class="discount-label">6-bottle plan:</span>
                    <span class="discount-price-original">$1074.00</span>
                  </div>
                  <div class="discount-detail-row">
                    <span class="discount-label">Your price:</span>
                    <span class="discount-price-new">$294.00</span>
                  </div>
                  <div class="discount-detail-row">
                    <span class="discount-label">per bottle:</span>
                    <span class="discount-price-unit">$49.00</span>
                  </div>
                </div>
                
                <div class="discount-timer-section">
                  <p class="discount-timer-label">Offer expires in:</p>
                  <div class="discount-timer-box">
                    <span id="discount-timer">00:09:40</span>
                  </div>
                </div>
                
                <div class="discount-popup-buttons">
                  <a href="https://audifort.com/d/order-now.php#aff=vontogy" 
                     class="discount-popup-button" 
                     rel="noopener noreferrer nofollow">
                      Get Discount
                  </a>
                  <a href="https://audifort.com/d/order-now.php#aff=vontogy" 
                     class="discount-popup-close-btn" 
                     id="discount-popup-close-btn"
                     rel="noopener noreferrer nofollow">Close</a>
                </div>
              </div>
            </div>
          </div>
        `;

        const popupContainer = document.createElement("div");
        popupContainer.id = "audifort-discount-popup-container";
        popupContainer.innerHTML = popupHTML;
        document.body.appendChild(popupContainer);

        // Inject popup styles
        const popupStyles = `
          .discount-popup-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 9999;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-in;
          }
          .discount-popup-overlay.show { display: flex; }
          .discount-popup-container { position: relative; max-width: 650px; width: 90%; margin: 0 auto; }
          .discount-popup-content { background-color: #ffffff; border-radius: 20px; padding: 2.5rem 3rem; text-align: center; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); position: relative; }
          .discount-popup-title { font-family: 'Montserrat', 'Quicksand', sans-serif; font-weight: 700; font-size: 2rem; color: #000; margin-bottom: 1.5rem; text-align: center; }
          .discount-popup-details { margin-bottom: 1.5rem; }
          .discount-detail-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; text-align: left; }
          .discount-label { font-family: 'OpenSans', 'Quicksand', sans-serif; font-size: 1.1rem; color: #000; }
          .discount-price-original { font-family: 'Montserrat', 'Quicksand', sans-serif; font-size: 1.3rem; color: #999; text-decoration: line-through; }
          .discount-price-new { font-family: 'Montserrat', 'Quicksand', sans-serif; font-size: 1.5rem; font-weight: 700; color: #198754; }
          .discount-price-unit { font-family: 'Montserrat', 'Quicksand', sans-serif; font-size: 1.3rem; color: #000; }
          .discount-timer-section { margin-bottom: 1.5rem; }
          .discount-timer-label { font-family: 'OpenSans', 'Quicksand', sans-serif; font-size: 0.95rem; color: #dc3545; margin-bottom: 0.5rem; font-weight: 600; }
          .discount-timer-box { background-color: #ffcccc; border-radius: 10px; padding: 0.75rem 1.5rem; display: inline-block; }
          #discount-timer { font-family: 'Montserrat', 'Quicksand', sans-serif; font-size: 1.75rem; font-weight: 700; color: #dc3545; letter-spacing: 2px; }
          .discount-popup-close-x { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 2.5rem; font-weight: 300; color: #999; cursor: pointer; line-height: 1; padding: 0; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; transition: color 0.3s ease; text-decoration: none; z-index: 10; }
          .discount-popup-close-x:hover { color: #000; text-decoration: none; }
          .discount-popup-buttons { display: flex; gap: 1.5rem; align-items: center; justify-content: center; }
          .discount-popup-button { flex: 1; background-color: #007953; color: #ffffff; font-family: 'Montserrat', 'Quicksand', sans-serif; font-size: 1.4rem; font-weight: 700; text-transform: uppercase; text-decoration: none; padding: 1.4rem 2.5rem; border-radius: 10px; border: none; cursor: pointer; transition: background-color 0.3s ease; text-align: center; }
          .discount-popup-button:hover { background-color: #005a3d; color: #ffffff; text-decoration: none; }
          .discount-popup-close-btn { flex: 1; background-color: #6c757d; color: #ffffff; font-family: 'Montserrat', 'Quicksand', sans-serif; font-size: 1.4rem; font-weight: 700; text-transform: uppercase; text-decoration: none; padding: 1.4rem 2.5rem; border-radius: 10px; border: none; cursor: pointer; transition: background-color 0.3s ease; text-align: center; display: inline-block; }
           .discount-popup-close-btn:hover { background-color: #5a6268; color: #ffffff; text-decoration: none; }
           @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
           @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
           .spinner { display: inline-block; width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #ffffff; animation: spin 0.8s linear infinite; }
           @media (max-width: 576px) {
            .discount-popup-content { padding: 1.5rem; }
            .discount-popup-close-x { top: 0.75rem; right: 0.75rem; font-size: 2rem; width: 1.75rem; height: 1.75rem; }
            .discount-popup-title { font-size: 1.5rem; }
            .discount-price-new { font-size: 1.2rem; }
            #discount-timer { font-size: 1.3rem; }
            .discount-popup-buttons { flex-direction: column; gap: 0.75rem; }
            .discount-popup-button, .discount-popup-close-btn { font-size: 1.1rem; padding: 1rem 1.5rem; width: 100%; }
          }
        `;

        const styleElement = document.createElement("style");
        styleElement.setAttribute("data-audifort-popup-style", "true");
        styleElement.textContent = popupStyles;
        document.head.appendChild(styleElement);

        // Initialize popup functionality directly in TypeScript
        const TIMER_STORAGE_KEY = 'audifort_discount_timer';
        const TIMER_TIMESTAMP_KEY = 'audifort_discount_timer_timestamp';
        const INITIAL_TIME = 580;
        const CACHE_DURATION = 2 * 60 * 60 * 1000;
        
        let timeLeft = INITIAL_TIME;
        let timerInterval: NodeJS.Timeout;
        
        const loadTimerFromCache = () => {
          try {
            const savedTime = localStorage.getItem(TIMER_STORAGE_KEY);
            const savedTimestamp = localStorage.getItem(TIMER_TIMESTAMP_KEY);
            
            if (savedTime && savedTimestamp) {
              const now = Date.now();
              const timestamp = parseInt(savedTimestamp, 10);
              const timeDiff = now - timestamp;
              
              if (timeDiff < CACHE_DURATION) {
                const saved = parseInt(savedTime, 10);
                const elapsedSeconds = Math.floor(timeDiff / 1000);
                const newTimeLeft = saved - elapsedSeconds;
                
                if (newTimeLeft > 0) {
                  timeLeft = newTimeLeft;
                  return true;
                } else {
                  timeLeft = 0;
                  localStorage.removeItem(TIMER_STORAGE_KEY);
                  localStorage.removeItem(TIMER_TIMESTAMP_KEY);
                  return true;
                }
              } else {
                localStorage.removeItem(TIMER_STORAGE_KEY);
                localStorage.removeItem(TIMER_TIMESTAMP_KEY);
              }
            }
          } catch (error) {
            console.error('Error loading timer from cache:', error);
          }
          return false;
        };
        
        const saveTimerToCache = () => {
          try {
            localStorage.setItem(TIMER_STORAGE_KEY, timeLeft.toString());
            localStorage.setItem(TIMER_TIMESTAMP_KEY, Date.now().toString());
          } catch (error) {
            console.error('Error saving timer to cache:', error);
          }
        };
        
        const formatTime = (seconds: number) => {
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        };
        
        const updateTimer = () => {
          const timerElement = document.getElementById('discount-timer');
          if (timerElement) {
            timerElement.textContent = formatTime(timeLeft);
            
            if (timeLeft > 0) {
              timeLeft--;
              saveTimerToCache();
            } else {
              clearInterval(timerInterval);
              localStorage.removeItem(TIMER_STORAGE_KEY);
              localStorage.removeItem(TIMER_TIMESTAMP_KEY);
            }
          }
        };
        
         // Show popup function
         (window as any).showDiscountPopup = () => {
           loadTimerFromCache();
           
           const overlay = document.getElementById('discount-popup-overlay');
           if (overlay) {
             overlay.classList.add('show');
             
             const scrollY = window.scrollY || window.pageYOffset;
             document.body.style.position = 'fixed';
             document.body.style.top = `-${scrollY}px`;
             document.body.style.width = '100%';
             document.body.style.overflow = 'hidden';
             document.documentElement.style.overflow = 'hidden';
             
             timerInterval = setInterval(updateTimer, 1000);
             updateTimer();
           }
         };
         
         // Add click handlers for popup buttons with loading state and navigation without opening new tab
         setTimeout(() => {
           const getDiscountBtn = document.querySelector('.discount-popup-button') as HTMLAnchorElement;
           const closeBtn = document.querySelector('.discount-popup-close-btn') as HTMLAnchorElement;
           const closeXBtn = document.getElementById('discount-popup-close-x') as HTMLAnchorElement;
           
           if (getDiscountBtn) {
             getDiscountBtn.addEventListener('click', function(e) {
               e.preventDefault();
               // Disable all buttons
               if (getDiscountBtn) {
                 getDiscountBtn.style.pointerEvents = 'none';
                 getDiscountBtn.style.opacity = '0.9';
                 getDiscountBtn.innerHTML = '<div class="spinner"></div>';
               }
               if (closeBtn) {
                 closeBtn.style.pointerEvents = 'none';
                 closeBtn.style.opacity = '0.5';
               }
               if (closeXBtn) {
                 closeXBtn.style.pointerEvents = 'none';
                 closeXBtn.style.opacity = '0.5';
               }
               // Navigate without opening new tab
               window.location.href = 'https://audifort.com/d/order-now.php#aff=vontogy';
             });
           }
           
           if (closeBtn) {
             closeBtn.addEventListener('click', function(e) {
               e.preventDefault();
               // Disable all buttons
               if (getDiscountBtn) {
                 getDiscountBtn.style.pointerEvents = 'none';
                 getDiscountBtn.style.opacity = '0.5';
               }
               if (closeBtn) {
                 closeBtn.style.pointerEvents = 'none';
                 closeBtn.style.opacity = '0.9';
                 closeBtn.innerHTML = '<div class="spinner"></div>';
               }
               if (closeXBtn) {
                 closeXBtn.style.pointerEvents = 'none';
                 closeXBtn.style.opacity = '0.5';
               }
               // Navigate without opening new tab
               window.location.href = 'https://audifort.com/d/order-now.php#aff=vontogy';
             });
           }
           
           if (closeXBtn) {
             closeXBtn.addEventListener('click', function(e) {
               e.preventDefault();
               // Disable all buttons
               if (getDiscountBtn) {
                 getDiscountBtn.style.pointerEvents = 'none';
                 getDiscountBtn.style.opacity = '0.5';
               }
               if (closeBtn) {
                 closeBtn.style.pointerEvents = 'none';
                 closeBtn.style.opacity = '0.5';
               }
               if (closeXBtn) {
                 closeXBtn.style.pointerEvents = 'none';
                 closeXBtn.style.opacity = '0.5';
               }
               // Navigate without opening new tab
               window.location.href = 'https://audifort.com/d/order-now.php#aff=vontogy';
             });
           }
         }, 500);
         
         window.addEventListener('beforeunload', () => {
           if (timerInterval) {
             saveTimerToCache();
           }
         });

        // Show popup after brief delay
        setTimeout(() => {
          if (typeof (window as any).showDiscountPopup === 'function') {
            (window as any).showDiscountPopup();
          }
        }, 200);

      } catch (error) {
        console.error("Error loading discount popup:", error);
      }
    };

    const popupTimeout = setTimeout(loadDiscountPopup, 1200);

    // Cleanup
    return () => {
      clearTimeout(popupTimeout);
      
      // Remove audifort styles on unmount
      document.querySelectorAll("style[data-audifort-style]").forEach((style) => {
        style.remove();
      });

      // Remove popup styles and container
      document.querySelectorAll("style[data-audifort-popup-style]").forEach((style) => {
        style.remove();
      });
      
      const popupContainer = document.getElementById("audifort-discount-popup-container");
      if (popupContainer) {
        popupContainer.remove();
      }
    };
  }, []);

  return (
    <div 
      className="audifort-wrapper" 
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
