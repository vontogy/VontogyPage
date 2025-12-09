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
              <a 
                href="/femipro" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                FemiPro™ - Dietary Supplement
              </a>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="text-xs max-w-2xl mx-auto leading-relaxed opacity-60 space-y-4 mt-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
              <p className="font-semibold text-white mb-3 text-sm">Important Disclaimers & Legal Information:</p>
              
              <p className="mb-3">
                <strong className="text-gray-300">Affiliate Disclosure:</strong> This website is an affiliate marketing site. We may receive compensation when you purchase products through links on this site. This does not affect the price you pay.
              </p>
              
              <p className="mb-3">
                <strong className="text-gray-300">FDA Disclaimer:</strong> The information on this website has not been evaluated by the Food & Drug Administration or any other medical body. Products are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Information is provided for educational purposes only.
              </p>
              
              <p className="mb-3">
                <strong className="text-gray-300">Medical Advice:</strong> Always consult your healthcare provider before starting any dietary supplement, especially if you are pregnant, nursing, taking medication, or have a medical condition. Do not discontinue any medical treatment without consulting your physician.
              </p>
              
              <p className="mb-3">
                <strong className="text-gray-300">Individual Results:</strong> Results may vary from person to person. Products are not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              
              <p>
                This site is not affiliated with, endorsed by, or associated with Google Inc. or any other third-party company mentioned.
              </p>
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
