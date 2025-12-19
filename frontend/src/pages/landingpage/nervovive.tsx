import { useEffect } from "react";
import { Check, Truck, Shield, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/landingpages/nervovive/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/landingpages/nervovive/accordion";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/landingpages/nervovive/card";

// Assets
const logo = "/images/landingpages/nervovive/logo.webp";
const basicImage = "/images/landingpages/nervovive/images/basic.webp";
const bestValueImage = "/images/landingpages/nervovive/images/best_value.webp";
const mostPopularImage = "/images/landingpages/nervovive/images/most_popular.webp";
const heroSectionImage = "/images/landingpages/nervovive/images/herosection.webp";
const whySectionImage = "/images/landingpages/nervovive/images/whysection.webp";
const ingredient1 = "/images/landingpages/nervovive/images/ingredient1.webp";
const ingredient2 = "/images/landingpages/nervovive/images/ingredient2.webp";
const ingredient3 = "/images/landingpages/nervovive/images/ingredient3.webp";
const ingredient4 = "/images/landingpages/nervovive/images/ingredient4.webp";
const ingredient5 = "/images/landingpages/nervovive/images/ingredient5.webp";
const bonus1 = "/images/landingpages/nervovive/images/bonus1.webp";
const bonus2 = "/images/landingpages/nervovive/images/bonus2.webp";
const freeShippingImage = "/images/landingpages/nervovive/images/freeshp.webp";
const moneyBackImage = "/images/landingpages/nervovive/images/moneyback.webp";
const certificationsImage = "/images/landingpages/nervovive/images/certifications.webp";
const naturalImage = "/images/landingpages/nervovive/images/natural.webp";
const noStimImage = "/images/landingpages/nervovive/images/no-stim.webp";
const easyImage = "/images/landingpages/nervovive/images/easy.webp";
const gmoImage = "/images/landingpages/nervovive/images/gmo.webp";
const labelImage = "/images/landingpages/nervovive/images/label-1.webp";
const refsLogosImage = "/images/landingpages/nervovive/images/refs-logos.webp";
const creditCardsImage = "/images/landingpages/nervovive/images/credit-cards.webp";

// Reusable Pricing Section Component
function PricingSection({ title, sectionId }: { title: React.ReactNode | string, sectionId?: string }) {
  return (
    <section id={sectionId} className="py-20 bg-gradient-to-b from-white to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            {title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto items-end mb-12">
          {/* Basic Package */}
          <div className="order-3 md:order-1">
            <PricingCard 
              title="BASIC" 
              bottles="1 Bottle" 
              supply="30 Day Supply"
              price="69"
              shipping="+ 9.99 SHIPPING"
              image={basicImage}
              totalPrice={{ original: "99", final: "69" }}
              buyNowUrl="https://getnervovive24.com/text.php?aff=vontogy#order-now"
            />
          </div>

          {/* Best Value */}
          <div className="order-1 md:order-2">
            <PricingCard 
              title="Best Value" 
              bottles="6 Bottles + 2 Free Ebooks" 
              supply="180 Day Supply"
              price="49"
              shipping="FREE SHIPPING"
              isPopular={true}
              image={bestValueImage}
              totalPrice={{ original: "594", final: "294" }}
              buyNowUrl="https://getnervovive24.com/text.php?aff=vontogy#order-now"
            />
          </div>

          {/* Most Popular */}
          <div className="order-2 md:order-3">
            <PricingCard 
              title="MOST POPULAR" 
              bottles="3 Bottles + 2 Free Ebooks" 
              supply="90 Day Supply"
              price="59"
              shipping="FREE SHIPPING"
              image={mostPopularImage}
              totalPrice={{ original: "537", final: "177" }}
              buyNowUrl="https://getnervovive24.com/text.php?aff=vontogy#order-now"
              hasFreeEbooks={true}
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="flex flex-col items-center gap-1 mt-8 mb-8">
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
            Based on 10.369+ Reviews!
          </span>
        </div>
      </div>

      {/* Guarantee Badge */}
      <div className="w-full py-8 px-4 bg-transparent">
        <div className="flex justify-center max-w-5xl mx-auto">
          {/* Money Back Guarantee Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm max-w-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <img 
                src={moneyBackImage} 
                alt="Money Back Guarantee" 
                className="w-32 h-32 md:w-24 md:h-24 shrink-0 select-none" 
                loading="lazy"
                decoding="async"
              />
              <div className="flex-1 text-center">
                <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                  100% Satisfaction
                </p>
                <p className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  60-Day Money Back Guarantee
                </p>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  Your order today is covered by our iron-clad 60-Day 100% money-back guarantee. If you are not impressed with the results, then just write to us and we'll refund every single cent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Nervovive() {
  useEffect(() => {
    // Set Nervovive page metadata
    document.title = "Stop The Burning & Tingling | Nervovive™ Nerve Support";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Don't let nerve pain shrink your world. Discover the breakthrough natural ritual that soothes extremities fast. 60-Day Money Back Guarantee.");
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Stop The Burning & Tingling | Nervovive™ Nerve Support");
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Don't let nerve pain shrink your world. Discover the breakthrough natural ritual that soothes extremities fast. 60-Day Money Back Guarantee.");
    }
    
    // Set Nervovive favicon
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = "/images/landingpages/nervovive/favicon.png";
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

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
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
              Finally. Natural Relief for Tingling, Burning, and Numbness Throughout Your Entire Body.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed mx-auto md:mx-0"
            >
              Don't let nerve discomfort shrink your world. This natural 'Nerve-Fuel' targets the root cause of the burning sensation so you can walk, sleep, and live freely again.
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
                Based on 10.369+ Reviews!
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
                  href="https://getnervovive24.com/text.php?aff=vontogy#order-now"
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-xl shadow-xl shadow-yellow-500/25 transition-all hover:scale-105 flex items-center gap-1.5 md:gap-2 mx-auto md:mx-0 w-full md:w-auto cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 shrink-0" />
                  SECURE ORDER ON OFFICIAL SITE
                </a>
              </motion.div>
            </motion.div>
            
            {/* Certifications Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full flex justify-center md:justify-start pt-4"
            >
              <img 
                src={certificationsImage} 
                alt="Certifications: GMP Certified, 100% Natural Ingredients, FDA Registered Facility, Manufactured in USA, Non-GMO" 
                className="w-full max-w-xs md:max-w-sm h-auto object-contain select-none"
                width="1193"
                height="206"
                loading="lazy"
                decoding="async"
              />
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
              <span className="leading-tight">Soothes Burning & Tingling</span>
            </div>
            <div className="flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-[#00515E] p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight">Supports Deep Sleep</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-[#00515E] p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight md:leading-normal">Fast-Acting Absorption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <section id="ingredients" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            The 'Off-Switch' for Burning and Tingling.
            </h2>
            <p className="text-xl text-gray-600">
            We combined nature’s most potent pain-fighters into one easy-to-swallow capsule. This formula targets the root of nerve dysfunction, helping to silence the 'electrical storms' in your legs and feet so you can finally relax.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <IngredientCard 
              image={ingredient1} 
              name="Passion Flower"
              className="md:col-span-2"
            />
            <IngredientCard 
              image={ingredient2} 
              name="Marshmallow Root"
              className="md:col-span-2"
            />
            <IngredientCard 
              image={ingredient3} 
              name="Corydalis"
              className="md:col-span-2"
            />
            <IngredientCard 
              image={ingredient4} 
              name="Prickly Pear"
              className="md:col-span-2 md:col-start-2"
            />
            <IngredientCard 
              image={ingredient5} 
              name="California Poppy Seed"
              className="col-span-2 md:col-span-2"
            />
          </div>
        </div>
      </section>

      {/* O Mecanismo Único Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title - First on mobile only */}
            <div className="text-center md:hidden mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Nervovive™ Works Where Other Supplements Have Failed.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
              The secret isn't just the ingredients—it's the Absorption. Many natural remedies never reach your nerve endings because they are destroyed by stomach acid. Nervovive uses a proprietary "Rapid-Delivery" processing method. This ensures the potent alkaloids in our Corydalis and Passion Flower survive digestion and rush directly to the extremities—your hands and feet—where you need relief the most.
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
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Nervovive™ Works Where Other Supplements Have Failed.
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed text-left mb-6">
                  The secret isn't just the ingredients—it's the Absorption. Many natural remedies never reach your nerve endings because they are destroyed by stomach acid. Nervovive uses a proprietary "Rapid-Delivery" processing method. This ensures the potent alkaloids in our Corydalis and Passion Flower survive digestion and rush directly to the extremities—your hands and feet—where you need relief the most.
                  </p>
                </div>
              
              {/* Features Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                <div className="flex flex-col items-center gap-1">
                  <img 
                  src={naturalImage} 
                  alt="Natural Formula" 
                  className="w-16 h-16 md:w-16 md:h-16 object-contain select-none" 
                  width="405"
                  height="402"
                  loading="lazy"
                  decoding="async"
                />
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center">Natural Formula</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <img 
                  src={noStimImage} 
                  alt="No Stimulants" 
                  className="w-16 h-16 md:w-16 md:h-16 object-contain select-none" 
                  width="429"
                  height="426"
                  loading="lazy"
                  decoding="async"
                />
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center">No Stimulants</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <img 
                  src={easyImage} 
                  alt="Easy to use" 
                  className="w-16 h-16 md:w-16 md:h-16 object-contain select-none" 
                  width="405"
                  height="402"
                  loading="lazy"
                  decoding="async"
                />
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center">Easy to use</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <img 
                  src={gmoImage} 
                  alt="Non GMO" 
                  className="w-16 h-16 md:w-16 md:h-16 object-contain select-none" 
                  width="405"
                  height="402"
                  loading="lazy"
                  decoding="async"
                />
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-center">Non GMO</span>
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start">
                <Button onClick={scrollToPricing} className="h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-xl shadow-xl shadow-yellow-500/25 transition-all hover:scale-105 flex items-center gap-1.5 md:gap-2 mx-auto md:mx-0 w-full md:w-auto">
                YES! I WANT TO RESTORE MY NERVES
                </Button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Shipping Strip */}
      <div className="bg-[#00515E] py-6 text-white shadow-lg relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 max-w-6xl mx-auto">
            <div className="flex-shrink-0">
              <img 
                src={freeShippingImage} 
                alt="Fast & Free Shipping" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain select-none" 
                width="592"
                height="593"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-2xl md:text-2xl md:text-3xl mb-1">
                Free US Shipping Included With The 6-Month Supply
              </p>
              <p className="text-base md:text-xl opacity-90">
                Customer Favorite: Over 80% of our successful users choose this option to see lasting results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bonuses Section */}
      <section className="bg-gradient-to-b from-primary/10 to-primary/5">
        <div className="bg-primary/20 w-full text-center py-6">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 px-4">
            Unlock 2 Premium Gifts FREE With Your 6-Bottle Bundle
          </h2>
        </div>
        <div className="py-8">
          <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-4 justify-items-center max-w-4xl mx-auto">
            <BonusCard
              number="1"
              title="The Blood Sugar Blueprint: 1 Week To Type 2 Diabetes Relief"
              description="Discover the 'One-Week Flush' method to stabilize your glucose levels naturally. This guide reveals how to enjoy your favorite meals without the guilt or the dangerous spikes, giving you total control over your numbers in just 7 days."
              image={bonus1}
            />
            <BonusCard
              number="2"
              title="Ageless Health: Simple Tibetan Habits for Complete Body Rejuvenation"
              description="Forget coffee or stimulants. Learn the simple 2-minute morning ritual used by Tibetan monks to maintain boundless energy and laser-sharp focus well into their 80s. Wake up feeling refreshed, not groggy."
              image={bonus2}
              retailPrice={54}
            />
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-medium">
            Accelerate your recovery with our exclusive digital protocols for deep sleep, detox, and diet (A $109 Value — Yours FREE).
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection 
        sectionId="pricing"
        title={
          <>
            <span className="text-red-600">Urgent Action Required! Limited-Time Offer Available, Don't Miss Out! </span>
            <span className="text-primary">Hurry Up - Secure Your Nervovive Before Stock Runs Out!</span>
          </>
        }
      />

      {/* Certifications Strip */}
      <div className="bg-gray-100 py-6 shadow-lg relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center max-w-6xl mx-auto">
            <img 
              src={certificationsImage} 
              alt="Certifications: GMP Certified, 100% Natural Ingredients, FDA Registered Facility, Manufactured in USA, Non-GMO" 
              className="w-full max-w-2xl h-auto object-contain select-none" 
              width="1193"
              height="206"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <FAQItem 
              question="How does Nervovive work?" 
              answer="This formula mixes powerful ingredients meant to help your body absorb the necessary nutrients and manage neuropathy. What makes this product special is that it also naturally supports normal blood sugar levels while helping your organism properly absorb and regulate the amount of sugar it gets." 
            />
            <FAQItem 
              question="Are there any side effects?" 
              answer="As always, if you currently have a medical condition or you’re taking other prescription medication, we advise you to show a bottle of NervoVive to your doctor before you use it, just to put your mind at ease." 
            />
            <FAQItem 
              question="What is your money-back guarantee?" 
              answer="It is a risk-free option we are offering you because we believe in this formula so much.

It means you can try Nervovive for a full 60 days.

And if you are not completely convinced by the amazing results, then just get in touch with us and we’ll refund your money." 
            />
            <FAQItem 
              question="How many bottles should I order?" 
              answer="Most of our clients order six bottles at a time, and many double their order because they want to enjoy the benefits of this amazing nerve-soothing formula for as long as possible.

It is a smart choice because those who buy the 6-bottle pack get a massive discount, free shipping, and 2 free online guides. That's a lot of value and savings, especially since our clients usually want to reorder once they start feeling results." 
            />
            <FAQItem 
              question="How do I use Nervovive?" 
              answer="Simply take 2 capsules per day, with plenty of water." 
            />
            <FAQItem 
              question="Is this a one-off purchase?" 
              answer="Yes, your order is a one-off purchase with no hidden autoship, clauses, or charges. The price you see on the checkout page is the only price you will have to pay." 
            />
            <AccordionItem value="What are the ingredients?" className="border border-gray-200 rounded-xl px-4 data-[state=open]:bg-gray-50 data-[state=open]:border-gray-300 transition-all">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-4">
                What are the ingredients?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4 text-base">
                <p className="mb-4">
                Inside every single capsule of NervoVive is a proprietary formula of scientifically proven, extra-strong ingredients, custom-made to support the health of your nervous system and help you enjoy a normal, discomfort-free life.
                </p>
                <div className="flex justify-center mt-6">
                  <img 
                    src={labelImage} 
                    alt="Nervovive Product Label" 
                    className="w-full max-w-2xl h-auto rounded-lg shadow-md select-none" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Shipping policy" className="border border-gray-200 rounded-xl px-4 data-[state=open]:bg-gray-50 data-[state=open]:border-gray-300 transition-all">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-4">
                *Shipping policy
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4 text-base">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Delivery Address</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Shipping Fee</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Shipping Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4">United States</td>
                        <td className="py-3 px-4 font-semibold text-green-600">FREE</td>
                        <td className="py-3 px-4">5-7 working days</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4">Canada</td>
                        <td className="py-3 px-4">$15.95</td>
                        <td className="py-3 px-4">10-15 working days</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4">UK and Ireland</td>
                        <td className="py-3 px-4">$15.95</td>
                        <td className="py-3 px-4">10-15 working days</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4">Australia and New Zealand</td>
                        <td className="py-3 px-4">$15.95</td>
                        <td className="py-3 px-4">10-15 working days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Pricing Section - Duplicate */}
      <PricingSection 
        title={<span className="text-primary">Claim your Discounted Nervovive Below While Stock Lasts</span>}
      />

      {/* Scientific References Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Scientific References:</h2>
          
          <div className="flex justify-center mb-8">
            <img 
              src={refsLogosImage} 
              alt="Scientific References Logos: healthline, ScienceDirect, nature, frontiers Science News" 
              className="w-full max-w-4xl h-auto object-contain select-none" 
              loading="lazy"
              decoding="async"
            />
          </div>
          
          <div className="p-6 md:p-8">
            {/* Disclaimer */}
            <div className="text-center mb-8">
              <p className="text-yellow-500 font-semibold text-base md:text-lg">
                The company is not endorsed by, sponsored by, or affiliated with any of these organizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column - References 1-7 */}
              <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-3 font-serif">
                <p><strong>1.</strong> Rebooting the brain helps stop the ring of tinnitus in rats - National Institute on Deafness and Other Communication Disorders (NIDCD)</p>
                <p><strong>2.</strong> The link between hearing loss and Alzheimer's disease</p>
                <p><strong>3.</strong> White, P. M., Doetzlhofer, A., Lee, Y. S., Groves, A. K., and Segil, N. (2006). Mammalian cochlear supporting cells can divide and trans-differentiate into hair cells. Nature 441, 984-987.</p>
                <p><strong>4.</strong> Tinnitus Epidemiology: Prevalence, Severity, Exposures And Treatment Patterns In The United States</p>
                <p><strong>5.</strong> What Herbs are Good for Hearing Loss?</p>
                <p><strong>6.</strong> Neuroprotective potential of phytochemicals - G. Phani Kumar and Farhath Khanum</p>
                <p><strong>7.</strong> A Course in Miracles by Helen Schucman</p>
              </div>
              
              {/* Right Column - References 8-14 */}
              <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-3 font-serif">
                <p><strong>8.</strong> Identification of medicinal plants of Urmia for treatment of gastrointestinal disorders</p>
                <p><strong>9.</strong> The Benefits of California Poppy (Eschscholzia californica)</p>
                <p><strong>10.</strong> Tinnitus is the result of the brain trying, but failing, to repair itself - Georgetown University Medical Center - Jan 2011</p>
                <p><strong>11.</strong> Free radical production and ischemic brain damage: influence of postischemic oxygen tension - Agardh CD and others</p>
                <p><strong>12.</strong> B Vitamins and the Brain: Mechanisms, Dose and Efficacy-A Review - David O. Kennedy - Feb 2016</p>
                <p><strong>13.</strong> Mapping cortical hubs in tinnitus. - Winfried Schlee and others - Nov 2009</p>
                <p><strong>14.</strong> Intracranial Mapping of a Cortical Tinnitus System using Residual Inhibition - WilliamSedley and others - Apr 2015</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src={logo} 
              alt="Nervovive" 
              className="h-8 w-auto brightness-0 invert opacity-50 select-none" 
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Contact & Information</h3>
            <div className="mb-4 text-center text-sm">
              <p className="text-gray-300 mb-2">
                <strong>Website Owner:</strong> Vontogy
              </p>
              <p className="text-gray-300 mb-4">
                This is an affiliate marketing website. For product inquiries, please contact the vendor directly.
              </p>
            </div>
          </div>

          {/* Payment Platforms Section */}
          <div className="mb-6">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Payment & Affiliate Platforms</h3>
            <div className="mb-4 text-center text-sm">
              <p className="text-gray-300 mb-3">
                This website may use various third-party payment processing and affiliate platforms to facilitate transactions, including but not limited to:
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                <span className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">DigiStore24</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">BuyGoods</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">ClickBank</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300">Hotmart</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed max-w-2xl mx-auto">
                <strong className="text-gray-300">Platform Disclaimer:</strong> This website is not owned, operated, or endorsed by DigiStore24, BuyGoods, ClickBank, Hotmart, or any other third-party payment processing platform. These platforms are independent service providers used solely for transaction processing. We are not responsible for the policies, practices, or terms of service of these third-party platforms. All transactions are subject to the terms and conditions of the respective platform and product vendor.
              </p>
            </div>
          </div>
          <div className="text-xs max-w-2xl mx-auto leading-relaxed opacity-60 space-y-3">
            <p>
              For Product Support, please contact the vendor directly through their official website.
            </p>
            <p>
              For Order Support, please contact the payment processor directly.
            </p>
            <div className="disclaimer mt-6 space-y-3 bg-gray-800 p-4 rounded-lg">
              <p className="font-semibold text-white mb-3 text-base">Important Disclaimers & Legal Information:</p>
              
              <p className="mb-2">
                <strong>Affiliate Disclosure:</strong> This website is an affiliate marketing site. We may receive compensation when you purchase products through links on this site. This does not affect the price you pay.
              </p>
              
              <p className="mb-2">
                <strong>Third-Party Platform Disclaimer:</strong> This website is not owned, operated, controlled, or endorsed by DigiStore24, BuyGoods, ClickBank, Hotmart, or any other third-party payment processing or affiliate platform. These platforms are independent service providers used solely for transaction processing and affiliate tracking. We have no control over their policies, practices, terms of service, or customer support. All transactions are subject to the terms and conditions of the respective platform and product vendor. Any issues with transactions, refunds, or customer service must be directed to the respective platform or product vendor, not to this website.
              </p>
              
              <p className="mb-2">
                <strong>No Endorsement:</strong> The mention of DigiStore24, BuyGoods, ClickBank, Hotmart, or any other platform on this website does not constitute an endorsement, recommendation, or affiliation. These platforms are mentioned solely for transparency regarding payment processing methods that may be used.
              </p>
              
              <p className="mb-2">
                <strong>FDA Disclaimer:</strong> The information on this website has not been evaluated by the Food & Drug Administration (FDA) or any other medical body. This product is not intended to diagnose, treat, cure, or prevent any disease or medical condition. Information is provided for educational purposes only. The FDA has not approved this product for any medical purpose.
              </p>
              
              <p className="mb-2">
                <strong>Medical Advice:</strong> Always consult your healthcare provider, physician, or qualified medical professional before starting any dietary supplement, especially if you are pregnant, nursing, taking medication, have a medical condition, or are under medical supervision. Do not discontinue any medical treatment without consulting your physician. This product is not a replacement for professional medical care.
              </p>
              
              <p className="mb-2">
                <strong>Health Conditions & Interactions:</strong> If you have any pre-existing health conditions, including but not limited to kidney disease, liver disease, heart conditions, diabetes, autoimmune disorders, or are taking prescription medications, consult your healthcare provider before using this product. Dietary supplements may interact with medications and other supplements.
              </p>
              
              <p className="mb-2">
                <strong>Pregnancy & Nursing:</strong> Do not use this product if you are pregnant, nursing, or trying to become pregnant unless specifically directed by your healthcare provider. The safety of this product during pregnancy and breastfeeding has not been established.
              </p>
              
              <p className="mb-2">
                <strong>Individual Results:</strong> Results may vary from person to person. This product is not a substitute for professional medical advice, diagnosis, or treatment. Individual experiences and outcomes may differ based on various factors including age, health status, lifestyle, and adherence to usage instructions.
              </p>
              
              <p className="mb-2">
                <strong>Product Information:</strong> Product descriptions, claims, and information are provided by the product vendor and manufacturer. We are not responsible for the accuracy, completeness, or reliability of product information. Always read product labels, packaging, and official product documentation before use.
              </p>
              
              <p className="mb-2">
                <strong>Side Effects & Adverse Reactions:</strong> If you experience any adverse reactions, side effects, or unusual symptoms while using this product, discontinue use immediately and consult your healthcare provider. Report any adverse events to your healthcare provider and the product manufacturer.
              </p>
              
              <p className="mb-2">
                <strong>Dosage & Usage:</strong> Follow the recommended dosage instructions provided on the product label. Do not exceed the recommended dosage unless directed by your healthcare provider. More is not necessarily better and may cause adverse effects.
              </p>
              
              <p className="mb-2">
                <strong>Storage & Handling:</strong> Store this product according to the manufacturer's instructions. Keep out of reach of children. Do not use if the product appears damaged, tampered with, or past its expiration date.
              </p>
              
              <p className="mb-2">
                <strong>Advertising Compliance:</strong> This website complies with advertising standards and regulations. All claims made on this website are based on available information and are not intended to mislead consumers. Product descriptions and claims are provided by product vendors and are subject to their own terms and conditions.
              </p>
              
              <p className="mb-2">
                <strong>Google & Third-Party Companies:</strong> This site is not affiliated with, endorsed by, or associated with Google Inc., Google Ads, or any other third-party company mentioned. All trademarks, service marks, and trade names are the property of their respective owners.
              </p>
              
              <p className="mb-2">
                <strong>No Medical Claims:</strong> This product is a dietary supplement, not a drug. It is not intended to treat, cure, or prevent any disease. Any statements made on this website have not been evaluated by the FDA. This product is not a substitute for professional medical diagnosis, treatment, or advice.
              </p>
            </div>
            <p className="mt-4">
              <strong>FDA Evaluation:</strong> Statements on this website have not been evaluated by the Food and Drug Administration. Products are not intended to diagnose, treat, cure, or prevent any disease. If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using our products.
            </p>
            <p>
              <strong>Shipping Information:</strong> *For international shipping (outside of the United States), shipping fees will apply. Shipping terms and conditions are subject to the policies of the payment processor and product vendor.
            </p>
            <p>
              <strong>Customer Support:</strong> For product support, please contact the vendor directly through their official website. For order support, please contact the payment processor directly. This website is not responsible for customer service, refunds, or order fulfillment.
            </p>
          </div>
            <p className="mt-8 text-sm">
              Copyright © {new Date().getFullYear()} <strong>Vontogy</strong>. All Rights Reserved.<br />
              This website is promoted by <strong>Vontogy</strong> as an affiliate marketing site.
            </p>
        </div>
      </footer>
    </div>
  );
}

