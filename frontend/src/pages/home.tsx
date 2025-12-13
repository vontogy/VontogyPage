export default function Home() {

  return (
    <div className="min-h-screen bg-gray-900 text-gray-400 font-sans flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vontogy
          </h1>
          
          <p className="text-lg text-gray-300 mb-8">
            Affiliate Marketing Website
          </p>

          {/* Info Card */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg">
            <h2 className="text-white font-bold text-xl mb-6">Contact & Information</h2>
            
            <div className="space-y-4 text-sm">
              <p className="text-gray-300">
                <strong className="text-white">Website Owner:</strong> Vontogy
              </p>
              <p className="text-gray-400">
                This is an affiliate marketing website. For product inquiries, please contact the vendor directly.
              </p>
            </div>

            {/* Products Section */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-white font-semibold mb-4">Our Products</h3>
              <div className="flex flex-col gap-4">
                <a 
                  href="/menovelle" 
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
                >
                  Menovelle™ - Natural Menopause Relief & Weight Support
                </a>
                <a 
                  href="/nervovive" 
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
                >
                  Nervovive™ - Natural Nerve Support for Tingling & Burning
                </a>
              </div>
            </div>
          </div>

          {/* Payment Platforms Section */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg mt-8">
            <h2 className="text-white font-bold text-xl mb-6">Payment & Affiliate Platforms</h2>
            
            <div className="space-y-4 text-sm">
              <p className="text-gray-300 mb-4">
                This website may use various third-party payment processing and affiliate platforms to facilitate transactions, including but not limited to:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <p className="text-white font-semibold text-xs">DigiStore24</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <p className="text-white font-semibold text-xs">BuyGoods</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <p className="text-white font-semibold text-xs">ClickBank</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                  <p className="text-white font-semibold text-xs">Hotmart</p>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 mt-6">
                <p className="text-gray-400 text-xs leading-relaxed">
                  <strong className="text-gray-300">Platform Disclaimer:</strong> This website is not owned, operated, or endorsed by DigiStore24, BuyGoods, ClickBank, Hotmart, or any other third-party payment processing platform. These platforms are independent service providers used solely for transaction processing. We are not responsible for the policies, practices, or terms of service of these third-party platforms. All transactions are subject to the terms and conditions of the respective platform and product vendor.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="text-xs max-w-2xl mx-auto leading-relaxed space-y-4 mt-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
              <p className="font-semibold text-white mb-4 text-sm">Important Disclaimers & Legal Information:</p>
              
              <div className="space-y-4">
                <p>
                  <strong className="text-gray-300">Affiliate Disclosure:</strong> This website is an affiliate marketing site. We may receive compensation when you purchase products through links on this site. This does not affect the price you pay.
                </p>
                
                <p>
                  <strong className="text-gray-300">Third-Party Platform Disclaimer:</strong> This website is not owned, operated, controlled, or endorsed by DigiStore24, BuyGoods, ClickBank, Hotmart, or any other third-party payment processing or affiliate platform. These platforms are independent service providers used solely for transaction processing and affiliate tracking. We have no control over their policies, practices, terms of service, or customer support. All transactions are subject to the terms and conditions of the respective platform and product vendor. Any issues with transactions, refunds, or customer service must be directed to the respective platform or product vendor, not to this website.
                </p>
                
                <p>
                  <strong className="text-gray-300">No Endorsement:</strong> The mention of DigiStore24, BuyGoods, ClickBank, Hotmart, or any other platform on this website does not constitute an endorsement, recommendation, or affiliation. These platforms are mentioned solely for transparency regarding payment processing methods that may be used.
                </p>
                
                <p>
                  <strong className="text-gray-300">Platform Independence:</strong> We are not responsible for the accuracy, reliability, or security of third-party payment platforms. Users are advised to review the terms of service and privacy policies of any platform before completing a transaction.
                </p>
                
                <p>
                  <strong className="text-gray-300">FDA Disclaimer:</strong> The information on this website has not been evaluated by the Food & Drug Administration or any other medical body. Products are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Information is provided for educational purposes only.
                </p>
                
                <p>
                  <strong className="text-gray-300">Medical Advice:</strong> Always consult your healthcare provider before starting any dietary supplement, especially if you are pregnant, nursing, taking medication, or have a medical condition. Do not discontinue any medical treatment without consulting your physician.
                </p>
                
                <p>
                  <strong className="text-gray-300">Individual Results:</strong> Results may vary from person to person. Products are not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                
                <p>
                  <strong className="text-gray-300">Google & Third-Party Companies:</strong> This site is not affiliated with, endorsed by, or associated with Google Inc., Google Ads, or any other third-party company mentioned. All trademarks, service marks, and trade names are the property of their respective owners.
                </p>
                
                <p>
                  <strong className="text-gray-300">Advertising Compliance:</strong> This website complies with advertising standards and regulations. All claims made on this website are based on available information and are not intended to mislead consumers. Product descriptions and claims are provided by product vendors and are subject to their own terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} <strong className="text-gray-400">Vontogy</strong>. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
