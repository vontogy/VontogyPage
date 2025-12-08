import { useState } from "react";
import { Check, Star, Truck, Leaf, Beaker, Award, ChevronDown, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Assets
import logo from "@assets/logo.png";
import productBottle from "@assets/images/femipro_supplement_bottle.png";
import basicImage from "@assets/images/basic.png";
import bestValueImage from "@assets/images/best_value.png";
import mostPopularImage from "@assets/images/most_popular.png";
import heroSectionImage from "@assets/images/femipro_herosection.png";
import whySectionImage from "@assets/images/femipro_whysection.png";
import certificationsImage from "@assets/images/certifications.png";
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
import referencesImage from "@assets/images/references.png";

export default function Home() {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
          <img src={logo} alt="FemiPro Logo" className="h-8 md:h-10 w-auto" />
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#ingredients" className="hover:text-primary transition-colors">Ingredients</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
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
               <img src={heroSectionImage} alt="FemiPro" className="relative w-full max-w-[400px] drop-shadow-2xl mx-auto" />
            </motion.div>
          </div>

          {/* Content - Second on mobile, first on desktop */}
          <div className="space-y-6 md:space-y-8 z-10 text-center md:text-left order-2 md:order-1">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-gray-900"
            >
              The Natural <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Bladder-Rebalancing</span> <br/>
              Breakthrough
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed mx-auto md:mx-0"
            >
              Stop leaks, regain confidence, and sleep through the night with the first microbiome-targeted formula.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start"
            >
              <Button onClick={scrollToPricing} className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-white font-bold rounded-xl shadow-xl shadow-primary/25 transition-all hover:scale-105">
                ORDER NOW & SAVE UP TO $780
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center md:justify-start pt-4"
            >
              <img src={certificationsImage} alt="Certifications" className="w-full max-w-md h-auto" />
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
              <span className="leading-tight">Total Bladder Control Support</span>
            </div>
            <div className="flex flex-col items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-accent p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight">Urinary Microbiome Balance</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col md:flex-row md:items-center md:gap-3 items-center gap-2 font-bold text-sm md:text-lg md:text-xl">
              <div className="bg-white text-accent p-1 rounded-full"><Check strokeWidth={4} className="w-4 h-4 md:w-4 md:h-4" /></div>
              <span className="leading-tight md:leading-normal">Healthy Urinary System Restoration</span>
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
                Why FemiPro Works Where Others Fail:
              </h2>
              
              <div className="flex flex-col items-center md:items-start">
                <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left max-w-full">
                  FemiPro leverages unique, clinically researched ingredients designed to restore the delicate bacterial balance in your urinary microbiome. Unlike generic solutions, FemiPro targets the root cause of sudden leaks: harmful bacteria that overstimulate bladder muscles.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left max-w-full">
                  By repopulating your system with beneficial bacteria, our formula calms the bladder, reduces involuntary leaks, and fortifies your entire urinary tract health.
                </p>
              </div>
              
              <div className="flex justify-center md:justify-start">
                <Button onClick={scrollToPricing} className="h-12 px-8 text-base bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg">
                  SECURE YOUR SUPPLY TODAY
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
              Inside Every Capsule of FemiPro:
            </h2>
            <p className="text-xl text-gray-600">
              A proprietary blend of powerful botanicals and probiotics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <IngredientCard 
              image={mimosa} 
              name="Mimosa Pudica" 
              description="Supports anti-inflammatory response"
            />
            <IngredientCard 
              image={bearberry} 
              name="Bearberry" 
              description="Natural antiseptic for urinary tract"
            />
            <IngredientCard 
              image={cranberry} 
              name="Cranberry Extract" 
              description="Prevents bacteria adherence"
            />
            <IngredientCard 
              image={probiotic} 
              name="Probiotic Blend" 
              description="Restores healthy flora"
            />
            <IngredientCard 
              image={berberine} 
              name="Granular Berberine" 
              description="Balances blood sugar & microbiome"
            />
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="bg-[#BF4080]">
        <div className="bg-purple-600 w-full text-center py-4">
          <h2 className="text-3xl md:text-5xl font-black text-white px-4">
            Order 6 Bottles and Get 3 FREE Exclusive Bonuses!
          </h2>
        </div>
        <div className="py-8">
          <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <BonusCard
              number="1"
              title="The Passion Prescription"
              description="Reawaken intimacy with this 7-day guide. Discover secrets to removing inflammatory foods and healing your gut for a slimmer body and a happier marriage."
              image={bonus1}
            />
            <BonusCard
              number="2"
              title="The Effortless Guide To Perfect Digestion"
              description="Reset your gut health instantly. This eye-opening ebook reveals the step-by-step plan to reignite passion and optimize digestion, making you feel lighter and more energetic."
              image={bonus2}
            />
            <BonusCard
              number="3"
              title="The 21-Day Red Carpet Body Plan"
              description="Look slimmer using stylist secrets. Learn the essential clothing tricks and the ONE spice you must avoid to lose weight and keep it off."
              image={bonus3}
            />
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-white font-bold">
              Total Value: $162 - Yours FREE
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-white to-secondary/20">
        <div className="container mx-auto px-4">
          {/* Top Banner */}
          <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <img src={freeShippingImage} alt="Fast & Free Shipping" className="w-44 h-44 md:w-32 md:h-32 shrink-0" />
              <div className="flex-1 text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  Every Order Comes With <span className="text-primary">FREE Shipping!</span>
                </p>
                <p className="text-gray-600 mt-2 text-base md:text-lg">
                  96% Of Savvy Customers Choose The 6-Bottle Option
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900">
              Claim Your Discounted FemiPro Below While Stocks Last!
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
                perBottle="79"
                originalPrice="129"
                shipping="Small Shipping Fee"
                image={basicImage}
                imgCount={2}
                youSave="200"
                totalPrice={{ original: "358", final: "158" }}
                buyNowUrl="https://www.checkout-ds24.com/product/609911?_ga=1048192037.1765190178&_b=NDkwMzM1O215ZmVtaXBybzI0LmNvbS90ZXh0LnBocDt1bmRlZmluZWQ7dGV4dDs1OzE1ODtmZTt1bmRlZmluZWQ%3D&aff=techlf"
              />
            </div>

            {/* Best Value */}
            <div className="order-1 md:order-2">
              <PricingCard 
                title="BEST VALUE!" 
                bottles="6 Bottles + 3 Free Ebooks" 
                supply="180 Day Supply"
                price="49"
                perBottle="49"
                originalPrice="780"
                shipping="FREE SHIPPING"
                isPopular={true}
                image={bestValueImage}
                imgCount={6}
                youSave="780"
                biggestDiscount={true}
                totalPrice={{ original: "1074", final: "294" }}
                buyNowUrl="https://www.checkout-ds24.com/product/567227?_ga=1048192037.1765190178&_b=NDkwMzM1O215ZmVtaXBybzI0LmNvbS90ZXh0LnBocDt1bmRlZmluZWQ7dGV4dDszOzI5NDtmZTt1bmRlZmluZWQ%3D&aff=techlf"
              />
            </div>

            {/* Most Popular */}
            <div className="order-2 md:order-3">
              <PricingCard 
                title="MOST POPULAR" 
                bottles="2 + 1 Bottles" 
                supply="90 Day Supply"
                price="69"
                perBottle="59"
                originalPrice="537"
                shipping="FREE SHIPPING"
                image={mostPopularImage}
                imgCount={3}
                youSave="330"
                totalPrice={{ original: "537", final: "207" }}
                buyNowUrl="https://www.checkout-ds24.com/product/567225?_ga=1048192037.1765190178&_b=NDkwMzM1O215ZmVtaXBybzI0LmNvbS90ZXh0LnBocDt1bmRlZmluZWQ7dGV4dDsyOzIwNztmZTt1bmRlZmluZWQ%3D&aff=techlf"
              />
            </div>
          </div>
        </div>

        {/* Guarantee Badge */}
        <div className="w-full py-8 px-4" style={{ backgroundColor: '#BF4080' }}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <img src={moneyBackImage} alt="Money Back Guarantee" className="w-44 h-44 md:w-32 md:h-32 shrink-0" />
              <div className="flex-1 text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  60-DAY MONEY BACK <span className="text-primary">GUARANTEE</span>
                </p>
                <p className="text-gray-600 mt-2 text-base md:text-lg">
                  100% Satisfaction or your money back.
                </p>
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
              question="How does FemiPro work?" 
              answer="FemiPro targets the root cause of urinary incontinence: an imbalanced microbiome. By introducing specific probiotics and herbs, it strengthens the bladder muscles and urinary tract walls naturally." 
            />
            <FAQItem 
              question="Are there any side effects?" 
              answer="FemiPro is made in an FDA-registered facility using natural ingredients. It is designed to be safe for women of all ages and medical conditions. However, we always recommend consulting your doctor if you have specific concerns." 
            />
            <FAQItem 
              question="What is your money back guarantee?" 
              answer="You are protected by our iron-clad 60-day money-back guarantee. If you don't see results, simply contact us for a full refund. No questions asked." 
            />
            <FAQItem 
              question="How do I use FemiPro?" 
              answer="Simply take one easy-to-swallow capsule every day with a glass of water. It starts working immediately to rebalance your system." 
            />
            <FAQItem 
              question="Is this a one-off purchase?" 
              answer="Yes. There are no hidden subscriptions or auto-shipping. You only pay for what you order today." 
            />
          </Accordion>
        </div>
      </section>

      {/* Scientific References Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Logos Banner */}
          <div className="bg-white py-10 px-8 rounded-lg mb-12">
            <div className="flex items-center justify-center">
              <img src={referencesImage} alt="Scientific References" className="w-full max-w-4xl h-auto" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Scientific References
          </h2>

          {/* References List */}
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed">
            <div className="space-y-6">
              <ReferenceItem number={1} text="Carnes MU, Siddiqui NY, Karstens L, Gantz MG, Dinwiddie DL, Sung VW, Bradley M, Brubaker L, Ferrando CA, Mazloomdoost D, Richter HE. Urinary microbiome community types associated with urinary incontinence severity in women. American Journal of Obstetrics and Gynecology. 2024 Mar 1;230(3):344-e1. doi:10.1016/j.ajog.2023.10.036." />
              <ReferenceItem number={2} text='Diaz A. "Call a F–king lawyer": TikTokers issue dire warning over common tampon ingredient [Internet]. New York Post; 2022 [cited 2024 Apr 9].' />
              <ReferenceItem number={3} text="Govender Y, Gabriel I, Minassian V, Fichorova R. The Current Evidence on the Association Between the Urinary Microbiome and Urinary Incontinence in Women. Frontiers in Cellular and Infection Microbiology. 2019 May 1;9:133. doi:10.3389/fcimb.2019.00133." />
              <ReferenceItem number={4} text="Heid M. The Truth About Your Tampons [Internet]. Time; 2016 [cited 2024 Apr 9]." />
              <ReferenceItem number={5} text="Komesu YM, Richter HE, Carper B, Dinwiddie DL, Lukacz ES, Siddiqui NY, Sung VW, Zyczynski HM, Ridgeway B, Rogers RG, Arya LA, Mazloomdoost D, Gantz MG; Pelvic Floor Disorders Network. The urinary microbiome in women with mixed urinary incontinence compared to similarly aged controls. International Urogynecology Journal. 2018 Dec;29(12):1785-1795. doi:10.1007/s00192-018-3683-6." />
              <ReferenceItem number={6} text="Mandal AK, Pandey A, Sah RK, Baral A, Sah P. In Vitro Antioxidant and Antimicrobial Potency of Mimosa pudica of Nepalese Terai Region: Insight into L-Mimosine as an Antibacterial Agent. Evidence-Based Complementary and Alternative Medicine. 2022 Oct 7;2022:6790314. doi:10.1155/2022/6790314." />
              <ReferenceItem number={7} text="Mei Z, Li D. The role of probiotics in vaginal health. Frontiers in Cellular and Infection Microbiology. 2022 Jul 28;12:963868. doi:10.3389/fcimb.2022.963868." />
              <ReferenceItem number={8} text="Meštrović Popovič K, Povalej Bržan P, Langerholc T, Marčun Varda N. The Impact of Lactobacillus Plantarum PCS26 Supplementation on the Treatment and Recurrence of Urinary Tract Infections in Children-A Pilot Study. Journal of Clinical Medicine. 2022 Nov 27;11(23):7008. doi:10.3390/jcm11237008." />
              <ReferenceItem number={9} text="Molina MA, Melchers WJ, Núñez-Samudio V, Landires I. The emerging role of Lactobacillus acidophilus in the cervicovaginal microenvironment. The Lancet Microbe. 2024 Jan 1;5(1):e6-7. doi:10.1016/S2666-5247(23)00315-4." />
              <ReferenceItem number={10} text="Paniágua AL, Correia AF, Pereira LC, de Alencar BM, Silva FBA, Almeida RM, de Medeiros Nóbrega YK. Inhibitory effects of Lactobacillus casei Shirota against both Candida auris and Candida spp. isolates that cause vulvovaginal candidiasis and are resistant to antifungals. BMC Complementary Medicine and Therapies. 2021 Sep 23;21(1):237. doi:10.1186/s12906-021-03405-z." />
              <ReferenceItem number={11} text="Tóth B, Jávorházy A, Nyirády P, Csupor-Löffler B, Birinyi P, Zhanel G, Naber K, Länger R, Vörhendi N, Gede N, Váncsa S, Hegyi P, Csupor D. Bearberry in the treatment of acute uncomplicated cystitis (BRUMI): protocol of a multicentre, randomised double-blind clinical trial. BMJ Open. 2022 Jun 24;12(6):e057982. doi:10.1136/bmjopen-2021-057982." />
              <ReferenceItem number={12} text="Pino A, Rapisarda AM, Vitale SG, Cianci S, Caggia C, Randazzo CL, Cianci A. A clinical pilot study on the effect of the probiotic Lacticaseibacillus rhamnosus TOM 22.8 strain in women with vaginal dysbiosis. Scientific Reports. 2021 Jan 28;11(1):2592. doi:10.1038/s41598-021-81931-z." />
            </div>
            <div className="space-y-6">
              <ReferenceItem number={13} text="Price TK, Lin H, Gao X, Thomas-White KJ, Hilt EE, Mueller ER, Wolfe AJ, Dong Q, Brubaker L. Bladder bacterial diversity differs in continent and incontinent women: a cross-sectional study. American Journal of Obstetrics and Gynecology. 2020 Nov;223(5):729.e1-729.e10. doi:10.1016/j.ajog.2020.04.033." />
              <ReferenceItem number={14} text="Redondo-Lopez V, Cook RL, Sobel JD. Emerging role of lactobacilli in the control and maintenance of the vaginal bacterial microflora. Reviews of infectious diseases. 1990 Sep-Oct;12(5):856-872. doi:10.1093/clinids/12.5.856." />
              <ReferenceItem number={15} text="Ren LM, Zhuo YJ, Hao ZS, He HM, Lu HG, Zhao D. Berberine improves neurogenic contractile response of bladder detrusor muscle in streptozotocin-induced diabetic rats. Journal of Ethnopharmacology. 2013 Dec 12;150(3):1128-1136. doi:10.1016/j.jep.2013.10.039." />
              <ReferenceItem number={16} text="Reuters. FDA warns J&J unit about tampon complaints [Internet]. Reuters; 2012 [cited 2024 Apr 9]." />
              <ReferenceItem number={17} text="Sousa LGV, Pereira SA, Cerca N. Fighting polymicrobial biofilms in bacterial vaginosis. Microbial Biotechnology. 2023 Jul;16(7):1423-1437. doi:10.1111/1751-7915.14261." />
              <ReferenceItem number={18} text="Sobota AE. Inhibition of bacterial adherence by cranberry juice: potential use for the treatment of urinary tract infections. The Journal of Urology. 1984 May 1;131(5):1013-1016. doi:10.1016/S0022-5347(17)50751-X." />
              <ReferenceItem number={19} text="Thomas-White K, Vo C. How Lactobacillus Gasseri Can Support Your Vaginal Health [Internet]. Evvy. 2024 [cited 2024 Apr 9]." />
              <ReferenceItem number={20} text="Petriello MC, Hoffman JB, Vsevolozhskaya O, Morris AJ, Hennig B. Dioxin-like PCB 126 increases intestinal inflammation and disrupts gut microbiota and metabolic homeostasis. Environmental Pollution. 2018 Nov;242(Pt A):1022-1032. doi:10.1016/j.envpol.2018.07.039." />
              <ReferenceItem number={21} text="Tsiaoussis J, Antoniou MN, Koliarakis I, Mesnage R, Vardavas CI, Izotov BN, Psaroulaki A, Tsatsakis A. Effects of single and combined toxic exposures on the gut microbiome: Current knowledge and future directions. Toxicology letters. 2019 Sep 15;312:72-97. doi:10.1016/j.toxlet.2019.04.014." />
              <ReferenceItem number={22} text="Wolfe AJ, Brubaker L. Urobiome updates: advances in urinary microbiome research. Nature Reviews Urology. 2019 Feb;16(2):73-74. doi:10.1038/s41585-018-0127-5." />
              <ReferenceItem number={23} text="World Health Organization. Dioxins [Internet]. World Health Organization; 2023 [cited 2024 Apr 9]." />
              <ReferenceItem number={24} text="Wu P, Chen Y, Zhao J, Zhang G, Chen J, Wang J, Zhang H. Urinary microbiome and psychological factors in women with overactive bladder. Frontiers in cellular and infection microbiology. 2017 Nov 27;7:488. doi:10.3389/fcimb.2017.00488." />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <img src={logo} alt="FemiPro" className="h-8 mx-auto brightness-0 invert opacity-50" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-sm">
            <a href="https://myfemipro24.com//help/contact-us.php" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
            <a href="https://myfemipro24.com//help/references.php" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">References</a>
            <a href="https://myfemipro24.com//help/terms.php" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms Of Use</a>
            <a href="https://myfemipro24.com//help/disclaimer.php" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Disclaimer</a>
            <a href="https://myfemipro24.com//help/privacy.php" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="https://myfemipro24.com//help/shipping.php" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Shipping Policy</a>
            <a href="https://myfemipro24.com//help/refunds.php" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
          <div className="text-xs max-w-2xl mx-auto leading-relaxed opacity-60 space-y-3">
            <p>
              For Product Support, please contact the vendor <a href="https://myfemipro24.com//help/contact-us.php" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">here</a>.
            </p>
            <p>
              For Order Support, please contact DigiStore24 <a href="https://www.digistore24.com/info/contact/2?lang=en&aff=techlf" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">here</a>.
            </p>
            <p className="mt-4">
              Statements on this website have not been evaluated by the Food and Drug Administration. Products are not intended to diagnose, treat, cure or prevent any disease. If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using our products.
            </p>
            <p>
              *For international shipping (outside of the United States), shipping fees will apply. Read more <a href="https://myfemipro24.com//help/shipping.php" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">here</a>.
            </p>
          </div>
          <p className="mt-8 text-sm">
          Promoted by <strong>Vontogy</strong>.<br></br>Copyright © {new Date().getFullYear()} <strong>FemiPro</strong> | All Rights Reserved.
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
        <img src={image} alt={name} className="w-full h-full object-cover drop-shadow-md" />
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
              <span className="bg-white text-gray-900 font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 text-xs md:text-sm whitespace-nowrap shrink-0">
                Today: FREE
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
  perBottle, 
  originalPrice, 
  shipping, 
  isPopular = false,
  image,
  imgCount,
  badge,
  youSave,
  totalPrice,
  biggestDiscount = false,
  buyNowUrl
}: any) {
  return (
    <div className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isPopular ? 'border-2 border-primary shadow-2xl z-10 scale-105 order-first md:order-none' : 'border border-gray-200 shadow-lg'}`}>
      {isPopular && (
        <div className="bg-primary text-white text-center py-2 font-bold uppercase tracking-wider text-sm">
          Best Value
        </div>
      )}
      
      <div className="p-6 md:p-8 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-lg md:text-xl text-gray-500 font-medium mb-2">{bottles}</p>
        <p className="text-sm text-gray-400 mb-6">({supply})</p>
        
        {/* Bottle Visual */}
        <div className="flex items-center justify-center mb-6">
          <img 
            src={image} 
            alt="bottle" 
            className={`object-contain rounded-lg ${isPopular ? 'h-80 md:h-96' : 'h-64 md:h-80'}`}
          />
        </div>

        {/* You Save Indicator */}
        {youSave && (
          <div className="bg-gray-600 text-white font-bold py-2.5 px-4 rounded-lg mb-3 inline-flex items-center gap-2 text-sm md:text-base">
            <Check className="w-5 h-5" />
            <span>YOU SAVE ${youSave}!</span>
          </div>
        )}

        {/* Biggest Discount Indicator */}
        {biggestDiscount && (
          <div className="bg-green-500 text-white font-bold py-2.5 px-4 rounded-lg mb-3 inline-flex items-center gap-2 text-sm md:text-base">
            <Check className="w-5 h-5" />
            <span>BIGGEST DISCOUNT</span>
          </div>
        )}

        {/* 60 Days Guarantee Indicator */}
        <div className="bg-green-500 text-white font-bold py-2.5 px-4 rounded-lg mb-4 inline-flex items-center gap-2 text-sm md:text-base">
          <Check className="w-5 h-5" />
          <span>60 DAYS GUARANTEE</span>
        </div>

        <div className="mb-4">
           <div className="text-5xl font-black text-gray-900">${price}<span className="text-2xl font-bold text-gray-600">/Bottle</span></div>
        </div>

        <Button 
          onClick={() => buyNowUrl && (window.location.href = buyNowUrl)}
          className={`w-full h-14 text-lg font-bold rounded-xl mb-4 ${isPopular ? 'bg-primary hover:bg-primary/90' : 'bg-gray-900 hover:bg-gray-800'} text-white shadow-lg`}
        >
          BUY NOW
        </Button>

        {/* Total Price */}
        {totalPrice && (
          <div className="mb-4 text-base md:text-lg">
            <span className="text-gray-700 font-bold">TOTAL: </span>
            <span className="text-gray-400 line-through">${totalPrice.original}</span>
            <span className="text-gray-900 font-bold ml-2">${totalPrice.final}</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <img src="https://myfemipro24.com//statics/img/credit-cards.png" alt="Cards" className="h-4 opacity-60" onError={(e) => e.currentTarget.style.display='none'} />
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

function ReferenceItem({ number, text }: { number: number, text: string }) {
  return (
    <div className="flex gap-3">
      <span className="font-bold text-gray-900 shrink-0">{number}.</span>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
