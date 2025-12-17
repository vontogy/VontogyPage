import { useEffect, useState } from "react";
import { Check, Shield, Star, ArrowRight, Unlink, HeartOff, CheckCircle, Crown, Heart, ShieldCheck, Award, Zap, Infinity as InfinityIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/elartedesoltar/accordion";
import { motion } from "framer-motion";
import VideoPlayerPro from "@/components/ui/elartedesoltar/video-player-pro";

// Meta Pixel type declaration
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

// ============================================
// ⚙️ CONFIGURAÇÃO DO VSL - FÁCIL DE MODIFICAR
// ============================================
// Tempo em SEGUNDOS para revelar as seções ocultas
// Exemplo: 198 = seções aparecem após 198 segundos de vídeo
const VSL_REVEAL_TIME_SECONDS = 2;
// ============================================

// Assets
const bestValueImage = "/images/elartedesoltar/images/best_value.webp";
const heroSectionImage = "/images/elartedesoltar/images/herosection.webp";
const whySectionImage = "/images/elartedesoltar/images/whysection.webp";
const hotmartImage = "/images/elartedesoltar/hotmart.webp";
const moneyBackImage = "/images/elartedesoltar/images/moneyback.webp";

// Reusable Pricing Section Component
function PricingSection({ sectionId }: { sectionId?: string }) {
  return (
    <section id={sectionId} className="py-20 bg-gradient-to-b from-white to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-none tracking-tight text-gray-900">
            ¿Cuánto vale tu paz mental? Probablemente más que una hamburguesa.
          </h2>
        </div>
        
        {/* Pricing Content - Image Left, Card Right */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Product Image - Left */}
            <div className="order-1 md:order-1 flex justify-center md:justify-end">
              <div className="relative">
                <img 
                  src={bestValueImage} 
                  alt="El Arte de Soltar" 
                  className="w-full max-w-md md:max-w-lg lg:max-w-xl drop-shadow-2xl select-none" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Pricing Card - Right */}
            <div className="order-2 md:order-2">
              <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-yellow-400 shadow-xl">
                {/* Price Text */}
                <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed text-center">
                  Todo el método costaría <span className="font-bold">$97</span> en una sesión de terapia. Hoy te lo llevas por un pago único de:
                </p>

                {/* Large Price */}
                <div className="mb-6 text-center">
                  <p className="text-sm md:text-base text-red-600 line-through mb-2 font-bold">
                    De $19,90 por
                  </p>
                  <div className="text-8xl md:text-7xl lg:text-8xl font-black text-green-600 mb-2 tracking-tighter">
                    $6,90
                  </div>
                </div>

                {/* Descriptive Text */}
                <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed text-center">
                  Sí, leíste bien. Por menos de lo que te cuesta un café en Starbucks o un combo de comida rápida, obtienes el mapa exacto para sanar tu corazón y recuperar tu vida. ¿Vas a dejar que el precio de un café te separe de tu felicidad?
                </p>

                {/* CTA Button */}
                <motion.div
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
                    href="https://pay.hotmart.com/G103409382C?checkoutMode=10"
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="w-full h-14 md:h-16 px-4 md:px-6 text-base md:text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-xl shadow-green-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
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
                      <img 
                        src={hotmartImage} 
                        alt="Hotmart" 
                        className="h-4 md:h-5 w-auto select-none"
                        loading="lazy"
                        decoding="async"
                      />
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
                <div className="flex-shrink-0">
                  <img 
                    src={moneyBackImage} 
                    alt="Money Back Guarantee" 
                    className="w-32 h-32 md:w-40 md:h-40 object-contain select-none" 
                    loading="lazy"
                    decoding="async"
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

export default function Elartedesoltar() {
  // State to control content visibility based on video time (13 seconds)
  const [showContent, setShowContent] = useState(false);
  
  // Handle video time updates
  const handleVideoTimeUpdate = (currentTime: number) => {
    if (currentTime >= VSL_REVEAL_TIME_SECONDS && !showContent) {
      setShowContent(true);
    }
  };

  useEffect(() => {
    // Set Elartedesoltar page metadata
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
    
    // Set Elartedesoltar favicon
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = "/images/elartedesoltar/icon.webp";
    }

    // Meta Pixel Code - Exact copy from Facebook to prevent failures
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
    
    // Initialize and track page view - must be called after script loads
    if (window.fbq) {
      window.fbq('init', '1826999544612219');
      window.fbq('track', 'PageView');
    }

    // Add noscript image for Meta Pixel
    const noscriptImg = document.createElement('img');
    noscriptImg.height = 1;
    noscriptImg.width = 1;
    noscriptImg.style.display = 'none';
    noscriptImg.src = 'https://www.facebook.com/tr?id=1826999544612219&ev=PageView&noscript=1';
    document.body.appendChild(noscriptImg);

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
      
      // Remove Meta Pixel noscript image
      const pixelImg = document.querySelector('img[src*="facebook.com/tr?id=1826999544612219"]');
      if (pixelImg && pixelImg.parentNode) {
        pixelImg.parentNode.removeChild(pixelImg);
      }
    };
  }, []);

  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <style>{`
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
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* VSL Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Title above video */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-5xl font-black leading-none tracking-tight text-gray-900 text-center mb-8 md:mb-12"
            >
              Mira esto si quieres olvidar a quien ya te olvidó.
            </motion.h2>
            
            <VideoPlayerPro
              src="https://res.cloudinary.com/dxwqoyzw1/video/upload/v1765973195/VSL-DESKTOP-VONTOGY_i64mxo.webm"
              srcMobile="https://res.cloudinary.com/dxwqoyzw1/video/upload/v1765973192/VSL-MOBILE-VONTOGY_akxrt1.webm"
              disableSeek={true}
              onTimeUpdate={handleVideoTimeUpdate}
            />
            
            {/* CTA Button below video - Hidden until 13 seconds */}
            {showContent && (
              <div className="mt-12 md:mt-16 flex flex-col items-center gap-6 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
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
                    className="w-full flex justify-center"
                  >
                    <a 
                      href="#pricing"
                      onClick={scrollToPricing}
                      className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-xl shadow-green-500/25 transition-all hover:scale-105 flex items-center justify-center gap-1.5 md:gap-2 mx-auto w-full md:w-auto cursor-pointer"
                    >
                      ¡SÍ! QUIERO SEGUIR ADELANTE
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 shrink-0" />
                    </a>
                  </motion.div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-6 space-y-4 w-full"
                >
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
                      <img 
                        src={hotmartImage} 
                        alt="Hotmart" 
                        className="h-4 md:h-5 w-auto select-none"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Reviews */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center gap-1 pb-8 md:pb-12"
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
                    ¡Más de 27.214 reseñas positivas!
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* All sections below are hidden until video reaches 13 seconds */}
      {showContent && (
        <>
          {/* Hero Section */}
          <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-white to-secondary/30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 rounded-l-[100px] -z-10 hidden md:block" />
        
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* Image - First on mobile, second on desktop */}
          <div className="relative flex justify-center md:justify-end order-1 md:order-2 md:mt-8">
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="relative z-10 w-full flex justify-center scale-110 md:scale-125"
            >
               <div className="absolute inset-0 bg-[#00515F]/20 blur-[60px] rounded-full transform scale-75" />
              <img 
                src={heroSectionImage} 
                alt="Nervovive" 
                className="relative w-full max-w-[900px] md:max-w-[1200px] drop-shadow-2xl mx-auto select-none"
                 width="1200"
                 height="1080"
                 fetchPriority="high"
                 decoding="async"
               />
            </motion.div>
          </div>

          {/* Content - Second on mobile, first on desktop */}
          <div className="space-y-6 md:space-y-8 z-10 text-center md:text-left order-2 md:order-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-5xl font-black leading-none tracking-tight text-gray-900"
            >
              Lo que estás sintiendo es abstinencia, no amor. Necesitas aprender a desconectarte de quien ya decidió irse.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed mx-auto md:mx-0"
            >
              Miras el celular cada 5 minutos esperando un mensaje que no llega. Sé cómo duele. La peor parte es ver que esa persona sigue viviendo feliz, mientras tú apenas puedes levantarte de la cama. ¿Vamos a cambiar eso?
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
              ¡Más de 27.214 reseñas positivas!
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
                className="w-full flex justify-center md:w-auto"
              >
                <a 
                  href="#pricing"
                  onClick={scrollToPricing}
                  className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-xl shadow-green-500/25 transition-all hover:scale-105 flex items-center justify-center md:justify-start gap-1.5 md:gap-2 mx-auto md:mx-0 w-full md:w-auto cursor-pointer"
                >
                  ¡SÍ! NECESITO SALIR DE ESTO
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 shrink-0" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <div className="bg-[#00515E] py-6 text-white shadow-lg relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:flex md:flex-row justify-center md:justify-around gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-[#00515E] p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight">Calma la Ansiedad y el Dolor</span>
            </div>
            <div className="flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-[#00515E] p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight">Ayuda a Dormir en Paz</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-[#00515E] p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight md:leading-normal">Alivio de Efecto Rápido</span>
            </div>
          </div>
        </div>
      </div>

      {/* O Mecanismo Único Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title - First on mobile only */}
            <div className="text-center md:hidden mb-6">
              <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight text-gray-900 mb-4">
              Esto no es un ebook lleno de “palabras bonitas”.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
              Es una guía contra la dependencia emocional. Cuando una relación termina, tu cerebro entra en “abstinencia”, igual que un adicto sin su droga. Por eso sientes dolor físico, ansiedad y obsesión por esa persona. La guía te ayudará ahí: te entregamos el protocolo para desintoxicar tu mente, cortar los lazos y fortalecer tu autoestima. No necesitas “tener ganas” de mejorar. Solo necesitas seguir el paso a paso, hasta que el dolor desaparezca.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image - Second on mobile, first on desktop */}
              <div className="relative order-2 md:order-1">
                <div className="flex items-center justify-center">
                  <img 
                    src={whySectionImage} 
                    alt="Nervovive Bottles" 
                    className="w-full max-w-md drop-shadow-2xl select-none" 
                    width="1888"
                    height="1359"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              
              {/* Content - Third on mobile, second on desktop */}
              <div className="space-y-6 text-center md:text-left order-3 md:order-2">
                {/* Title - Above description on desktop */}
                <div className="hidden md:block">
                  <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight text-gray-900 mb-4">
                  Esto no es un ebook lleno de “palabras bonitas”.
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed text-left mb-6">
                  Es una guía contra la dependencia emocional. Cuando una relación termina, tu cerebro entra en “abstinencia”, igual que un adicto sin su droga. Por eso sientes dolor físico, ansiedad y obsesión por esa persona. La guía te ayudará ahí: te entregamos el protocolo para desintoxicar tu mente, cortar los lazos y fortalecer tu autoestima. No necesitas “tener ganas” de mejorar. Solo necesitas seguir el paso a paso, hasta que el dolor desaparezca.
                  </p>
                </div>
              
              {/* Features Icons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#00515E]/10 p-3 rounded-full">
                    <Unlink className="w-8 h-8 md:w-10 md:h-10 text-[#00515E]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">Rompe la dependencia</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#00515E]/10 p-3 rounded-full">
                    <HeartOff className="w-8 h-8 md:w-10 md:h-10 text-[#00515E]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">Deja de mendigar amor</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#00515E]/10 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-[#00515E]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">Siéntete suficiente</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#00515E]/10 p-3 rounded-full">
                    <Crown className="w-8 h-8 md:w-10 md:h-10 text-[#00515E]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">Recupera tu dignidad</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#00515E]/10 p-3 rounded-full">
                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#00515E]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">Adiós a la ansiedad</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#00515E]/10 p-3 rounded-full">
                    <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#00515E]" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">Paz mental blindada</span>
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
                    href="#pricing"
                    onClick={scrollToPricing}
                    className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-xl shadow-green-500/25 transition-all hover:scale-105 flex items-center justify-center md:justify-start gap-1.5 md:gap-2 mx-auto md:mx-0 w-full md:w-auto cursor-pointer"
                  >
                    <span className="md:hidden">SER FELIZ SIN DEPENDER DE NADIE</span>
                    <span className="hidden md:inline">QUIERO SER FELIZ SIN DEPENDER DE NADIE</span>
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
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 leading-none tracking-tight text-[#5C3A21]">
            Tu herida está abierta. Stalkear a tu ex en redes sociales es como hurgar una herida abierta con la mano sucia. La guía sería como un vendaje que protege la herida para que cicatrice sola.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
            {/* Card 1 - Liberación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="w-full h-80 md:h-96 overflow-hidden">
                <img 
                  src="/images/elartedesoltar/images/promise1.webp" 
                  alt="Liberación" 
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="bg-[#2C2C2C] text-white p-6 flex-1">
                <h3 className="text-xl font-bold mb-4 text-center">Dolor → Alivio</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Cómo detener la ansiedad al ver una foto de él/ella con otra persona.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    La técnica exacta para dormir toda la noche sin despertar con esa presión en el pecho.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Cómo desactivar el impulso de stalkear las redes sociales de tu ex.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Elimina la sensación de culpa y deja de repasar mentalmente “¿en qué fue que me equivoqué?”.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Cómo lidiar con una recaída sin sentirte un fracaso total.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Sal de la posición de víctima y deja de sentir lástima por ti.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 2 - Reconstrucción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="w-full h-80 md:h-96 overflow-hidden">
                <img 
                  src="/images/elartedesoltar/images/promise2.webp" 
                  alt="Reconstrucción" 
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="bg-[#2C2C2C] text-white p-6 flex-1">
                <h3 className="text-xl font-bold mb-4 text-center">Menor Esfuerzo → Mayor Resultado</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    El ejercicio de 5 minutos diarios que aumenta tu autoestima más que 1 año de terapia mala.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    3 frases mágicas para decirte cuando te den ganas de mandar un mensaje.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Una herramienta simple que transforma el dolor en indiferencia en pocos días.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    No necesitas leer teorías largas: solo sigue el paso a paso.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Card 3 - Renacimiento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="w-full h-80 md:h-96 overflow-hidden">
                <img 
                  src="/images/elartedesoltar/images/promise3.webp" 
                  alt="Renacimiento" 
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="bg-[#2C2C2C] text-white p-6 flex-1">
                <h3 className="text-xl font-bold mb-4 text-center">Antes → Después</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Transforma la necesidad de validación en orgullo de tu propia compañía.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Cómo recuperar el brillo en la mirada que una relación tóxica apagó.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Sustituye el miedo a estar solo/a por la emoción de una nueva vida libre.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Conviértete en la persona que mira atrás y dice: “¿Cómo pude sufrir por eso?”.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] mt-1.5 shrink-0" />
                    <span className="text-sm leading-relaxed">
                    Recuerda quién eras antes de que todo se derrumbara.
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
                href="#pricing"
                onClick={scrollToPricing}
                className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-xl shadow-green-500/25 transition-all hover:scale-105 flex items-center justify-center gap-1.5 md:gap-2 mx-auto md:mx-0 w-full md:w-auto cursor-pointer"
              >
                <span className="md:hidden">QUIERO SEGUIR ADELANTE</span>
                <span className="hidden md:inline">QUIERO SEGUIR ADELANTE</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 shrink-0" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manual de Acción Rápida Strip */}
      <div className="bg-[#00515E] py-8 md:py-10 text-white shadow-lg relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 leading-none tracking-tight">
              No es un libro de teoría aburrida.<br />Es un Manual de Acción Rápida.
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed opacity-95">
              Olvídate de leer 300 páginas de relleno. Diseñamos este método para personas ocupadas (y con el corazón roto) que necesitan alivio inmediato. Está estructurado en "dosis" de 10 minutos para que puedas leer una página y aplicar una solución al instante. Menos lectura, más resultados.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection 
        sectionId="pricing"
      />

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black leading-none tracking-tight text-gray-900 mb-4">
              Opinión de los Lectores
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
                ¡Más de 27.214 reseñas positivas!
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
                  { name: "Fernando Antonio Rodríguez Delgado", review: "Sentía un dolor físico en el pecho que no se iba con nada. Este libro me dio el 'aire' que necesitaba para volver a respirar. Es como un botiquín de primeros auxilios para el alma." },
                  { name: "Clara Isabel Sánchez Moreno", review: "Honestamente, lo compré solo por el precio, pero el contenido vale oro. Me ayudó a levantarme de la cama el domingo y dejar de llorar. Muy recomendado." },
                  { name: "Javier Eduardo González Ruiz", review: "Era adicto a revisar su 'última conexión' en WhatsApp. El ejercicio de desintoxicación digital me abrió los ojos. Llevo 5 días de Contacto Cero y me siento libre." },
                  { name: "Mariana Esperanza López Vargas", review: "Me sentía patética rogando atención. Este libro me devolvió la dignidad. Entendí que no necesito a nadie para estar completa. Ya no espero su mensaje." },
                  { name: "Andrés Felipe Pérez Jiménez", review: "No podía sacármela de la cabeza. La técnica para frenar los pensamientos intrusivos funciona de verdad. Ahora puedo trabajar sin distraerme pensando en ella." },
                  { name: "Ricardo José Torres Mendoza", review: "Soy muy escéptico con los libros de autoayuda, pero este es diferente. No tiene frases vacías, son pasos concretos. Si eres lógico y quieres un plan de acción, es este." },
                  { name: "Sofía Alejandra Benítez Castro", review: "Me gusta que sea directo. No quería leer 300 páginas de teoría. Fui directo a los ejercicios y sentí la diferencia esa misma tarde. Práctico y real." },
                  { name: "Diego Armando Morales Rojas", review: "Pensé que era solo para mujeres, pero me equivoqué. Los hombres también sufrimos y no sabemos cómo gestionarlo. Este manual me dio claridad y fuerza." },
                  { name: "Elena Patricia Vargas Salazar", review: "Me di cuenta de que perdí años tratando de complacer a alguien que no me valoraba. Hoy me siento más guapa, más segura y lista para lo que viene. ¡Me recuperé a mí misma!" },
                  { name: "Lucas Sebastián Díaz Ochoa", review: "Mi ex me dejó por otro y mi autoestima estaba en el suelo. Este libro me enseñó a reconstruir mi valor. Ahora veo que el que perdió fue ella, no yo." },
                  { name: "Gabriela Fernanda Castillo Medina", review: "Es increíble cómo cambia tu perspectiva. Pasé de víctima a protagonista de mi vida en una semana. Mis amigos dicen que me ven brillar de nuevo." },
                  { name: "Patricia Lucía Navarro Gutiérrez", review: "Simplemente transformador. Cuesta menos que una hamburguesa y te ahorra meses de terapia." },
                  { name: "Jorge Luis Álvarez Paredes", review: "El mejor dinero que he invertido en mí. Dejé de culparme por todo." },
                  { name: "Isabela Carmen Ramírez Fuentes", review: "Lectura rápida y sanadora. Me sentí comprendida en cada página." },
                  { name: "Mateo Andrés Fernández Córdoba", review: "Si estás pasando por una ruptura, no lo pienses. Cómpralo. Te va a ahorrar mucho sufrimiento." },
                  { name: "Lucía Esperanza Pérez Montoya", review: "10/10. Me ayudó a cerrar el ciclo sin rencor y con mucha paz." },
                  { name: "Roberto Carlos Silva Aguirre", review: "Lo leí hace un mes cuando estaba destrozado. Hoy puedo decir que estoy felizmente soltero, enfocado en mis proyectos y sin miedo a la soledad. Me cambió el chip." },
                  { name: "Carmen Rosa Ortega Villalobos", review: "Lo compré llorando y lo terminé sonriendo. Me dio la fuerza para bloquearlo y empezar de cero en otra ciudad. Gracias por tanto." },
                  { name: "Alejandro David Vega Espinoza", review: "Creía que nunca iba a superar a mi ex de 5 años. Este método me hizo ver que la vida sigue y puede ser incluso mejor. Ya estoy saliendo con alguien nuevo y sano." },
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
                  question="¿Este libro sirve tanto para hombres como para mujeres?" 
                  answer="Absolutamente. El dolor de la rejección y el proceso neuroquímico del apego son universales. El método se enfoca en cómo el cerebro humano procesa la pérdida, independientemente del género." 
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

