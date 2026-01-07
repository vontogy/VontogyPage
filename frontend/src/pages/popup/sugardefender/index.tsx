import { useEffect, useRef } from "react";

export default function SugarDefender() {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupLoadedRef = useRef(false);

  // Load and inject SugarDefender CSS - removed duplicate loading, CSS will be loaded from HTML
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    // Force body to be visible and reset global styles (override CSS that hides it)
    const styleOverride = document.createElement('style');
    styleOverride.setAttribute('data-sugardefender-override', 'true');
    styleOverride.textContent = `
      /* Reset and visibility overrides */
      body { 
        display: block !important; 
        opacity: 1 !important;
        visibility: visible !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Ensure sugardefender wrapper is visible and isolated */
      .sugardefender-wrapper { 
        display: block !important; 
        opacity: 1 !important;
        visibility: visible !important;
        position: relative !important;
        width: 100% !important;
        min-height: 100vh !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
        font-size: 16px;
        line-height: 1.5;
        color: #272727;
        background: white;
        margin: 0;
        padding: 0;
      }
      
      .async-hide {
        opacity: 1 !important;
      }

      /* Override Tailwind/global resets inside sugardefender wrapper */
      .sugardefender-wrapper * {
        box-sizing: border-box;
      }

      /* Don't override font-family for elements inside wrapper - let Bootstrap handle it */
      .sugardefender-wrapper * {
        box-sizing: border-box;
      }

      /* Ensure Bootstrap grid works properly */
      .sugardefender-wrapper .container-fluid,
      .sugardefender-wrapper .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }

      .sugardefender-wrapper .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
      }

      .sugardefender-wrapper [class*="col-"] {
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
      const overrideStyle = document.head.querySelector('style[data-sugardefender-override="true"]');
      if (overrideStyle) {
        overrideStyle.remove();
      }
    };
  }, []);

  // Update meta tags for SugarDefender page
  useEffect(() => {
    // Save original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');

    // Set SugarDefender specific meta tags
    document.title = "Sugar Defender - Advanced Blood Sugar Support";
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', 'Sugar Defender is an advanced blend of 24 proven ingredients that supports healthy glucose levels and natural weight loss. Order now with special discount!');
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', 'Sugar Defender - Advanced Blood Sugar Support');
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', 'Sugar Defender is an advanced blend of 24 proven ingredients that supports healthy glucose levels and natural weight loss. Order now with special discount!');
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
    script.src = "https://cdn.rartcloud.com/code/8223-492c23f3-48ae-429e-8d98-63e30bcb6b1a";
    script.defer = true;
    script.setAttribute("data-sugardefender-external", "true");
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup - remove script on unmount
      const existingScript = document.querySelector('script[data-sugardefender-external="true"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    const loadHTML = async () => {
      try {
        // Wait a bit to ensure CSS files are loaded first
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Try to load the HTML file
        // In development, Vite might serve it, in production we need it in public
        const response = await fetch("/sugardefender/index.html");
        
        if (!response.ok) {
          throw new Error("HTML file not found");
        }
        
        const html = await response.text();
        
        if (!containerRef.current) {
          return;
        }

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Adjust asset paths to work from the root
        const basePath = "/sugardefender/assets/";
        
        // Fix and inject stylesheet links from HTML (don't remove them, just fix paths)
        doc.head.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          const href = link.getAttribute("href");
          if (href) {
            let fixedHref = href;
            if (!href.startsWith("http") && !href.startsWith("/")) {
              // If it starts with "assets/", replace with absolute path
              if (href.startsWith("assets/")) {
                fixedHref = "/sugardefender/" + href;
              } else {
                fixedHref = basePath + href;
              }
            }
            // Inject the stylesheet link into the document head if not already loaded
            const existingLink = document.head.querySelector(`link[href="${fixedHref}"]`);
            if (!existingLink) {
              const newLink = document.createElement("link");
              newLink.rel = "stylesheet";
              newLink.href = fixedHref;
              newLink.setAttribute("data-sugardefender-css", "true");
              
              // Add error handling
              newLink.onerror = () => {
                console.error(`Failed to load CSS from HTML: ${fixedHref}`);
              };
              newLink.onload = () => {
                console.log(`Successfully loaded CSS from HTML: ${fixedHref}`);
              };
              
              document.head.appendChild(newLink);
            }
          }
        });
        
        // Remove from parsed doc to avoid duplication
        doc.head.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          link.remove();
        });

        // Fix link hrefs (like favicon)
        doc.querySelectorAll("link[href]").forEach((link) => {
          const href = link.getAttribute("href");
          if (href && !href.startsWith("http") && !href.startsWith("/")) {
            // If it starts with "assets/", replace with absolute path
            if (href.startsWith("assets/")) {
              link.setAttribute("href", "/sugardefender/" + href);
            } else {
              // Fix other relative paths (like apple-touch-icon.png, favicon, etc.)
              link.setAttribute("href", "/sugardefender/" + href);
            }
          }
        });

        // Fix script sources
        doc.querySelectorAll("script[src]").forEach((script) => {
          const src = script.getAttribute("src");
          if (src && !src.startsWith("http") && !src.startsWith("/")) {
            // If it starts with "assets/", replace with absolute path
            if (src.startsWith("assets/")) {
              script.setAttribute("src", "/sugardefender/" + src);
            } else {
              script.setAttribute("src", "/sugardefender/" + src);
            }
          }
        });

        // Fix image sources
        doc.querySelectorAll("img[src]").forEach((img) => {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("http") && !src.startsWith("/") && !src.startsWith("data:")) {
            // If it starts with "assets/", replace with absolute path
            if (src.startsWith("assets/")) {
              img.setAttribute("src", "/sugardefender/" + src);
            } else {
              // Fix other relative paths (like favicon, etc.)
              img.setAttribute("src", "/sugardefender/" + src);
            }
          }
        });

        // Fix picture sources
        doc.querySelectorAll("source[srcset]").forEach((source) => {
          const srcset = source.getAttribute("srcset");
          if (srcset && !srcset.startsWith("http") && !srcset.startsWith("/")) {
            // If it starts with "assets/", replace with absolute path
            if (srcset.startsWith("assets/")) {
              source.setAttribute("srcset", "/sugardefender/" + srcset);
            } else {
              source.setAttribute("srcset", basePath + srcset);
            }
          }
        });

        // Extract and inject styles from both head and body
        const headStyles = doc.head.querySelectorAll("style");
        const bodyStyles = doc.body.querySelectorAll("style");
        const allStyles = [...Array.from(headStyles), ...Array.from(bodyStyles)];
        
        allStyles.forEach((style, index) => {
          const existingStyle = document.head.querySelector(`style[data-sugardefender-style="${index}"]`);
          if (!existingStyle) {
            const newStyle = document.createElement("style");
            newStyle.setAttribute("data-sugardefender-style", index.toString());
            // Fix font paths in CSS (assets/fonts/... -> /sugardefender/assets/fonts/...)
            let styleContent = style.textContent || "";
            styleContent = styleContent.replace(/url\(["']?assets\//g, 'url("/sugardefender/assets/');
            newStyle.textContent = styleContent;
            document.head.appendChild(newStyle);
          }
        });

        // Remove scripts from body before injecting HTML (to prevent auto-execution with wrong paths)
        const scriptsToExecute: { src?: string; content?: string; attributes: { [key: string]: string } }[] = [];
        doc.body.querySelectorAll("script").forEach((script) => {
          const scriptData: { src?: string; content?: string; attributes: { [key: string]: string } } = {
            attributes: {}
          };
          
          if (script.src) {
            let scriptSrc = script.getAttribute("src") || "";
            if (scriptSrc && !scriptSrc.startsWith("http") && !scriptSrc.startsWith("/")) {
              if (scriptSrc.startsWith("assets/")) {
                scriptSrc = "/sugardefender/" + scriptSrc;
              } else {
                scriptSrc = "/sugardefender/" + scriptSrc;
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

        // Inject body content (without scripts)
        if (containerRef.current) {
          containerRef.current.innerHTML = doc.body.innerHTML;

          // Execute scripts with corrected paths after a brief delay
          setTimeout(() => {
            scriptsToExecute.forEach((scriptData) => {
              const newScript = document.createElement("script");
              
              if (scriptData.src) {
                // Ensure the path is absolute and correct
                let finalSrc = scriptData.src;
                if (!finalSrc.startsWith("http") && !finalSrc.startsWith("/")) {
                  finalSrc = "/sugardefender/" + finalSrc;
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
        console.error("Error loading SugarDefender page:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #000;">
              <h1>Error loading page</h1>
              <p>Could not load SugarDefender page. Please try again later.</p>
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
    // Note: The popup HTML and script are already in index.html, so we just need to ensure it shows automatically
    const loadDiscountPopup = () => {
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

        // If popup doesn't exist, inject it (fallback)
        // Inject popup HTML directly
        const popupHTML = `
          <div id="discount-popup-overlay" class="discount-popup-overlay">
            <div class="discount-popup-container">
              <div class="discount-popup-content">
            <a href="https://sugardefender24.com/d/order-now.php#aff=vontogy" 
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
                  <a href="https://sugardefender24.com/d/order-now.php#aff=vontogy" 
                     class="discount-popup-button" 
                     rel="noopener noreferrer nofollow">
                      Get Discount
                  </a>
                  <a href="https://sugardefender24.com/d/order-now.php#aff=vontogy" 
                     class="discount-popup-close-btn" 
                     id="discount-popup-close-btn"
                     rel="noopener noreferrer nofollow">Close</a>
                </div>
              </div>
            </div>
          </div>
        `;

        const popupContainer = document.createElement("div");
        popupContainer.id = "sugardefender-discount-popup-container";
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
        styleElement.setAttribute("data-sugardefender-popup-style", "true");
        styleElement.textContent = popupStyles;
        document.head.appendChild(styleElement);

        // Initialize popup functionality directly in TypeScript
        const TIMER_STORAGE_KEY = 'sugardefender_discount_timer';
        const TIMER_TIMESTAMP_KEY = 'sugardefender_discount_timer_timestamp';
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
               window.location.href = 'https://sugardefender24.com/d/order-now.php#aff=vontogy';
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
               window.location.href = 'https://sugardefender24.com/d/order-now.php#aff=vontogy';
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
               window.location.href = 'https://sugardefender24.com/d/order-now.php#aff=vontogy';
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
      
      // Remove sugardefender styles on unmount
      document.querySelectorAll("style[data-sugardefender-style]").forEach((style) => {
        style.remove();
      });

      // Remove popup styles and container
      document.querySelectorAll("style[data-sugardefender-popup-style]").forEach((style) => {
        style.remove();
      });
      
      const popupContainer = document.getElementById("sugardefender-discount-popup-container");
      if (popupContainer) {
        popupContainer.remove();
      }
    };
  }, []);

  return (
    <div 
      className="sugardefender-wrapper" 
      ref={containerRef} 
      style={{ 
        minHeight: "100vh", 
        width: "100%", 
        isolation: "isolate",
        position: "relative",
        overflow: "visible"
      }} 
    />
  );
}
