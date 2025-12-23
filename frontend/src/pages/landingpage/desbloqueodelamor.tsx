import { useEffect, useState } from "react";
import { Shield, Star, ArrowRight, Award, Zap, Infinity as InfinityIcon, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/landingpages/desbloqueodelamor/accordion";
import { motion } from "framer-motion";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Assets
const bestValueImage = "/images/landingpages/desbloqueodelamor/images/best_value.webp";
const heroSectionImage = "/images/landingpages/desbloqueodelamor/images/herosection.webp";
const heroSectionDesktopImage = "/images/landingpages/desbloqueodelamor/images/herosection_desktop.webp";
const heroSectionLogo = "/images/landingpages/desbloqueodelamor/images/herosection_logo.webp";
const whoImage = "/images/landingpages/desbloqueodelamor/images/Who.webp";
const whySectionImage = "/images/landingpages/desbloqueodelamor/images/whysection.webp";
const hotmartImage = "/images/landingpages/desbloqueodelamor/hotmart.webp";
const moneyBackImage = "/images/landingpages/desbloqueodelamor/images/moneyback.webp";


// Reusable Pricing Section Component
function PricingSection({ sectionId }: { sectionId?: string }) {
  return (
    <section id={sectionId} className="py-20 bg-[#F5F1E8]">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-none tracking-tight text-gray-900">
            ¿Cuánto vale dejar de repetir el mismo sufrimiento año tras año?
          </h2>
        </div>
        
        {/* Pricing Content - Image Left, Card Right */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Product Image - Left (Desktop only) */}
            <div id="pricing-image" className="order-1 md:order-1 hidden md:flex justify-center md:justify-end">
              <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
                <div className="w-full aspect-[3/4] relative">
                  <img 
                    src={bestValueImage} 
                    alt="El Arte de Soltar" 
                    className="w-full h-full object-contain drop-shadow-2xl select-none" 
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="800"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Card - Right */}
            <div className="order-2 md:order-2">
              <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#CA9E63] shadow-xl">
                {/* Price Text */}
                <p className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-relaxed text-center">
                  LIBRO DIGITAL + 2 BONOS EXCLUSIVOS
                </p>

                {/* Product Image - Mobile only (inside card) */}
                <div id="pricing-image-mobile" className="flex justify-center mb-6 md:hidden">
                  <div className="relative w-full max-w-xs">
                    <div className="w-full aspect-[3/4] relative">
                      <img 
                        src={bestValueImage} 
                        alt="El Arte de Soltar" 
                        className="w-full h-full object-contain drop-shadow-2xl select-none" 
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="800"
                      />
                    </div>
                  </div>
                </div>

                {/* Large Price */}
                <div className="mb-6 text-center">
                  <p className="text-sm md:text-base text-red-600 line-through mb-2 font-bold">
                    De US$ 24,90 por
                  </p>
                  <div className="text-6xl md:text-7xl lg:text-8xl font-black text-green-600 mb-2 tracking-tighter">
                    US$ 8,90
                  </div>
                </div>

                {/* Descriptive Text */}
                <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed text-center">
                  Ya gastaste mucho más en ropa para intentar impresionar, en cenas que no llevaron a nada y en terapias que no fueron directo al punto. Hoy, tu libertad emocional cuesta menos que un snack en la panadería.
                </p>

                {/* CTA Button */}
                <motion.div
                  id="pricing-cta"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full"
                >
                  <a 
                    href="https://pay.hotmart.com/B103516360I?checkoutMode=10"
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="w-full h-14 md:h-16 px-4 md:px-6 text-base md:text-lg bg-[#CA9E63] hover:bg-[#B0894F] text-white font-bold rounded-xl shadow-xl shadow-[#CA9E63]/25 transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="md:hidden">APROVECHAR ESTE REGALO</span>
                    <span className="hidden md:inline">QUIERO APROVECHAR ESTE REGALO AHORA</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                  </a>
                </motion.div>

                {/* Trust Badges */}
                <div className="mt-6 space-y-4">
                  {/* Trust Icons Row */}
                  <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-xs md:text-sm text-gray-700 font-medium">Compra Segura</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-xs md:text-sm text-gray-700 font-medium">Satisfacción Garantizada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-xs md:text-sm text-gray-700 font-medium">Acceso Inmediato</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <InfinityIcon className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-xs md:text-sm text-gray-700 font-medium">Acceso Vitalicio</span>
                    </div>
                  </div>

                  {/* Powered by Hotmart */}
                  <div className="flex flex-col items-center gap-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Impulsado por</span>
                      <div className="h-4 md:h-5 aspect-[4/1] relative">
                        <img 
                          src={hotmartImage} 
                          alt="Hotmart" 
                          className="h-full w-auto object-contain select-none"
                          loading="lazy"
                          decoding="async"
                          width="200"
                          height="50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee Badge */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 aspect-square relative">
                  <img 
                    src={moneyBackImage} 
                    alt="Money Back Guarantee" 
                    className="w-full h-full object-contain select-none" 
                    loading="lazy"
                    decoding="async"
                    width="160"
                    height="160"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-black leading-none tracking-tight text-gray-900 mb-3">
                    Prueba todo el sistema con CERO RIESGO durante 7 días.
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Estoy tan seguro de que este manual te dará la paz que buscas, que asumo todo el riesgo. Léelo, aplica las técnicas y duerme mejor hoy mismo. Si no sientes un alivio inmediato en tu pecho, simplemente envíame un correo y te devolveré el 100% de tu dinero. Sin preguntas incómodas, sin burocracia y sin rencores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



export default function Desbloqueodelamor() {
  // State to control content visibility - now shows immediately on page load
  const [showContent] = useState(true);

  useEffect(() => {
    // Set Desbloqueodelamor page metadata
    document.title = "El Arte de Soltar: Cómo Superar a tu Ex y Recuperar tu Paz";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "¿No logras olvidar? Descubre la guía práctica para arrancar el apego, dejar de revisar sus redes y dormir tranquilo hoy mismo. Descarga inmediata en PDF.");
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "El Arte de Soltar: Cómo Superar a tu Ex y Recuperar tu Paz");
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "¿No logras olvidar? Descubre la guía práctica para arrancar el apego, dejar de revisar sus redes y dormir tranquilo hoy mismo. Descarga inmediata en PDF.");
    }
    
    // Set Desbloqueodelamor favicon
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = "/images/landingpages/desbloqueodelamor/icon.webp";
    }

    // Google Tag (gtag.js) - Load script if not already loaded
    if (!window.gtag) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-HQSZQB4RKX';
      document.head.appendChild(script1);

      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer!.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'G-HQSZQB4RKX');
    } else {
      // If gtag already exists, just configure this tag
      window.gtag('config', 'G-HQSZQB4RKX');
    }

    // Meta Pixel Code
    if (!window.fbq) {
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    }
    
    // Initialize Meta Pixel
    const initPixel = () => {
      if (window.fbq) {
        window.fbq('init', '2554305048323209');
        window.fbq('set', 'autoConfig', false, '2554305048323209');
        window.fbq('track', 'PageView');
      } else {
        setTimeout(initPixel, 50);
      }
    };
    
    // Start initialization
    if (window.fbq) {
      initPixel();
    } else {
      // Wait for script to load
      setTimeout(initPixel, 50);
    }

    // Cleanup: restore Vontogy (Home) values when leaving the page
    return () => {
      document.title = "Vontogy - Affiliate Marketing";
      
      if (metaDescription) {
        metaDescription.setAttribute("content", "Vontogy is an affiliate marketing website. Discover our curated selection of quality products.");
      }
      
      if (ogTitle) {
        ogTitle.setAttribute("content", "Vontogy - Affiliate Marketing");
      }
      
      if (ogDescription) {
        ogDescription.setAttribute("content", "Vontogy is an affiliate marketing website. Discover our curated selection of quality products.");
      }
      
      if (favicon) {
        favicon.href = "https://res.cloudinary.com/dopp0v9eq/image/upload/v1763574787/monfily-black-nobg_risk6t.png";
      }
    };
  }, []);


  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden md:pt-0" style={{ paddingTop: 0 }}>
      {/* Meta Pixel Code */}
      <noscript>
        <img 
          height={1} 
          width={1} 
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=2554305048323209&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          display: flex;
          width: fit-content;
          animation: scroll 60s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 50s linear infinite;
          }
          body {
            padding-top: 0 !important;
            margin-top: 0 !important;
          }
          html {
            padding-top: 0 !important;
            margin-top: 0 !important;
          }
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* All sections below - Now visible on page load */}
      {showContent && (
        <>
          {/* Hero Section */}
          <section className="relative pt-0 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-white to-secondary/30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 rounded-l-[100px] -z-10 hidden md:block" />
        
        {/* Image - First on mobile (full width, no margins), positioned in grid on desktop */}
        <div className="w-full md:hidden mb-3 overflow-hidden">
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6 }}
             className="relative z-10 w-full"
             style={{ marginLeft: '-1rem', marginRight: '-1rem', width: 'calc(100% + 2rem)' }}
          >
             <div className="relative w-full" style={{ minHeight: '60vh' }}>
               <img 
                 src={heroSectionImage} 
                 alt="Nervovive" 
                 className="relative w-full h-auto object-contain select-none"
                 width="1200"
                 height="1080"
                 fetchPriority="high"
                 decoding="async"
                 style={{ display: 'block' }}
               />
             </div>
          </motion.div>
          {/* Logo below image on mobile */}
          <div className="flex justify-center -mt-8 mb-4">
            <img 
              src={heroSectionLogo} 
              alt="Logo" 
              className="w-2/3 max-w-md h-auto object-contain select-none"
              width="1200"
              height="1080"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Title - Second on mobile (after image), inside left column on desktop */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-none tracking-tight text-gray-900 text-center md:hidden mb-4"
          >
            Basta de ser la mujer que lo hace todo por la relación y termina sola o rechazada.
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image - Hidden on mobile (shown above), second on desktop */}
            <div className="relative flex flex-col items-center md:justify-end hidden md:flex md:mt-8">
              <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6 }}
                 className="relative z-10 w-full flex justify-center md:scale-[180%]"
              >
                 <div className="absolute inset-0 bg-[#B0894F]/20 blur-[60px] rounded-full transform scale-75" />
                 <div className="relative w-full max-w-[1600px] aspect-[10/9] mx-auto">
                   <img 
                     src={heroSectionDesktopImage} 
                     alt="Nervovive" 
                     className="relative w-full h-full object-contain drop-shadow-2xl select-none"
                     width="1200"
                     height="1080"
                     fetchPriority="high"
                     decoding="async"
                   />
                 </div>
              </motion.div>
            </div>

            {/* Content - Third on mobile, first on desktop */}
            <div className="space-y-6 md:space-y-8 z-10 text-center md:text-left order-3 md:order-1 mt-6 md:mt-0">
              {/* Logo above title on desktop */}
              <div className="hidden md:flex justify-start mb-4">
                <img 
                  src={heroSectionLogo} 
                  alt="Logo" 
                  className="w-1/3 max-w-xs h-auto object-contain select-none"
                  width="1200"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Title - Hidden on mobile (already shown above), visible on desktop */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hidden md:block text-4xl sm:text-5xl md:text-5xl font-black leading-none tracking-tight text-gray-900"
              >
                Basta de ser la mujer que lo hace todo por la relación y termina sola o rechazada.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed mx-auto md:mx-0"
              >
                Descubre cómo romper el ciclo del rechazo y sanar la carencia que aleja a los hombres, para finalmente atraer a alguien que te ame y te valore de verdad. Una guía práctica para que dejes de perseguir y empieces a ser elegida.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col items-center md:items-start gap-1"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-700 font-semibold text-base md:text-lg">
                    4.9
                  </span>
                </div>
                <span className="text-gray-600 text-sm md:text-base">
                ¡Más de 12.398 reseñas positivas!
                </span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 pt-2 justify-center items-center md:justify-start md:items-start"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full flex justify-center md:justify-start"
                >
                  <a 
                    href="#pricing-image"
                    onClick={(e) => {
                      e.preventDefault();
                      const isMobile = window.innerWidth < 768;
                      const elementId = isMobile ? 'pricing-image-mobile' : 'pricing-image';
                      const element = document.getElementById(elementId);
                      if (element) {
                        const offset = 100; // Offset para não ficar colado no topo
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-[#CA9E63] hover:bg-[#B0894F] text-white font-bold rounded-xl shadow-xl shadow-[#CA9E63]/25 transition-all hover:scale-105 flex items-center justify-center mx-auto md:mx-0 w-full md:w-auto cursor-pointer leading-tight text-center whitespace-normal"
                  >
                    <span className="md:hidden">QUIERO DESTRABAR MI VIDA AMOROSA AHORA</span>
                    <span className="hidden md:inline">QUIERO DESTRABAR MI<br />VIDA AMOROSA AHORA</span>
                  </a>
                </motion.div>
                <p className="text-sm text-gray-500 text-center md:text-left">
                  Acceso inmediato en tu correo electrónico
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* O Mecanismo Único Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title - First on mobile only */}
            <div className="text-center md:hidden mb-6">
              <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight text-gray-900 mb-6">
              ¿Por qué una mujer tan increíble sigue sola o infeliz en el amor?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 md:items-stretch">
              {/* Image - After title on mobile (order-1), second on desktop (right) */}
              <div className="relative order-1 md:order-2 flex">
                <img 
                  src={whySectionImage} 
                  alt="Nervovive Bottles" 
                  className="w-full max-w-lg md:w-full md:h-full rounded-2xl drop-shadow-2xl select-none object-cover" 
                  width="1888"
                  height="1359"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Content - After image on mobile (order-2), first on desktop (left) */}
              <div className="space-y-6 text-center md:text-left order-2 md:order-1">
                {/* Subtitle and content for mobile */}
                <div className="md:hidden text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Tal vez te preguntes qué hay de malo en ti. Eres inteligente, luchadora, independiente… pero en tu vida amorosa, parece que siempre estás viviendo la misma película repetida:
                  </p>
                  <div className="space-y-3">
                    <div className="border-2 border-[#CA9E63] rounded-xl p-4">
                      <p>Te entregas al 100% al principio, pero tu pareja pierde el interés y se aleja.</p>
                    </div>
                    <div className="border-2 border-[#CA9E63] rounded-xl p-4">
                      <p>Atraes a hombres no disponibles (casados, con "situaciones" o que no quieren compromiso).</p>
                    </div>
                    <div className="border-2 border-[#CA9E63] rounded-xl p-4">
                      <p>Sientes un vacío constante, incluso cuando estás con alguien, aceptando migajas de atención solo para no quedarte sola.</p>
                    </div>
                    <div className="border-2 border-[#CA9E63] rounded-xl p-4">
                      <p>Intentas controlarlo todo para evitar que te hagan daño, pero terminas asfixiando la relación.</p>
                    </div>
                  </div>
                  <p>
                    La verdad es dura, pero hay que decirla: el problema no es tu apariencia, tu edad ni la "mala suerte". El problema es lo que cargas sin darte cuenta.
                  </p>
                  <p>
                    Mientras no sanes la Herida de Abandono y los patrones que heredaste de tu familia, seguirás actuando como una niña herida en el cuerpo de una mujer adulta.
                  </p>
                  <p>
                    Intentas "comprar" amor siendo buena o intentas protegerte siendo "demasiado fuerte". El resultado siempre es el mismo: el rechazo.
                  </p>
                  <p className="font-bold">
                    No necesitas otro consejo de amiga ni más terapia. Necesitas desbloquear ese patrón inconsciente para dejar de repeler el amor que tanto deseas.
                  </p>
                </div>
                {/* Title - Above description on desktop */}
                <div className="hidden md:block">
                  <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight text-gray-900 mb-6">
                  ¿Por qué una mujer tan increíble sigue sola o infeliz en el amor?
                  </h2>
                  <div className="text-lg text-gray-700 leading-relaxed text-left space-y-6">
                    <p className="text-xl">
                      Tal vez te preguntes qué hay de malo en ti. Eres inteligente, luchadora, independiente… pero en tu vida amorosa, parece que siempre estás viviendo la misma película repetida:
                    </p>
                    <div className="grid grid-cols-2 gap-4 my-6">
                      <div className="border-2 border-[#CA9E63] rounded-xl p-5 hover:shadow-md transition-shadow text-center flex items-center justify-center">
                        <p className="leading-relaxed">Te entregas al 100% al principio, pero tu pareja pierde el interés y se aleja.</p>
                      </div>
                      <div className="border-2 border-[#CA9E63] rounded-xl p-5 hover:shadow-md transition-shadow text-center flex items-center justify-center">
                        <p className="leading-relaxed">Atraes a hombres no disponibles (casados, con "situaciones" o que no quieren compromiso).</p>
                      </div>
                      <div className="border-2 border-[#CA9E63] rounded-xl p-5 hover:shadow-md transition-shadow text-center flex items-center justify-center">
                        <p className="leading-relaxed">Sientes un vacío constante, incluso cuando estás con alguien, aceptando migajas de atención solo para no quedarte sola.</p>
                      </div>
                      <div className="border-2 border-[#CA9E63] rounded-xl p-5 hover:shadow-md transition-shadow text-center flex items-center justify-center">
                        <p className="leading-relaxed">Intentas controlarlo todo para evitar que te hagan daño, pero terminas asfixiando la relación.</p>
                      </div>
                    </div>
                    <div className="space-y-5 pt-2">
                      <p>
                        La verdad es dura, pero hay que decirla: el problema no es tu apariencia, tu edad ni la "mala suerte". El problema es lo que cargas sin darte cuenta.
                      </p>
                      <p>
                        Mientras no sanes la Herida de Abandono y los patrones que heredaste de tu familia, seguirás actuando como una niña herida en el cuerpo de una mujer adulta.
                      </p>
                      <p>
                        Intentas "comprar" amor siendo buena o intentas protegerte siendo "demasiado fuerte". El resultado siempre es el mismo: el rechazo.
                      </p>
                      <p className="font-bold text-xl pt-2">
                        No necesitas otro consejo de amiga ni más terapia. Necesitas desbloquear ese patrón inconsciente para dejar de repeler el amor que tanto deseas.
                      </p>
                    </div>
                  </div>
                </div>
              <div className="flex justify-center md:justify-start">
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full flex justify-center md:w-auto"
                >
                  <a 
                    href="#pricing-image"
                    onClick={(e) => {
                      e.preventDefault();
                      const isMobile = window.innerWidth < 768;
                      const elementId = isMobile ? 'pricing-image-mobile' : 'pricing-image';
                      const element = document.getElementById(elementId);
                      if (element) {
                        const offset = 100; // Offset para não ficar colado no topo
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-[#CA9E63] hover:bg-[#B0894F] text-white font-bold rounded-xl shadow-xl shadow-[#CA9E63]/25 transition-all hover:scale-105 flex items-center justify-center md:justify-start gap-1.5 md:gap-2 mx-auto md:mx-0 w-full md:w-auto cursor-pointer"
                  >
                    <span className="md:hidden">DESBLOQUEAR ESTO YA</span>
                    <span className="hidden md:inline">DESBLOQUEAR ESTE PATRÓN YA</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 shrink-0" />
                  </a>
                </motion.div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promises Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-none tracking-tight text-gray-900">
              Estás tocando tu propia herida.
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Seguir humillándote por migajas de atención es como intentar curar una quemadura con agua hirviendo. Este libro es la curita que detiene el dolor de inmediato y permite que tu piel sane de verdad.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* Card 1 - Dolor → Alivio Inmediato */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="bg-[#2C2C2C] text-white p-6 flex-1">
                <h3 className="text-xl font-bold mb-4 text-center">Dolor → Alivio Inmediato</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Cómo detener la ansiedad aplastante cuando él ve tu mensaje y no responde.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      La técnica exacta para dormir en paz sin quedarte repasando "¿en qué fue que me equivoqué?" en tu cabeza.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Cómo desactivar el impulso de stalkear a tu ex (o al actual no disponible) en las redes sociales.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Elimina la sensación de culpa y sal de la posición de "víctima" de tu propia historia amorosa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Cómo lidiar con una "desaparición" de él sin sentir que tú no vales.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 2 - Menor Esfuerzo → Mayor Resultado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="bg-[#2C2C2C] text-white p-6 flex-1">
                <h3 className="text-xl font-bold mb-4 text-center">Menor Esfuerzo → Mayor Resultado</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Entiende la raíz de tu "mala suerte" en el amor con una lectura rápida, que desbloquea más que años de terapia convencional.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      3 actitudes simples para hacer cuando te den ganas de mandar ese mensaje desde la carencia.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Una herramienta práctica que transforma el dolor del rechazo en indiferencia (y poder) en pocos días.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      No necesitas leer teorías difíciles: solo sigue el paso a paso para reprogramar tu inconsciente.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 3 - Antes (Carente) → Después (Magnética) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="bg-[#2C2C2C] text-white p-6 flex-1">
                <h3 className="text-xl font-bold mb-4 text-center">Antes (Carente) → Después (Magnética)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Transforma la necesidad desesperada de validación masculina en orgullo por tu propia compañía.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Cómo recuperar el brillo en la mirada que las relaciones tóxicas apagaron.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Sustituye el miedo a quedarte sola por la emoción de una nueva vida libre de ataduras emocionales.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                      Conviértete en la persona que mira atrás y dice: "¿Cómo pude aceptar tan poco durante tanto tiempo?".
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full flex justify-center md:w-auto"
            >
              <a 
                href="#pricing-image"
                onClick={(e) => {
                  e.preventDefault();
                  const isMobile = window.innerWidth < 768;
                  const elementId = isMobile ? 'pricing-image-mobile' : 'pricing-image';
                  const element = document.getElementById(elementId);
                  if (element) {
                    const offset = 100; // Offset para não ficar colado no topo
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-[#CA9E63] hover:bg-[#B0894F] text-white font-bold rounded-xl shadow-xl shadow-[#CA9E63]/25 transition-all hover:scale-105 flex items-center justify-center gap-1.5 md:gap-2 mx-auto md:mx-0 w-full md:w-auto cursor-pointer"
              >
                <span className="md:hidden">SANAR ESTO AHORA</span>
                <span className="hidden md:inline">QUIERO SEGUIR ADELANTE Y SANAR ESTO</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 shrink-0" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>



      {/* About Author Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text Content - Left */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight text-gray-900 mb-6">
                  ¿Quién te va a guiar en este camino?
                </h2>
                <p className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  Soy María Calderini, terapeuta junguiana y psicogenealogista.
                </p>
              </div>

              {/* Image - Mobile only (below subtitle) */}
              <div className="flex justify-center md:hidden mb-6" style={{ marginLeft: '-1rem', marginRight: '-1rem', width: 'calc(100% + 2rem)' }}>
                <div className="relative w-full">
                  <div className="absolute inset-0 bg-[#B0894F]/40 blur-[100px] rounded-full transform scale-100" />
                  <div className="relative">
                    <img 
                      src={whoImage} 
                      alt="María Calderini" 
                      className="w-full h-auto rounded-2xl drop-shadow-2xl select-none object-contain" 
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-center md:text-left">
                <p>
                  Mi trabajo no se basa en "suposiciones" ni en consejos motivacionales vacíos. Desarrollé un método práctico que une ciencia y terapia profunda para desbloquear patrones emocionales que parecen imposibles de resolver.
                </p>
                <p>
                  Dediqué mi carrera a entender por qué mujeres inteligentes y capaces siguen atrapadas en ciclos de rechazo y sufrimiento amoroso —y, más importante, cómo sacarlas de ahí rápidamente.
                </p>
              </div>

              {/* Social Proof Box */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
                  Mis números no mienten:
                </h3>
                <div className="space-y-4">
                  <div className="border-2 border-[#CA9E63] rounded-xl p-5 hover:shadow-md transition-shadow text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#CA9E63] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-black text-gray-900">+7.000</p>
                        <p className="text-base text-gray-700">alumnas transformadas en cursos y acompañamientos</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-[#CA9E63] rounded-xl p-5 hover:shadow-md transition-shadow text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#CA9E63] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-black text-gray-900">+10.000</p>
                        <p className="text-base text-gray-700">libros vendidos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left">
                Escribí "Desbloqueo del Amor" para que sea el primer paso accesible para cualquier mujer que se cansó de sufrir y quiere una solución real, sin tener que gastar en consulta ahora.
              </p>

              {/* CTA Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 pt-2 justify-center items-center md:justify-start md:items-start"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full flex justify-center md:justify-start"
                >
                  <a 
                    href="#pricing-image"
                    onClick={(e) => {
                      e.preventDefault();
                      const isMobile = window.innerWidth < 768;
                      const elementId = isMobile ? 'pricing-image-mobile' : 'pricing-image';
                      const element = document.getElementById(elementId);
                      if (element) {
                        const offset = 100; // Offset para não ficar colado no topo
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-[#CA9E63] hover:bg-[#B0894F] text-white font-bold rounded-xl shadow-xl shadow-[#CA9E63]/25 transition-all hover:scale-105 flex items-center justify-center mx-auto md:mx-0 w-full md:w-auto cursor-pointer leading-tight text-center whitespace-normal"
                  >
                    <span className="md:hidden">QUIERO ACCEDER AL<br />MÉTODO DE MARÍA</span>
                    <span className="hidden md:inline">QUIERO ACCEDER AL MÉTODO DE MARÍA</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Image - Right (Desktop only) */}
            <div className="hidden md:flex justify-center items-start">
              <div className="relative w-full max-w-3xl lg:max-w-4xl">
                <div className="absolute inset-0 bg-[#B0894F]/40 blur-[100px] rounded-full transform scale-100" />
                <div className="relative">
                  <img 
                    src={whoImage} 
                    alt="María Calderini" 
                    className="w-full h-auto rounded-2xl drop-shadow-2xl select-none object-contain" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection 
        sectionId="pricing"
      />

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight text-gray-900 mb-4">
              Lo que dicen nuestras lectoras
            </h2>
            <div className="flex flex-col items-center gap-1 mt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold text-lg md:text-xl">
                  4.9
                </span>
              </div>
              <span className="text-gray-600 text-base md:text-lg">
                ¡Más de 12.398 reseñas positivas!
              </span>
            </div>
          </div>

          {/* Infinite Scrolling Reviews */}
          <div className="overflow-hidden relative py-6 md:py-8">
            {/* Left gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            {/* Right gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="flex animate-scroll will-change-transform">
              {(() => {
                const reviews = [
                  { name: "Valentina María Martínez Herrera", review: "Llevaba dos semanas sin dormir más de 3 horas seguidas. La técnica de respiración del capítulo 4 fue mágica. Por fin pude descansar y mi cabeza dejó de dar vueltas. ¡Gracias!" },
                  { name: "Fernanda Antonia Rodríguez Delgado", review: "Sentía un dolor físico en el pecho que no se iba con nada. Este libro me dio el 'aire' que necesitaba para volver a respirar. Es como un botiquín de primeros auxilios para el alma." },
                  { name: "Clara Isabel Sánchez Moreno", review: "Honestamente, lo compré solo por el precio, pero el contenido vale oro. Me ayudó a levantarme de la cama el domingo y dejar de llorar. Muy recomendado." },
                  { name: "Javiera Eduarda González Ruiz", review: "Era adicta a revisar su 'última conexión' en WhatsApp. El ejercicio de desintoxicación digital me abrió los ojos. Llevo 5 días de Contacto Cero y me siento libre." },
                  { name: "Mariana Esperanza López Vargas", review: "Me sentía patética rogando atención. Este libro me devolvió la dignidad. Entendí que no necesito a nadie para estar completa. Ya no espero su mensaje." },
                  { name: "Andrea Felipa Pérez Jiménez", review: "No podía sacármelo de la cabeza. La técnica para frenar los pensamientos intrusivos funciona de verdad. Ahora puedo trabajar sin distraerme pensando en él." },
                  { name: "Ricarda Josefina Torres Mendoza", review: "Soy muy escéptica con los libros de autoayuda, pero este es diferente. No tiene frases vacías, son pasos concretos. Si eres lógica y quieres un plan de acción, es este." },
                  { name: "Sofía Alejandra Benítez Castro", review: "Me gusta que sea directo. No quería leer 300 páginas de teoría. Fui directo a los ejercicios y sentí la diferencia esa misma tarde. Práctico y real." },
                  { name: "Diana Armanda Morales Rojas", review: "Pensé que no funcionaría para mí, pero me equivoqué. Este manual me dio la claridad y fuerza que necesitaba para sanar mi corazón roto." },
                  { name: "Elena Patricia Vargas Salazar", review: "Me di cuenta de que perdí años tratando de complacer a alguien que no me valoraba. Hoy me siento más guapa, más segura y lista para lo que viene. ¡Me recuperé a mí misma!" },
                  { name: "Lucía Sebastiana Díaz Ochoa", review: "Mi ex me dejó por otra y mi autoestima estaba en el suelo. Este libro me enseñó a reconstruir mi valor. Ahora veo que el que perdió fue él, no yo." },
                  { name: "Gabriela Fernanda Castillo Medina", review: "Es increíble cómo cambia tu perspectiva. Pasé de víctima a protagonista de mi vida en una semana. Mis amigos dicen que me ven brillar de nuevo." },
                  { name: "Patricia Lucía Navarro Gutiérrez", review: "Simplemente transformador. Cuesta menos que una hamburguesa y te ahorra meses de terapia." },
                  { name: "Jorgelina Luisa Álvarez Paredes", review: "El mejor dinero que he invertido en mí. Dejé de culparme por todo." },
                  { name: "Isabela Carmen Ramírez Fuentes", review: "Lectura rápida y sanadora. Me sentí comprendida en cada página." },
                  { name: "Matilde Andrea Fernández Córdoba", review: "Si estás pasando por una ruptura, no lo pienses. Cómpralo. Te va a ahorrar mucho sufrimiento." },
                  { name: "Lucía Esperanza Pérez Montoya", review: "10/10. Me ayudó a cerrar el ciclo sin rencor y con mucha paz." },
                  { name: "Roberta Carlota Silva Aguirre", review: "Lo leí hace un mes cuando estaba destrozada. Hoy puedo decir que estoy felizmente soltera, enfocada en mis proyectos y sin miedo a la soledad. Me cambió el chip." },
                  { name: "Carmen Rosa Ortega Villalobos", review: "Lo compré llorando y lo terminé sonriendo. Me dio la fuerza para bloquearlo y empezar de cero en otra ciudad. Gracias por tanto." },
                  { name: "Alejandra Davina Vega Espinoza", review: "Creía que nunca iba a superar a mi ex de 5 años. Este método me hizo ver que la vida sigue y puede ser incluso mejor. Ya estoy saliendo con alguien nuevo y sano." },
                ];
                // Render 3 times for smoother infinite loop
                return [...reviews, ...reviews, ...reviews].map((review, index) => (
                  <div key={index} className="flex-shrink-0 w-80 md:w-96 mx-2 bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      "{review.review}"
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      - {review.name}
                    </p>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight text-center mb-12">Preguntas Frecuentes</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* Categoría 1: Sobre el Producto y Para Quien Serve */}
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Sobre el Producto y Para Quien Sirve</h3>
              <div className="space-y-4">
                <FAQItem 
                  question="¿Este libro es solo para mujeres?" 
                  answer="Sí, este libro está diseñado específicamente para mujeres que están pasando por dificultades en sus relaciones amorosas. El método se enfoca en cómo las mujeres procesan la pérdida emocional y los patrones de apego, con un enfoque práctico y directo al grano." 
                />
                <FAQItem 
                  question="Mi relación duró muchos años (o décadas), ¿funcionará para mí?" 
                  answer="Sí. Cuanto más larga la relación, más arraigados están los hábitos neuronales. Este manual te enseña a romper esos patrones específicos, ya sea que hayas estado 2 meses o 20 años en pareja." 
                />
                <FAQItem 
                  question="Todavía tengo que ver a mi ex (trabajo/hijos), ¿puedo aplicar el método?" 
                  answer="Definitivamente. Hay un capítulo dedicado al 'Contacto Cero Modificado', que te enseña a mantener la distancia emocional y poner límites firmes, incluso si tienes que interactuar físicamente con esa persona." 
                />
                <FAQItem 
                  question="¿Esto reemplaza a la terapia psicológica?" 
                  answer="No. Este es un manual de primeros auxilios emocionales y acción práctica. Funciona muy bien como complemento a la terapia o como una herramienta de autoayuda inmediata si no puedes costear un psicólogo ahora mismo." 
                />
                <FAQItem 
                  question="¿Es un libro religioso o espiritual?" 
                  answer="No. El contenido se basa en psicología del comportamiento y gestión emocional práctica. Es 100% secular y aplicable por cualquier persona, sin importar sus creencias." 
                />
              </div>
            </div>

            {/* Categoría 2: Formato e Acesso */}
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Formato e Acesso</h3>
              <div className="space-y-4">
                <FAQItem 
                  question="No me gusta leer mucho, ¿es un libro muy largo?" 
                  answer="Para nada. Fue diseñado justamente para personas ansiosas y con poca concentración. Es una guía directa al grano, sin relleno, que puedes leer en una tarde y consultar siempre que necesites una solución rápida." 
                />
                <FAQItem 
                  question="¿Puedo leerlo en mi celular?" 
                  answer="Sí. El formato es PDF compatible con todos los dispositivos (celular, tablet, computadora). Puedes llevar tu 'kit de emergencia' en el bolsillo y leerlo en el autobús, en la cama o donde quieras." 
                />
                <FAQItem 
                  question="¿Necesito internet para leerlo?" 
                  answer="Solo para descargarlo la primera vez. Una vez que guardes el archivo en tu dispositivo, es tuyo para siempre y puedes leerlo sin conexión (offline)." 
                />
                <FAQItem 
                  question="Soy una persona mayor y no me llevo bien con la tecnología, ¿podré abrirlo?" 
                  answer="Sí, es muy simple. Recibirás un correo con un botón grande. Al hacer clic, el libro se abre automáticamente. No necesitas instalar programas complicados ni contraseñas difíciles." 
                />
              </div>
            </div>

            {/* Categoría 3: Pagamento e Segurança */}
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Pagamento e Segurança</h3>
              <div className="space-y-4">
                <FAQItem 
                  question="¿Es seguro poner mi tarjeta en este sitio?" 
                  answer="Totalmente. Usamos la plataforma Hotmart, líder en productos digitales en Latinoamérica, con encriptación de grado bancario. Nosotros nunca tenemos acceso a tus datos financieros." 
                />
                <FAQItem 
                  question="¿En qué moneda voy a pagar?" 
                  answer="El sistema detecta tu país automáticamente y te muestra el precio en tu moneda local (Pesos, Soles, Dólares, etc.). Lo que ves en pantalla es lo que pagas, sin sorpresas." 
                />
                <FAQItem 
                  question="¿Aparecerá el nombre del libro en el resumen de mi tarjeta?" 
                  answer="No necesariamente. Generalmente aparece el nombre de la plataforma 'HOTMART' o 'HTM', garantizando tu privacidad y discreción." 
                />
              </div>
            </div>

            {/* Categoría 4: Garantia e Entrega */}
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Garantía e Entrega</h3>
              <div className="space-y-4">
                <FAQItem 
                  question="¿Cuánto tarda en llegar el libro después de pagar?" 
                  answer="Es inmediato. En cuanto se confirma el pago (cuestión de segundos con tarjeta), recibes un correo electrónico con tu acceso. Puedes empezar a sanar en menos de 2 minutos." 
                />
                <FAQItem 
                  question="¿Qué pasa si lo compro y siento que no es para mí?" 
                  answer="No corres ningún riesgo. Tienes 7 días de garantía incondicional. Si lees el libro y no sientes que te aporta valor, nos envías un correo y te devolvemos el 100% de tu dinero. Sin preguntas incómodas." 
                />
                <FAQItem 
                  question="¿Tengo acceso limitado o es para siempre?" 
                  answer="El acceso es vitalicio. Una vez que lo compras, el material es tuyo de por vida, incluyendo las futuras actualizaciones que hagamos a esta edición." 
                />
              </div>
            </div>
          </Accordion>
        </div>
      </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Copyright © 2025 Vontogy. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  return (
    <AccordionItem value={question} className="border border-gray-200 rounded-xl px-4 data-[state=open]:bg-gray-50 data-[state=open]:border-gray-300 transition-all">
      <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-4">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-600 leading-relaxed pb-4 text-base">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}

