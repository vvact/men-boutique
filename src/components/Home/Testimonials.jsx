import React, { useRef, useState, useEffect } from "react";

export default function Testimonials() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80",
      content: "The quality of the clothes I purchased exceeded my expectations. The fit was perfect and the fabric feels amazing. I'll definitely be shopping here again!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Professional",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80",
      content: "Fast shipping and excellent customer service. The product was exactly as described on the website. Highly recommend this store!",
      rating: 4
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Lifestyle Blogger",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80",
      content: "I absolutely love the unique styles available here. I always get compliments when I wear pieces from this store. Their collections are always on trend.",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      role: "Fitness Instructor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80",
      content: "The activewear I bought is both stylish and functional. It breathes well during workouts and looks great afterwards too.",
      rating: 5
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "Graphic Designer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80",
      content: "I appreciate the sustainable practices of this brand. Not only are the clothes beautiful, but I feel good about supporting an ethical company.",
      rating: 4
    },
    {
      id: 6,
      name: "Alex Turner",
      role: "Music Producer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80",
      content: "The customer service team went above and beyond to help me with a sizing issue. They made the return process incredibly easy!",
      rating: 5
    }
  ];

  // Update arrow visibility based on scroll position
  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 sm:h-5 sm:w-5 ${i < rating ? 'text-gold-500 fill-current' : 'text-navy-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
      setTimeout(updateArrowVisibility, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
      setTimeout(updateArrowVisibility, 300);
    }
  };

  // Scroll to specific testimonial
  const scrollToTestimonial = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / testimonials.length;
      container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      setCurrentIndex(index);
      setTimeout(updateArrowVisibility, 300);
    }
  };

  // Initialize and update arrow visibility
  useEffect(() => {
    updateArrowVisibility();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateArrowVisibility);
      return () => container.removeEventListener('scroll', updateArrowVisibility);
    }
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-navy-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gold-500 mb-3">What Our Customers Say</h2>
          <div className="h-1 w-16 bg-gold-600 mx-auto mb-4"></div>
          <p className="text-base text-navy-100 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Navigation arrows for all screens */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={scrollLeft}
            className={`p-3 rounded-full bg-navy-800 shadow-md text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={scrollRight}
            className={`p-3 rounded-full bg-navy-800 shadow-md text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonials container with horizontal scroll */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="flex-shrink-0 w-4/5 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 snap-start bg-navy-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
              >
                {/* Rating */}
                <div className="p-6 pb-4 flex justify-center">
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                {/* Testimonial content */}
                <div className="px-6 flex-grow">
                  <p className="text-navy-100 italic text-center">"{testimonial.content}"</p>
                </div>
                
                {/* Customer info */}
                <div className="p-6 pt-4 flex items-center justify-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-gold-500"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-navy-300">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade effects */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-navy-900 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-navy-900 to-transparent"></div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToTestimonial(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-gold-500 scale-125' : 'bg-navy-600 hover:bg-navy-500'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-10">
          <p className="text-navy-300 mb-4">Ready to share your experience?</p>
          <button className="inline-flex items-center bg-gold-600 hover:bg-gold-500 text-navy-900 font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5">
            Write a Review
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom CSS to hide scrollbar */}
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