function IngredientCard({ image, name, className }: { image: string, name: string, className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className || ''}`}>
      <div className="bg-white rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-2 shadow-lg border-2 border-secondary/20 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover select-none"
          width="170"
          height="170"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
      </div>
    </div>
  );
}

function BonusCard({ number, title, description, image, retailPrice = 55 }: { number: string, title: string, description: string, image?: string, retailPrice?: number }) {
  return (
    <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden">
      {image && (
        <div className="w-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-auto object-contain select-none" 
            width="1338"
            height="1170"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-[#00515E] text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl shrink-0">
            {number}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              BONUS #{number} - {title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
            <div className="flex items-center gap-2 md:gap-3 flex-nowrap">
              <span className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">
                Retail Price - <span className="line-through text-red-600">${retailPrice}</span>
              </span>
              <span className="bg-gray-100 text-gray-700 font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-300 text-xs md:text-sm whitespace-nowrap shrink-0">
                FREE
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PricingCard({ 
  title, 
  bottles, 
  supply, 
  price, 
  shipping, 
  isPopular = false,
  image,
  youSave,
  totalPrice,
  buyNowUrl,
  hasFreeEbooks = false
}: any) {
  return (
    <div className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl ${isPopular ? 'border-2 border-yellow-500 shadow-lg z-10 order-first md:order-none' : 'border border-gray-200 shadow-md'}`}>
      {isPopular ? (
        <div className="bg-yellow-500 text-white text-center py-2 font-semibold uppercase tracking-wide text-xs">
          BEST VALUE
        </div>
      ) : (
        <div className="bg-gray-500 text-white text-center py-2 font-semibold uppercase tracking-wide text-xs">
          {title}
        </div>
      )}
      
      <div className="p-6 md:p-8 text-center">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{bottles}</p>
        <p className="text-sm text-gray-400 mb-6">({supply})</p>
        
        {/* Bottle Visual */}
        <div className="flex items-center justify-center mb-6">
          <img 
            src={image} 
            alt="bottle" 
            className={`object-contain rounded-lg select-none ${isPopular ? 'h-80 md:h-96' : 'h-64 md:h-80'}`}
            width="1020"
            height="797"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Savings Info - More Subtle */}
        {youSave && (
          <div className={`${isPopular ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'} font-medium py-2 px-4 rounded-lg mb-3 inline-flex items-center gap-2 text-sm`}>
            <span>Save ${youSave}</span>
          </div>
        )}

        {/* Guarantee Indicator and Additional Badges for Best Value */}
        {isPopular ? (
          <div className="space-y-2 mb-4">
            <div className="bg-blue-50 text-blue-700 font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 text-sm border border-blue-200">
              <Check className="w-4 h-4" />
              <span>Biggest Discount</span>
            </div>
            <div className="bg-blue-50 text-blue-700 font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 text-sm border border-blue-200">
              <Check className="w-4 h-4" />
              <span>2 Free Ebooks</span>
            </div>
            <div className="bg-blue-50 text-blue-700 font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 text-sm border border-blue-200">
              <Check className="w-4 h-4" />
              <span>60-Day Money-Back Guarantee</span>
            </div>
          </div>
        ) : hasFreeEbooks ? (
          <div className="space-y-2 mb-4">
            <div className="bg-blue-50 text-blue-700 font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 text-sm border border-blue-200">
              <Check className="w-4 h-4" />
              <span>2 Free Ebooks</span>
            </div>
            <div className="bg-blue-50 text-blue-700 font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 text-sm border border-blue-200">
              <Check className="w-4 h-4" />
              <span>60-Day Money-Back Guarantee</span>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 text-blue-700 font-medium py-2 px-4 rounded-lg mb-4 inline-flex items-center gap-2 text-sm border border-blue-200">
            <Check className="w-4 h-4" />
            <span>60-Day Money-Back Guarantee</span>
          </div>
        )}

        <div className="mb-4">
           <div className="text-5xl font-black text-gray-900">${price}<span className="text-2xl font-bold text-gray-600">/Bottle</span></div>
           <p className="text-xs text-gray-500 mt-2 text-center">Stocks are limited. Verify on official site.</p>
        </div>

        {isPopular ? (
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full mb-4"
          >
            <a 
              href={buyNowUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="w-full h-14 md:h-16 px-3 md:px-10 text-lg sm:text-lg md:text-lg lg:text-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-xl shadow-xl shadow-yellow-500/25 transition-all hover:scale-105 flex items-center justify-center"
              aria-label="Check availability - external affiliate link"
            >
              BUY ON OFFICIAL SITE
            </a>
          </motion.div>
        ) : (
          <a 
            href={buyNowUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="w-full h-14 text-lg font-bold rounded-xl mb-4 flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white shadow-lg transition-all"
            aria-label="Check availability - external affiliate link"
          >
            BUY ON OFFICIAL SITE
          </a>
        )}

        {/* Secure Payment Info */}
        <div className="flex items-center justify-center gap-2 text-xs mb-2">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-green-600 shrink-0" />
            <span className="text-gray-700 font-medium">Secure Payment</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Powered by</span>
            <img 
              src="/images/landingpages/nervovive/digistore.svg" 
              alt="DigiStore24" 
              className="h-6 max-w-[140px] select-none"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mb-2">
          External checkout link
        </p>

        {/* Total Price */}
        {totalPrice && (
          <div className="mb-4 text-base md:text-lg">
            <span className="text-gray-700 font-bold">TOTAL: </span>
            <span className="text-gray-400 line-through">${totalPrice.original}</span>
            <span className="text-gray-900 font-bold ml-2">${totalPrice.final}</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <img src={creditCardsImage} alt="We accept major credit cards" className="h-6 select-none" />
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
           {shipping === 'FREE SHIPPING' || shipping === 'FREE Shipping' ? <Truck className="w-4 h-4 text-primary" /> : null}
           <span className={shipping === 'FREE SHIPPING' || shipping === 'FREE Shipping' ? 'text-primary font-bold' : ''}>{shipping}</span>
        </div>
      </div>
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

