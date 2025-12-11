import { useEffect } from "react";
import { Check, Truck, Shield, ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Assets
import logo from "@assets/logo.png";
import basicImage from "@assets/images/basic.png";
import bestValueImage from "@assets/images/best_value.png";
import mostPopularImage from "@assets/images/most_popular.png";
import heroSectionImage from "@assets/images/femipro_herosection.png";
import whySectionImage from "@assets/images/femipro_whysection.png";
import mimosa from "@assets/images/mimosa_pudica_plant.png";
import bearberry from "@assets/images/bearberry_plant.png";
import cranberry from "@assets/images/cranberry_extract.png";
import probiotic from "@assets/images/probiotic_blend.png";
import berberine from "@assets/images/granular_berberine.png";
import bonus1 from "@assets/images/bonus1.png";
import bonus2 from "@assets/images/bonus2.png";
import bonus3 from "@assets/images/bonus3.png";
import freeShippingImage from "@assets/images/freeshp.png";
import moneyBackImage from "@assets/images/moneyback.png";

export default function FemiPro() {
  useEffect(() => {
    // Set FemiPro page metadata
    document.title = "FemiPro™ - Dietary Supplement with Botanical Extracts & Probiotics";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "FemiPro™ is a dietary supplement with botanical extracts and probiotic cultures. 60-Day Money-Back Guarantee. Free Shipping Available on Select Packages.");
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "FemiPro™ - Dietary Supplement with Botanical Extracts & Probiotics");
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "FemiPro™ is a dietary supplement with botanical extracts and probiotic cultures. 60-Day Money-Back Guarantee. Free Shipping Available on Select Packages.");
    }
    
    // Set FemiPro favicon
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = "/images/femipro/favicon.png";
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
      {/* Secure Payment Banner */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 py-2.5 px-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm whitespace-nowrap overflow-x-auto">
            {/* Secure Payment Icon & Text */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Shield className="w-4 h-4 text-green-600 shrink-0" />
              <span className="text-gray-700 font-medium">Secure Payment</span>
            </div>
            
            {/* Separator */}
            <span className="text-gray-300 hidden sm:inline">•</span>
            
            {/* Powered by DigiStore24 */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-gray-600 hidden sm:inline">Powered by</span>
              <div className="flex items-center" title="DigiStore24 - Secure Payment Processing">
                <img 
                  src="/images/femipro/digistore.svg" 
                  alt="DigiStore24" 
                  className="h-8 md:h-9 max-w-[220px] md:max-w-[260px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
          <img src={logo} alt="FemiPro Logo" className="h-8 md:h-10 w-auto" />
          <Button onClick={scrollToPricing} className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105">
            Order Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-white to-secondary/30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 rounded-l-[100px] -z-10 hidden md:block" />
        
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* Image - First on mobile, second on desktop */}
          <div className="relative flex justify-center md:justify-end order-1 md:order-2">
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="relative z-10 w-full flex justify-center"
            >
               <div className="absolute inset-0 bg-accent/20 blur-[60px] rounded-full transform scale-75" />
               <img src={heroSectionImage} alt="FemiPro" className="relative w-full max-w-[650px] md:max-w-[750px] drop-shadow-2xl mx-auto" />
            </motion.div>
          </div>

          {/* Content - Second on mobile, first on desktop */}
          <div className="space-y-6 md:space-y-8 z-10 text-center md:text-left order-2 md:order-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-5xl font-black leading-tight tracking-tight text-gray-900"
            >
              Feel Confident <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Every Single Day</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed mx-auto md:mx-0"
            >
              Discover FemiPro™ — a premium dietary supplement with 5 powerful botanical extracts and probiotics. Made in the USA in an FDA-registered facility.
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
                Based on 24,182+ Reviews!
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
                <Button onClick={scrollToPricing} className="h-14 md:h-16 px-3 md:px-10 text-xs sm:text-sm md:text-lg lg:text-xl bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-white font-bold rounded-xl shadow-xl shadow-primary/25 transition-all hover:scale-105 flex items-center gap-1.5 md:gap-2 mx-auto md:mx-0 w-full md:w-auto">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 shrink-0" />
                  GET YOUR 62,31% DISCOUT NOW!
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full flex justify-center md:w-auto"
              >
                <Button className="h-12 md:h-14 px-4 md:px-8 text-sm md:text-base lg:text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2 mx-auto md:mx-0 w-full md:w-auto">
                Access The Official Website Now
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <div className="bg-accent py-6 text-white shadow-lg relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:flex md:flex-row justify-center md:justify-around gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-accent p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight">Botanical Ingredients</span>
            </div>
            <div className="flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-accent p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight">Probiotic Blend</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-accent p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight md:leading-normal">Dietary Supplement</span>
            </div>
          </div>
        </div>
      </div>

      {/* O Mecanismo Único Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="flex items-center justify-center">
                <img src={whySectionImage} alt="FemiPro Bottles" className="w-full max-w-md drop-shadow-2xl" />
              </div>
            </div>
            
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Why Choose FemiPro?
              </h2>
              
              <div className="flex flex-col items-center md:items-start">
                <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left max-w-full">
                  FemiPro is a dietary supplement that contains a proprietary blend of botanical extracts and probiotic cultures. This formula includes cranberry extract, bearberry, mimosa pudica, berberine, and a probiotic blend.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left max-w-full">
                  This dietary supplement is manufactured in an FDA-registered facility following GMP guidelines. Individual results may vary. Not intended to diagnose, treat, cure, or prevent any disease.*
                </p>
              </div>
              
              <div className="flex justify-center md:justify-start">
                <Button onClick={scrollToPricing} className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md">
                  GET YOUR 62,31% DISCOUT NOW!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section id="ingredients" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              FemiPro Ingredients:
            </h2>
            <p className="text-xl text-gray-600">
              A proprietary blend of botanical extracts and probiotic cultures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <IngredientCard 
              image={mimosa} 
              name="Mimosa Pudica" 
              description="Botanical extract"
            />
            <IngredientCard 
              image={bearberry} 
              name="Bearberry" 
              description="Botanical extract"
            />
            <IngredientCard 
              image={cranberry} 
              name="Cranberry Extract" 
              description="Fruit extract"
            />
            <IngredientCard 
              image={probiotic} 
              name="Probiotic Blend" 
              description="Probiotic cultures"
            />
            <IngredientCard 
              image={berberine} 
              name="Granular Berberine" 
              description="Plant extract"
            />
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="bg-gradient-to-b from-primary/10 to-primary/5">
        <div className="bg-primary/20 w-full text-center py-6">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 px-4">
            Order 6 Bottles and Receive 3 Bonus Ebooks
          </h2>
        </div>
        <div className="py-8">
          <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <BonusCard
              number="1"
              title="The Passion Prescription"
              description="A 7-day informational guide about nutrition and lifestyle topics. Educational content only."
              image={bonus1}
            />
            <BonusCard
              number="2"
              title="The Effortless Guide To Perfect Digestion"
              description="An informational ebook with general dietary guidance. Educational content only."
              image={bonus2}
            />
            <BonusCard
              number="3"
              title="The 21-Day Red Carpet Body Plan"
              description="A style guide with fashion and clothing tips. Educational content only."
              image={bonus3}
            />
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-medium">
              Bonus ebooks included with 6-bottle purchase
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
              <span className="text-red-600">Urgent Action Required! Limited-Time Offer Available, Don't Miss Out! </span>
              <span className="text-primary">Hurry Up - Secure Your FemiPro Before Stock Runs Out!</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end mb-12">
            {/* Basic Package */}
            <div className="order-3 md:order-1">
              <PricingCard 
                title="BASIC" 
                bottles="2 Bottles" 
                supply="60 Day Supply"
                price="79"
                shipping="Small Shipping Fee"
                image={basicImage}
                youSave="200"
                totalPrice={{ original: "358", final: "158" }}
                buyNowUrl="https://www.checkout-ds24.com/product/609911?aff=techlf"
              />
            </div>

            {/* Best Value */}
            <div className="order-1 md:order-2">
              <PricingCard 
                title="Best Value" 
                bottles="6 Bottles + 3 Free Ebooks" 
                supply="180 Day Supply"
                price="49"
                shipping="FREE SHIPPING"
                isPopular={true}
                image={bestValueImage}
                youSave="780"
                totalPrice={{ original: "1074", final: "294" }}
                buyNowUrl="https://www.checkout-ds24.com/product/567227?aff=techlf"
              />
            </div>

            {/* Most Popular */}
            <div className="order-2 md:order-3">
              <PricingCard 
                title="MOST POPULAR" 
                bottles="2 + 1 Bottles" 
                supply="90 Day Supply"
                price="69"
                shipping="FREE SHIPPING"
                image={mostPopularImage}
                youSave="330"
                totalPrice={{ original: "537", final: "207" }}
                buyNowUrl="https://www.checkout-ds24.com/product/567225?aff=techlf"
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
              <span className="text-gray-700 font-semibold text-base md:text-lg">
                4.9
              </span>
            </div>
            <span className="text-gray-600 text-sm md:text-base">
              Based on 24,182+ Reviews!
            </span>
          </div>
        </div>

        {/* Guarantee and Shipping Badges */}
        <div className="w-full py-8 px-4 bg-transparent">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Free Shipping Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <img src={freeShippingImage} alt="Fast & Free Shipping" className="w-32 h-32 md:w-24 md:h-24 shrink-0" />
                <div className="flex-1 text-center">
                  <p className="text-xl md:text-2xl font-semibold text-gray-900">
                    Free Shipping Available
                  </p>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    Free shipping on select packages
                  </p>
                </div>
              </div>
            </div>

            {/* Money Back Guarantee Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <img src={moneyBackImage} alt="Money Back Guarantee" className="w-32 h-32 md:w-24 md:h-24 shrink-0" />
                <div className="flex-1 text-center">
                  <p className="text-xl md:text-2xl font-semibold text-gray-900">
                    60-Day Money-Back Guarantee
                  </p>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    Contact customer support within 60 days for refund inquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <FAQItem 
              question="What is FemiPro?" 
              answer="FemiPro is a dietary supplement containing a blend of botanical extracts and probiotic cultures. It is manufactured in an FDA-registered facility following GMP guidelines. This product is not intended to diagnose, treat, cure, or prevent any disease." 
            />
            <FAQItem 
              question="What are the ingredients?" 
              answer="FemiPro contains cranberry extract, bearberry, mimosa pudica, berberine, and a probiotic blend. Please refer to the product label for complete ingredient information and consult your healthcare provider if you have any questions." 
            />
            <FAQItem 
              question="What is your money back guarantee?" 
              answer="We offer a 60-day money-back guarantee. If you are not satisfied with your purchase, you may contact customer support for a refund within 60 days of purchase. Please see our refund policy for complete terms and conditions." 
            />
            <FAQItem 
              question="How do I use this product?" 
              answer="Take one capsule daily with a glass of water, or as directed on the product label. Consult your healthcare provider before use if you are pregnant, nursing, taking medication, or have a medical condition." 
            />
            <FAQItem 
              question="Is this a one-off purchase?" 
              answer="Yes. There are no hidden subscriptions or auto-shipping. You only pay for what you order. This is a one-time purchase with no recurring charges." 
            />
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <img src={logo} alt="FemiPro" className="h-8 mx-auto brightness-0 invert opacity-50" />
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

function IngredientCard({ image, name, description }: { image: string, name: string, description: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="bg-white rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-2 shadow-lg border-2 border-secondary/20 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function BonusCard({ number, title, description, image }: { number: string, title: string, description: string, image?: string }) {
  return (
    <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden">
      {image && (
        <div className="w-full overflow-hidden">
          <img src={image} alt={title} className="w-full h-auto object-contain" />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl shrink-0">
            {number}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              BONUS #{number} - {title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
            <div className="flex items-center gap-2 md:gap-3 flex-nowrap">
              <span className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">
                Retail Price - <span className="line-through text-red-600">$54</span>
              </span>
              <span className="bg-gray-100 text-gray-700 font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-300 text-xs md:text-sm whitespace-nowrap shrink-0">
                Included
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
  buyNowUrl
}: any) {
  return (
    <div className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl ${isPopular ? 'border-2 border-primary shadow-lg z-10 order-first md:order-none' : 'border border-gray-200 shadow-md'}`}>
      {isPopular ? (
        <div className="bg-primary text-white text-center py-2 font-semibold uppercase tracking-wide text-xs">
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
            className={`object-contain rounded-lg ${isPopular ? 'h-80 md:h-96' : 'h-64 md:h-80'}`}
          />
        </div>

        {/* Savings Info - More Subtle */}
        {youSave && (
          <div className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg mb-3 inline-flex items-center gap-2 text-sm">
            <span>Save ${youSave}</span>
          </div>
        )}

        {/* Guarantee Indicator - Single, Subtle */}
        <div className="bg-blue-50 text-blue-700 font-medium py-2 px-4 rounded-lg mb-4 inline-flex items-center gap-2 text-sm border border-blue-200">
          <Check className="w-4 h-4" />
          <span>60-Day Money-Back Guarantee</span>
        </div>

        <div className="mb-4">
           <div className="text-5xl font-black text-gray-900">${price}<span className="text-2xl font-bold text-gray-600">/Bottle</span></div>
        </div>

        <a 
          href={buyNowUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className={`w-full h-14 text-lg font-bold rounded-xl mb-4 flex items-center justify-center ${isPopular ? 'bg-primary hover:bg-primary/90' : 'bg-gray-900 hover:bg-gray-800'} text-white shadow-lg transition-all`}
          aria-label="Buy now - external affiliate link"
        >
          BUY NOW
        </a>

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
              src="/images/femipro/digistore.svg" 
              alt="DigiStore24" 
              className="h-6 max-w-[140px]"
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
          <span className="text-xs text-gray-500">We accept major credit cards</span>
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

