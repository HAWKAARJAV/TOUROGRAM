import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Destination {
  name: string;
  country: string;
  description: string;
  image: string;
  storiesCount: number;
}

const PopularDestinations = () => {
  const navigate = useNavigate();

  const destinations: Destination[] = [
    {
      name: 'Delhi',
      country: 'India',
      description: 'Hidden gems, old food lanes & secret monuments',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 35
    },
    {
      name: 'Mumbai',
      country: 'India',
      description: 'Gateway of India, Marine Drive & street food',
      image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 28
    },
    {
      name: 'Jaipur',
      country: 'India',
      description: 'Pink City – Hawa Mahal & royal heritage',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 22
    },
    {
      name: 'Varanasi',
      country: 'India',
      description: 'Ghats, morning aarti & ancient spirituality',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 19
    },
    {
      name: 'Kerala',
      country: 'India',
      description: 'Backwaters, spice plantations & Kathakali',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 24
    },
    {
      name: 'Kolkata',
      country: 'India',
      description: 'City of Joy – colonial charm & Bengali culture',
      image: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 17
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            FEATURED DESTINATIONS
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Explore India's Hidden Gems
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic stories from travelers and locals across India's most captivating cities
          </p>
        </motion.div>

        {/* Modern Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/explore?city=${destination.name}`)}
            >
              {/* Modern Card Design */}
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Story Count Badge */}
                <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-bold text-gray-900">{destination.storiesCount}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-white/80">{destination.country}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-2">
                    {destination.name}
                  </h3>

                  <p className="text-white/90 text-sm mb-4">
                    {destination.description}
                  </p>

                  <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                    View Stories
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-3xl transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Explore All Destinations
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularDestinations;
