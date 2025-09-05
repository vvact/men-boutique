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
    <section className="py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header - Mobile first */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 sm:text-3xl sm:mb-3">
            Trusted by Leading Brands
          </h2>
          <p className="text-base text-gray-600 max-w-md mx-auto sm:text-lg sm:max-w-xl lg:max-w-3xl">
            We partner with the world's most respected brands to bring you quality products
          </p>
        </div>

        {/* Brands grid - Mobile first */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-8 lg:gap-6 items-center justify-items-center">
          {brands.map((brand, index) => (
            <a
              key={index}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full h-16 sm:h-20 md:h-24 bg-white rounded-lg sm:rounded-xl shadow-sm flex items-center justify-center p-2 sm:p-3 md:p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1"
              aria-label={`Visit ${brand.name} website`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-8 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0 sm:max-h-10 md:max-h-12"
              />
            </a>
          ))}
        </div>

        {/* Call to action - Mobile first */}
        <div className="text-center mt-6 sm:mt-8 lg:mt-12">
          <p className="text-sm text-gray-600 mb-3 sm:text-base sm:mb-4">Interested in becoming a partner?</p>
          <a
            href="/partnerships"
            className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 sm:text-base"
          >
            Partner With Us
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 sm:h-5 sm:w-5 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}