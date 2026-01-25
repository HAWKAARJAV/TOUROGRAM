import React from "react";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import FeaturedStories from "../components/FeaturedStories";
import PopularDestinations from "../components/PopularDestinations";
import { Star, ArrowRight, MapPin, Mail, Phone, Heart, Sparkles, Video } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-16">
      <HeroSection />

      {/* Popular Destinations Section */}
      <PopularDestinations />

      <HowItWorks />
      <FeaturedStories />

      {/* Inspire Me Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Video/Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                <img
                  src="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                  alt="How StorySwap Works"
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Video className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">See How It Works</h3>
                  <p className="text-white/90">Learn how to create and share your travel stories</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 text-primary text-sm font-semibold mb-6">
                <span className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  NOT SURE WHERE TO START?
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                Let AI Inspire Your Next Adventure
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our AI-powered trip planner helps you discover hidden gems, create personalized itineraries,
                and connect with local experiences based on your mood and preferences.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">AI Travel Recommendations</h4>
                    <p className="text-gray-600 text-sm">Get personalized destination suggestions based on your stories</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Emotion-Based Planning</h4>
                    <p className="text-gray-600 text-sm">Plan trips that match your current mood and travel style</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Hidden Gems Discovery</h4>
                    <p className="text-gray-600 text-sm">Explore off-beat locations shared by local storytellers</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/plan')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                Start Planning Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-32 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-6 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-secondary text-sm font-semibold mb-8">
            <span className="font-heading tracking-wider">JOIN OUR COMMUNITY</span>
          </div>

          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
            Ready to Share
            <span className="text-primary"> Your Story?</span>
          </h2>

          <p className="font-body text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of storytellers building the world's most authentic travel and local discovery platform.
            Connect with travelers and locals around the globe.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="btn-magnetic bg-gradient-to-r from-primary via-primary-glow to-accent text-white font-bold text-xl py-5 px-14 rounded-2xl shadow-2xl hover:shadow-primary/40 transition-all duration-500 group">
              <span className="flex items-center">
                <Star className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                Start Your Journey
              </span>
            </button>
            <button className="btn-magnetic glass-enhanced border-2 border-white/50 text-white hover:bg-white hover:text-secondary font-bold text-xl py-5 px-14 rounded-2xl transition-all duration-500 group">
              <span className="flex items-center">
                Learn More
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Animations */}
      <footer className="text-white py-20 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, hsl(215, 28%, 10%) 0%, hsl(215, 28%, 15%) 100%)'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="floating absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
          <div className="floating absolute bottom-10 right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl" style={{ animationDelay: '-3s' }} />
          <div className="floating absolute top-1/2 left-1/3 w-24 h-24 bg-primary-glow/30 rounded-full blur-2xl" style={{ animationDelay: '-6s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              className="col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3
                className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-primary-glow to-white bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Tourogram
              </motion.h3>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                Connecting the world through authentic local stories and shared experiences.
                Discover hidden gems and create meaningful connections through storytelling.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <motion.div
                  className="flex items-center text-white/70 hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>San Francisco, CA</span>
                </motion.div>
                <motion.div
                  className="flex items-center text-white/70 hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  <span>hello@tourogram.com</span>
                </motion.div>
                <motion.div
                  className="flex items-center text-white/70 hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="h-5 w-5 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </motion.div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-white/60 font-semibold">Follow us:</span>
                <motion.a
                  href="#"
                  className="text-white/80 hover:text-primary transition-all duration-300 hover:scale-110 inline-block"
                  whileHover={{ y: -3 }}
                >
                  Twitter
                </motion.a>
                <motion.a
                  href="#"
                  className="text-white/80 hover:text-primary transition-all duration-300 hover:scale-110 inline-block"
                  whileHover={{ y: -3 }}
                >
                  Instagram
                </motion.a>
                <motion.a
                  href="#"
                  className="text-white/80 hover:text-primary transition-all duration-300 hover:scale-110 inline-block"
                  whileHover={{ y: -3 }}
                >
                  Facebook
                </motion.a>
              </div>
            </motion.div>

            {/* Community Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-bold mb-6 text-xl text-white">Community</h4>
              <ul className="space-y-4 text-white/70">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Guidelines
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Safety
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Help Center
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Stories
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* About Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-bold mb-6 text-xl text-white">About</h4>
              <ul className="space-y-4 text-white/70">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Our Mission
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Contact
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Privacy
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Terms
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="border-t border-white/10 mt-16 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center text-white/60">
                <p className="flex items-center">
                  Made with
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mx-2"
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </motion.span>
                  by Tourogram Team
                </p>
              </div>
              <p className="text-white/60">&copy; 2025 Tourogram. Building community through shared stories.</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
