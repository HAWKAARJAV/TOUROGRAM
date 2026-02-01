import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Sparkles, Globe, Users, Camera, Heart } from 'lucide-react';
// Local component imports – wrapped in try/catch style dynamic requires for resilience if paths shift
import StoryCard from '@/components/StoryCard';
let FloatingChatBubble: React.ComponentType | null = null;
let LoadMoreButton: React.ComponentType<any> | null = null;
let HeroSection: React.ComponentType | null = null;
try { FloatingChatBubble = require('@/components/FloatingChatBubble').default; } catch { /* optional */ }
try { LoadMoreButton = require('@/components/LoadMoreButton').default; } catch { /* optional */ }
try { HeroSection = require('@/components/HeroSection').default; } catch { /* optional */ }

interface Story {
  id: string;
  title: string;
  excerpt: string;
  location: string;
  author: {
    name: string;
    avatar?: string;
    badge?: string;
  };
  tags: string[];
  likes: number;
  comments: number;
  isLocked: boolean;
  isLiked: boolean;
  image?: string;
  emotion?: string;
  readTime?: string;
}

const HomePage: React.FC = () => {
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [trendingStories, setTrendingStories] = useState<Story[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const autoSlideRef = useRef<number | null>(null);

  // Mock data - Indian Hidden Gems
  const mockFeaturedStories: Story[] = [
    {
      id: '1',
      title: 'Midnight Kebabs in Old Delhi',
      excerpt: 'Discover the secret kebab lanes of Jama Masjid that only locals know about. At 1 AM, when the famous restaurants close, the real magic begins.',
      location: 'Jama Masjid, Delhi',
      author: { name: 'Rahul Sharma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', badge: 'verified' },
      tags: ['Street Food', 'Hidden Gem', 'Old Delhi'],
      likes: 567,
      comments: 134,
      isLocked: false,
      isLiked: false,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&h=600&fit=crop',
      emotion: 'adventure',
      readTime: '6 min read'
    },
    {
      id: '2',
      title: 'The Last Zari Masters of Kinari Bazaar',
      excerpt: 'Meet Mohammad Iqbal, one of the last 12 people in India who can create real gold zari embroidery. A 400-year-old craft dying in the digital age.',
      location: 'Chandni Chowk, Delhi',
      author: { name: 'Amit Singh', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
      tags: ['Artisan', 'Heritage', 'Craft'],
      likes: 445,
      comments: 89,
      isLocked: false,
      isLiked: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      emotion: 'cultural',
      readTime: '8 min read'
    },
    {
      id: '3',
      title: 'Champa Gali: Delhi\'s Hidden Café Alley',
      excerpt: 'Between furniture warehouses in Saket, a narrow gap leads to Champa Gali – Delhi\'s worst-kept secret that still feels like a secret.',
      location: 'Saket, Delhi',
      author: { name: 'Vikram Chauhan', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', badge: 'verified' },
      tags: ['Cafe', 'Hidden Spot', 'Community'],
      likes: 789,
      comments: 156,
      isLocked: false,
      isLiked: false,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
      emotion: 'cozy',
      readTime: '5 min read'
    }
  ];

  const mockTrendingStories: Story[] = [
    ...mockFeaturedStories,
    {
      id: '4',
      title: 'Feroz Shah Kotla: Where Delhi Writes to Djinns',
      excerpt: 'Every Thursday, hundreds come to this 14th-century fortress to leave letters for supernatural beings. An 800-year-old tradition.',
      location: 'Feroz Shah Kotla, Delhi',
      author: { name: 'Priya Verma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
      tags: ['Heritage', 'Spiritual', 'Tradition'],
      likes: 678,
      comments: 192,
      isLocked: false,
      isLiked: true,
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
      emotion: 'mysterious',
      readTime: '10 min read'
    },
    {
      id: '5',
      title: 'The Secret Rooftops of Hauz Khas Village',
      excerpt: 'Behind the boutiques and bars, there\'s an unofficial network of rooftop spaces that Delhi\'s artists have claimed over decades.',
      location: 'Hauz Khas, Delhi',
      author: { name: 'Neha Kapoor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      tags: ['Art', 'Rooftop', 'Secret Spot'],
      likes: 534,
      comments: 87,
      isLocked: false,
      isLiked: false,
      image: 'https://images.unsplash.com/photo-1515091943-9d5c0ad475af?w=800&h=600&fit=crop',
      emotion: 'creative',
      readTime: '7 min read'
    },
    {
      id: '6',
      title: 'Majnu Ka Tila: Little Tibet in North Delhi',
      excerpt: 'Twenty minutes from central Delhi, a Tibetan settlement that feels like you\'ve crossed a border. Momos, monasteries, and magic.',
      location: 'Majnu Ka Tila, Delhi',
      author: { name: 'Vikram Chauhan', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
      tags: ['Cultural', 'Tibetan', 'Community'],
      likes: 412,
      comments: 76,
      isLocked: false,
      isLiked: false,
      image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&h=600&fit=crop',
      emotion: 'peaceful',
      readTime: '6 min read'
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setFeaturedStories(mockFeaturedStories);
      setTrendingStories(mockTrendingStories.slice(0, 6));
      setIsLoading(false);
    }, 1000);
  }, []);

  const nextSlide = () => {
    if (!featuredStories.length) return;
    setCurrentSlide((prev) => (prev + 1) % featuredStories.length);
  };

  const prevSlide = () => {
    if (!featuredStories.length) return;
    setCurrentSlide((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  };

  // Auto advance carousel
  useEffect(() => {
    if (carouselPaused || featuredStories.length <= 1) return;
    autoSlideRef.current && window.clearTimeout(autoSlideRef.current);
    autoSlideRef.current = window.setTimeout(() => {
      nextSlide();
    }, 6500); // 6.5s between slides
    return () => {
      if (autoSlideRef.current) window.clearTimeout(autoSlideRef.current);
    };
  }, [currentSlide, carouselPaused, featuredStories.length]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTrendingStories(prev => [...prev, ...mockTrendingStories.slice(6, 10)]);
    setLoadingMore(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const statsVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-white font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading amazing stories...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-slate-900/50 via-purple-900/50 to-slate-900/50" />
      </div>

      <motion.div
        className="relative z-10 pt-20 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        {HeroSection ? <HeroSection /> : (
          <div className="max-w-7xl mx-auto px-4 pt-10">
            <div className="animate-pulse space-y-6">
              <div className="h-10 w-2/3 bg-white/10 rounded" />
              <div className="h-6 w-1/2 bg-white/10 rounded" />
              <div className="h-64 w-full bg-white/5 rounded-xl" />
            </div>
          </div>
        )}

        {/* Stats Section */}
        <motion.section
          className="py-16 px-4"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, label: 'Travelers', value: '50K+', color: 'from-blue-500 to-cyan-500' },
                { icon: Camera, label: 'Stories', value: '25K+', color: 'from-purple-500 to-pink-500' },
                { icon: Globe, label: 'Countries', value: '180+', color: 'from-green-500 to-teal-500' },
                { icon: Heart, label: 'Experiences', value: '1M+', color: 'from-red-500 to-orange-500' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={statsVariants}
                  custom={index}
                >
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-full blur-lg opacity-60`} />
                    <div className={`relative bg-gradient-to-r ${stat.color} rounded-full w-full h-full flex items-center justify-center`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <motion.div
                    className="text-2xl font-bold text-white mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Featured Stories Carousel */}
        <motion.section
          className="py-16 px-4"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Featured Stories</h2>
                  <p className="text-white/70">Handpicked adventures from our community</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  onClick={prevSlide}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous featured story"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next featured story"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Carousel */}
            <div
              className="relative overflow-hidden rounded-3xl"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="relative h-96 md:h-[500px]"
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {featuredStories.length > 0 && featuredStories[currentSlide] && (
                    <div className="relative w-full h-full">
                      {/* Background Image with Overlay */}
                      <img
                        src={featuredStories[currentSlide].image}
                        alt={featuredStories[currentSlide].title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 flex items-center">
                        <div className="max-w-2xl mx-auto px-8 md:px-16">
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="flex items-center space-x-3 mb-4">
                              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full">
                                Featured
                              </span>
                              <span className="text-white/70 text-sm">{featuredStories[currentSlide].readTime}</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                              {featuredStories[currentSlide].title}
                            </h3>

                            <p className="text-white/80 text-lg mb-6 max-w-xl">
                              {featuredStories[currentSlide].excerpt}
                            </p>

                            <div className="flex items-center space-x-4 mb-8">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={featuredStories[currentSlide].author.avatar || '/default-avatar.jpg'}
                                  alt={featuredStories[currentSlide].author.name}
                                  className="w-10 h-10 rounded-full border-2 border-white/30"
                                />
                                <span className="text-white font-medium">{featuredStories[currentSlide].author.name}</span>
                              </div>
                              <span className="text-white/70">•</span>
                              <span className="text-white/70">{featuredStories[currentSlide].location}</span>
                            </div>

                            <motion.button
                              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Read Full Story
                            </motion.button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Carousel Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3" role="tablist" aria-label="Featured story selector">
                {featuredStories.length === 0 && (
                  <div className="text-white/60 text-sm">No featured stories</div>
                )}
                {featuredStories.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/70'
                      }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    role="tab"
                    aria-selected={index === currentSlide}
                    aria-label={`Show featured story ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Trending Stories Grid */}
        <motion.section
          className="py-16 px-4"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Trending Stories</h2>
                <p className="text-white/70">Popular adventures from the community</p>
              </div>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {trendingStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <StoryCard
                    story={story}
                    variant="trending"
                    className="h-full"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            {LoadMoreButton && (
              <div className="flex justify-center mt-12">
                <LoadMoreButton
                  onClick={handleLoadMore}
                  loading={loadingMore}
                  text="Load More Stories"
                />
              </div>
            )}
          </div>
        </motion.section>
      </motion.div>

      {/* Floating Chat Bubble */}
      {FloatingChatBubble && <FloatingChatBubble />}
    </div>
  );
};

export default HomePage;