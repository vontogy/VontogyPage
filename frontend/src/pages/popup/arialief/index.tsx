import { useEffect, useRef } from "react";

export default function Arialief() {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupLoadedRef = useRef(false);

  // Load and inject Arialief CSS
  useEffect(() => {
    // Create a link element for the CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/pages/popup/arialief/assets/css/style.css';
    link.setAttribute('data-arialief-css', 'true');
    document.head.appendChild(link);

    // Cleanup - remove CSS when unmounting
    return () => {
      const arialiefCSS = document.head.querySelector('link[data-arialief-css="true"]');
      if (arialiefCSS) {
        arialiefCSS.remove();
      }
    };
  }, []);

  // Update meta tags for Arialief page
  useEffect(() => {
    // Save original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');

    // Set Arialief specific meta tags
    document.title = "Arialief - Natural Health Supplement";
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', 'Arialief is a natural health supplement designed to support your wellness. Order now with special discount!');
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', 'Arialief - Natural Health Supplement');
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', 'Arialief is a natural health supplement designed to support your wellness. Order now with special discount!');
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
        const response = await fetch("/src/pages/popup/arialief/index.html");
        
        if (!response.ok) {
          throw new Error("HTML file not found");
        }
        
        const html = await response.text();
        
        if (!containerRef.current) return;

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Adjust asset paths to work from the root
        // Import images using Vite's import system
        const basePath = "/src/pages/popup/arialief/";
        
        // Remove stylesheet links since we're importing CSS directly
        doc.querySelectorAll("link[rel='stylesheet']").forEach((link) => {
          link.remove();
        });

        // Fix script sources
        doc.querySelectorAll("script[src]").forEach((script) => {
          const src = script.getAttribute("src");
          if (src && !src.startsWith("http") && !src.startsWith("/")) {
            script.setAttribute("src", basePath + src);
          }
        });

        // Fix image sources
        doc.querySelectorAll("img[src]").forEach((img) => {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("http") && !src.startsWith("/")) {
            img.setAttribute("src", basePath + src);
          }
        });

        // Fix picture sources
        doc.querySelectorAll("source[srcset]").forEach((source) => {
          const srcset = source.getAttribute("srcset");
          if (srcset && !srcset.startsWith("http") && !srcset.startsWith("/")) {
            source.setAttribute("srcset", basePath + srcset);
          }
        });

        // Extract and inject styles
        const styles = doc.querySelectorAll("style");
        styles.forEach((style) => {
          const existingStyle = document.head.querySelector(`style[data-arialief-style]`);
          if (!existingStyle) {
            const newStyle = document.createElement("style");
            newStyle.setAttribute("data-arialief-style", "true");
            newStyle.textContent = style.textContent;
            document.head.appendChild(newStyle);
          }
        });

        // Inject body content
        if (containerRef.current) {
          containerRef.current.innerHTML = doc.body.innerHTML;

          // Execute scripts
          const scripts = doc.body.querySelectorAll("script");
          scripts.forEach((oldScript) => {
            const newScript = document.createElement("script");
            Array.from(oldScript.attributes).forEach((attr) => {
              newScript.setAttribute(attr.name, attr.value);
            });
            if (oldScript.innerHTML) {
              newScript.textContent = oldScript.innerHTML;
            }
            containerRef.current?.appendChild(newScript);
          });
        }
      } catch (error) {
        console.error("Error loading Arialief page:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
              <h1>Error loading page</h1>
              <p>Could not load Arialief page. Please try again later.</p>
            </div>
          `;
        }
      }
    };

    loadHTML();

    // Load discount popup after 2 seconds
    const loadDiscountPopup = async () => {
      if (popupLoadedRef.current) return;
      popupLoadedRef.current = true;

      try {
        const response = await fetch("/src/pages/popup/arialief/discount-popup.html");
        if (!response.ok) {
          throw new Error("Popup file not found");
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Inject popup HTML into body
        const popupContainer = document.createElement("div");
        popupContainer.id = "arialief-discount-popup-container";
        popupContainer.innerHTML = doc.body.innerHTML;
        document.body.appendChild(popupContainer);

        // Inject styles
        const styles = doc.querySelectorAll("style");
        styles.forEach((style) => {
          const newStyle = document.createElement("style");
          newStyle.setAttribute("data-arialief-popup-style", "true");
          newStyle.textContent = style.textContent;
          document.head.appendChild(newStyle);
        });

        // Execute scripts
        const scripts = doc.querySelectorAll("script");
        scripts.forEach((oldScript) => {
          const newScript = document.createElement("script");
          if (oldScript.innerHTML) {
            newScript.textContent = oldScript.innerHTML;
          }
          document.body.appendChild(newScript);
        });

        // Call the show popup function after a brief delay to ensure script executed
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
      
      // Remove arialief styles on unmount
      document.querySelectorAll("style[data-arialief-style]").forEach((style) => {
        style.remove();
      });

      // Remove popup styles and container
      document.querySelectorAll("style[data-arialief-popup-style]").forEach((style) => {
        style.remove();
      });
      
      const popupContainer = document.getElementById("arialief-discount-popup-container");
      if (popupContainer) {
        popupContainer.remove();
      }
    };
  }, []);

  return (
    <div 
      className="arialief-wrapper" 
      ref={containerRef} 
      style={{ minHeight: "100vh", width: "100%", isolation: "isolate" }} 
    />
  );
}

