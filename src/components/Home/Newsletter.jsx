export default function Newsletter() {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="mb-6 text-gray-300">Get the latest updates and promotions</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none"
          />
          <button className="px-6 py-3 bg-gold-500 text-navy-900 rounded-md hover:bg-gold-600">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
