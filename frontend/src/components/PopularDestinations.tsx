import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
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
      description: 'Explore hidden gems – Old Delhi food lanes, secret monuments & artisan workshops',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 35
    },
    {
      name: 'Mumbai',
      country: 'India',
      description: 'Vibrant Culture – Gateway of India, Marine Drive & Street Food trails',
      image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 28
    },
    {
      name: 'Jaipur',
      country: 'India',
      description: 'Pink City treasures – Hawa Mahal, Amber Fort & royal heritage walks',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 22
    },
    {
      name: 'Varanasi',
      country: 'India',
      description: 'Spiritual heart of India – Ghats, morning aarti & ancient silk weavers',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 19
    },
    {
      name: 'Kerala',
      country: 'India',
      description: 'God\'s Own Country – Backwaters, spice plantations & Kathakali artists',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 24
    },
    {
      name: 'Kolkata',
      country: 'India',
      description: 'City of Joy – Colonial architecture, Bengali culture & literary cafés',
      image: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=2340&auto=format&fit=crop',
      storiesCount: 17
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              EXPLORE INDIA'S HIDDEN GEMS
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
            Discover India's Secret Spots
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore authentic local stories from India's most fascinating cities – from hidden food lanes to secret heritage sites
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => navigate(`/explore?city=${destination.name}`)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Stories Count Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 shadow-lg">
                    {destination.storiesCount} stories
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-sm font-medium text-white/90">{destination.country}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {destination.name}
                  </h3>

                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Explore Stories
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            View All Destinations
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularDestinations;
