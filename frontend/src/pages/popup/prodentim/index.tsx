import { useEffect, useRef } from "react";

export default function Prodentim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupLoadedRef = useRef(false);

  // Load and inject Prodentim CSS
  useEffect(() => {
    // Load multiple CSS files in order
    const cssFiles = [
      '/prodentim/statics/css/bootstrap.min.css',
      '/prodentim/statics/css/style.css',
      '/prodentim/statics/css/webfont.css'
    ];

    const links: HTMLLinkElement[] = [];
    
    cssFiles.forEach((href, index) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-prodentim-css', 'true');
      link.setAttribute('data-css-index', index.toString());
      document.head.appendChild(link);
      links.push(link);
    });

    // Force body to be visible and reset global styles (override CSS that hides it)
    const styleOverride = document.createElement('style');
    styleOverride.setAttribute('data-prodentim-override', 'true');
    styleOverride.textContent = `
      /* Reset and visibility overrides */
      body { 
        display: block !important; 
        opacity: 1 !important;
        visibility: visible !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Ensure prodentim wrapper is visible and isolated */
      .prodentim-wrapper { 
        display: block !important; 
        opacity: 1 !important;
        visibility: visible !important;
        position: relative !important;
        width: 100% !important;
        min-height: 100vh !important;
        font-family: main-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
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

      /* Override Tailwind/global resets inside prodentim wrapper */
      .prodentim-wrapper * {
        box-sizing: border-box;
      }

      /* Ensure proper inheritance */
      .prodentim-wrapper div,
      .prodentim-wrapper span,
      .prodentim-wrapper p,
      .prodentim-wrapper a,
      .prodentim-wrapper img,
      .prodentim-wrapper button,
      .prodentim-wrapper h1, .prodentim-wrapper h2, .prodentim-wrapper h3,
      .prodentim-wrapper h4, .prodentim-wrapper h5, .prodentim-wrapper h6,
      .prodentim-wrapper ul, .prodentim-wrapper ol, .prodentim-wrapper li,
      .prodentim-wrapper section, .prodentim-wrapper header, .prodentim-wrapper footer {
        font-family: inherit;
        line-height: inherit;
      }

      /* Ensure Bootstrap grid works properly */
      .prodentim-wrapper .container-fluid,
      .prodentim-wrapper .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }

      .prodentim-wrapper .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
      }

      .prodentim-wrapper [class*="col-"] {
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
      div[id*="vercel"],
      *[class*="vercel-badge"],
      *[id*="vercel-badge"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(styleOverride);

    // Cleanup - remove CSS when unmounting
    return () => {
      links.forEach(link => link.remove());
      const overrideStyle = document.head.querySelector('style[data-prodentim-override="true"]');
      if (overrideStyle) {
        overrideStyle.remove();
      }
    };
  }, []);

  // Update meta tags for Prodentim page
  useEffect(() => {
    // Save original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');

    // Set Prodentim specific meta tags
    document.title = "ProDentim - Oral Health Probiotic Supplement";
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', 'ProDentim is a unique blend of 3.5 billion probiotics and nutrients specially designed to repopulate your mouth with good bacteria. Order now with special discount!');
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', 'ProDentim - Oral Health Probiotic Supplement');
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', 'ProDentim is a unique blend of 3.5 billion probiotics and nutrients specially designed to repopulate your mouth with good bacteria. Order now with special discount!');
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
        // Try to load the HTML file
        // In development, Vite might serve it, in production we need it in public
        const response = await fetch("/prodentim/prodentim.html");
        
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
        // Import images using Vite's import system
        const basePath = "/prodentim/statics/";
        
        // Remove stylesheet links since we're importing CSS directly
        doc.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          link.remove();
        });

        // Fix link hrefs (like favicon)
        doc.querySelectorAll("link[href]").forEach((link) => {
          const href = link.getAttribute("href");
          if (href && !href.startsWith("http") && !href.startsWith("/")) {
            // If it starts with "statics/", replace with absolute path
            if (href.startsWith("statics/")) {
              link.setAttribute("href", "/prodentim/" + href);
            }
          }
        });

        // Fix script sources
        doc.querySelectorAll("script[src]").forEach((script) => {
          const src = script.getAttribute("src");
          if (src && !src.startsWith("http") && !src.startsWith("/")) {
            // If it starts with "statics/", replace with absolute path
            if (src.startsWith("statics/")) {
              script.setAttribute("src", "/prodentim/" + src);
            } else {
              script.setAttribute("src", basePath + src);
            }
          }
        });

        // Fix image sources
        doc.querySelectorAll("img[src]").forEach((img) => {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("http") && !src.startsWith("/")) {
            // If it starts with "statics/", replace with absolute path
            if (src.startsWith("statics/")) {
              img.setAttribute("src", "/prodentim/" + src);
            } else {
              img.setAttribute("src", basePath + src);
            }
          }
        });

        // Fix picture sources
        doc.querySelectorAll("source[srcset]").forEach((source) => {
          const srcset = source.getAttribute("srcset");
          if (srcset && !srcset.startsWith("http") && !srcset.startsWith("/")) {
            // If it starts with "statics/", replace with absolute path
            if (srcset.startsWith("statics/")) {
              source.setAttribute("srcset", "/prodentim/" + srcset);
            } else {
              source.setAttribute("srcset", basePath + srcset);
            }
          }
        });

        // Extract and inject styles
        const styles = doc.querySelectorAll("style");
        styles.forEach((style) => {
          const existingStyle = document.head.querySelector(`style[data-prodentim-style]`);
          if (!existingStyle) {
            const newStyle = document.createElement("style");
            newStyle.setAttribute("data-prodentim-style", "true");
            // Fix font paths in CSS (statics/fonts/... -> /prodentim/statics/fonts/...)
            let styleContent = style.textContent || "";
            styleContent = styleContent.replace(/url\(["']?statics\//g, 'url("/prodentim/statics/');
            newStyle.textContent = styleContent;
            document.head.appendChild(newStyle);
          }
        });

        // Inject body content
        if (containerRef.current) {
          containerRef.current.innerHTML = doc.body.innerHTML;

          // Execute scripts - use script injection for better CSP compatibility
          const scripts = doc.body.querySelectorAll("script");
          scripts.forEach((oldScript) => {
            // Check if it's an external script
            if (oldScript.src) {
              const newScript = document.createElement("script");
              newScript.src = oldScript.src;
              Array.from(oldScript.attributes).forEach((attr) => {
                if (attr.name !== 'src') {
                  newScript.setAttribute(attr.name, attr.value);
                }
              });
              document.head.appendChild(newScript);
            } else if (oldScript.innerHTML) {
              // Execute inline scripts by injecting as script element (better CSP compatibility)
              try {
                const newScript = document.createElement("script");
                newScript.textContent = oldScript.innerHTML;
                // Copy attributes if any
                Array.from(oldScript.attributes).forEach((attr) => {
                  if (attr.name !== 'src' && attr.name !== 'innerHTML') {
                    newScript.setAttribute(attr.name, attr.value);
                  }
                });
                document.head.appendChild(newScript);
                // Remove after execution to keep DOM clean
                setTimeout(() => {
                  if (newScript.parentNode) {
                    newScript.parentNode.removeChild(newScript);
                  }
                }, 0);
              } catch (error) {
                console.error("Error executing inline script:", error);
                // Fallback: try Function constructor if script injection fails
                try {
                  // Function constructor is more CSP-friendly than eval
                  new Function(oldScript.innerHTML)();
                } catch (fallbackError) {
                  console.error("Error with Function constructor fallback:", fallbackError);
                }
              }
            }
          });
        }
      } catch (error) {
        console.error("Error loading Prodentim page:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding: 2rem; text-align: center; color: #000;">
              <h1>Error loading page</h1>
              <p>Could not load Prodentim page. Please try again later.</p>
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
    const loadDiscountPopup = () => {
      if (popupLoadedRef.current) return;
      popupLoadedRef.current = true;

      try {
        // Inject popup HTML directly
        const popupHTML = `
          <div id="discount-popup-overlay" class="discount-popup-overlay">
            <div class="discount-popup-container">
              <div class="discount-popup-content">
            <a href="https://prodentim24.com/text.php#aff=vontogy" 
               class="discount-popup-close-x" 
               id="discount-popup-close-x" 
               aria-label="Close"
               rel="noopener noreferrer nofollow">×</a>
                <h2 class="discount-popup-title">Special Discount</h2>
                
                <div class="discount-popup-details">
                  <div class="discount-detail-row">
                    <span class="discount-label">6-bottle plan:</span>
                    <span class="discount-price-original">$594.00</span>
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
                  <a href="https://prodentim24.com/text.php?aff=vontogy#order-now" 
                     class="discount-popup-button" 
                     rel="noopener noreferrer nofollow">
                      Get Discount
                  </a>
                  <a href="https://prodentim24.com/text.php#aff=vontogy" 
                     class="discount-popup-close-btn" 
                     id="discount-popup-close-btn"
                     rel="noopener noreferrer nofollow">Close</a>
                </div>
              </div>
            </div>
          </div>
        `;

        const popupContainer = document.createElement("div");
        popupContainer.id = "prodentim-discount-popup-container";
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
        styleElement.setAttribute("data-prodentim-popup-style", "true");
        styleElement.textContent = popupStyles;
        document.head.appendChild(styleElement);

        // Initialize popup functionality directly in TypeScript
        const TIMER_STORAGE_KEY = 'prodentim_discount_timer';
        const TIMER_TIMESTAMP_KEY = 'prodentim_discount_timer_timestamp';
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
         
         // Add click handlers for popup buttons with loading state
         setTimeout(() => {
           const getDiscountBtn = document.querySelector('.discount-popup-button') as HTMLAnchorElement;
           const closeBtn = document.querySelector('.discount-popup-close-btn') as HTMLAnchorElement;
           const closeXBtn = document.getElementById('discount-popup-close-x') as HTMLAnchorElement;
           
           if (getDiscountBtn) {
             getDiscountBtn.addEventListener('click', function() {
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
             });
           }
           
           if (closeBtn) {
             closeBtn.addEventListener('click', function() {
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
             });
           }
           
           if (closeXBtn) {
             closeXBtn.addEventListener('click', function() {
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
      
      // Remove prodentim styles on unmount
      document.querySelectorAll("style[data-prodentim-style]").forEach((style) => {
        style.remove();
      });

      // Remove popup styles and container
      document.querySelectorAll("style[data-prodentim-popup-style]").forEach((style) => {
        style.remove();
      });
      
      const popupContainer = document.getElementById("prodentim-discount-popup-container");
      if (popupContainer) {
        popupContainer.remove();
      }
    };
  }, []);

  return (
    <div 
      className="prodentim-wrapper" 
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

