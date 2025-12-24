import { useEffect, useRef } from "react";
import "./assets/css/style.css";

export default function Audifort() {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupLoadedRef = useRef(false);

  useEffect(() => {
    const loadHTML = async () => {
      try {
        // Try to load the HTML file
        // In development, Vite might serve it, in production we need it in public
        const response = await fetch("/src/pages/popup/audifort/audifort.html");
        
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
        const basePath = "/src/pages/popup/audifort/";
        
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
          const existingStyle = document.head.querySelector(`style[data-audifort-style]`);
          if (!existingStyle) {
            const newStyle = document.createElement("style");
            newStyle.setAttribute("data-audifort-style", "true");
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
        console.error("Error loading Audifort page:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
              <h1>Error loading page</h1>
              <p>Could not load Audifort page. Please try again later.</p>
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
        const response = await fetch("/src/pages/popup/audifort/discount-popup.html");
        if (!response.ok) {
          throw new Error("Popup file not found");
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Inject popup HTML into body
        const popupContainer = document.createElement("div");
        popupContainer.id = "audifort-discount-popup-container";
        popupContainer.innerHTML = doc.body.innerHTML;
        document.body.appendChild(popupContainer);

        // Inject styles
        const styles = doc.querySelectorAll("style");
        styles.forEach((style) => {
          const newStyle = document.createElement("style");
          newStyle.setAttribute("data-audifort-popup-style", "true");
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

  return <div ref={containerRef} style={{ minHeight: "100vh", width: "100%" }} />;
}

