import React from "react";

export default function TrustedBrands() {
  // Real brand logos
  const brands = [
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png",
      url: "https://www.apple.com"
    },
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1280px-Samsung_Logo.svg.png",
      url: "https://www.samsung.com"
    },
    {
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/1024px-Sony_logo.svg.png",
      url: "https://www.sony.com"
    },
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
      url: "https://www.nike.com"
    },
    {
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/800px-Adidas_Logo.svg.png",
      url: "https://www.adidas.com"
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png",
      url: "https://www.microsoft.com"
    },
    {
      name: "LG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_symbol.svg/640px-LG_symbol.svg.png",
      url: "https://www.lg.com"
    },
    {
      name: "Canon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Canon_logo_black.svg/800px-Canon_logo_black.svg.png",
      url: "https://www.canon.com"
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-navy-900">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gold-500 mb-3">
            Trusted by Leading Brands
          </h2>
          <div className="h-1 w-16 bg-gold-600 mx-auto mb-4"></div>
          <p className="text-base text-navy-100 max-w-2xl mx-auto">
            We partner with the world's most respected brands to bring you quality products
          </p>
        </div>

        {/* Brands grid with horizontal scrolling for mobile */}
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide pb-6 gap-4 snap-x snap-mandatory">
            {brands.map((brand, index) => (
              <a
                key={index}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 w-40 h-28 bg-navy-800 rounded-xl shadow-lg flex items-center justify-center p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 snap-start"
                aria-label={`Visit ${brand.name} website`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-12 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
                  />
                  {/* Gold accent on hover */}
                  <div className="absolute inset-0 rounded-xl border border-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-10">
          <p className="text-navy-200 mb-4">Interested in becoming a partner?</p>
          <a
            href="/partnerships"
            className="inline-flex items-center bg-gold-600 hover:bg-gold-500 text-navy-900 font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Partner With Us
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}