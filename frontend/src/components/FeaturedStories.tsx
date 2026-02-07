import StoryCard from "./StoryCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jazzClubImage from "@/assets/jazz-club.jpg";
import parisCafeImage from "@/assets/paris-cafe.jpg";
import communityFoodImage from "@/assets/community-food.jpg";
import { storyImages } from "@/utils/imageUtils";

const FeaturedStories = () => {
  const navigate = useNavigate();
  const featuredStories = [
    {
      id: "1",
      title: "The Secret Jazz Club Behind the Bookstore",
      excerpt: "Every Thursday night, a hidden door opens in the back of Chennai's oldest bookstore, revealing a world of underground jazz that's been thriving since the 1970s...",
      fullContent: "Every Thursday night, a hidden door opens in the back of Chennai's oldest bookstore, revealing a world of underground jazz that's been thriving since the 1970s...",
      location: "Chennai, India",
      author: { name: "Priya Sharma", badge: "Local Guide" },
      tags: ["Music", "Hidden Gems", "Culture"],
      likes: 47,
      comments: 12,
      isLocked: false,
      isLiked: false,
      image: jazzClubImage
    },
    {
      id: "2",
      title: "Where Hemingway Wrote His Last Letter",
      excerpt: "In a quiet corner of this Paris café, Ernest Hemingway penned what would become his final correspondence. The owner still keeps the table exactly as it was...",
      fullContent: "In a quiet corner of this Paris café, Ernest Hemingway penned what would become his final correspondence...",
      location: "Paris, France",
      author: { name: "Marcus Chen", badge: "Story Master" },
      tags: ["Literary", "History", "Café Culture"],
      likes: 89,
      comments: 24,
      isLocked: false,
      isLiked: false,
      image: parisCafeImage
    },
    {
      id: "3",
      title: "The Grandmother's Recipe That United a Neighborhood",
      excerpt: "When Mrs. Rodriguez started sharing her tamales during the pandemic, she had no idea it would bring together a community that had been divided for years...",
      fullContent: "When Mrs. Rodriguez started sharing her tamales during the pandemic...",
      location: "Mexico City, Mexico",
      author: { name: "Sofia Martinez" },
      tags: ["Food", "Community", "Heartwarming"],
      likes: 156,
      comments: 33,
      isLocked: false,
      isLiked: true,
      image: communityFoodImage
    }
  ];

  const handleSwapToUnlock = () => {
    console.log("Opening story submission...");
  };

  const handleStoryClick = (story: any) => {
    const storyData = encodeURIComponent(JSON.stringify(story));
    navigate(`/story-detail?data=${storyData}`);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            FEATURED STORIES
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trending Travel Stories
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic experiences from travelers around the world
          </p>
        </motion.div>

        {/* Simple Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StoryCard 
                story={story} 
                onSwapToUnlock={handleSwapToUnlock}
                onStoryClick={() => handleStoryClick(story)}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-primary to-primary-glow text-white px-10 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/explore')}
          >
            Explore All Stories
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedStories;