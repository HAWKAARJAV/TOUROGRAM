import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Mic, Type, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";

const SubmitStory = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    location: "",
    tags: [] as string[],
    newTag: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const commonTags = ["food", "music", "history", "culture", "nightlife", "art", "nature", "family", "hidden gem", "local tip"];

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      updateFormData("tags", [...formData.tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormData("tags", formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddNewTag = () => {
    if (formData.newTag.trim()) {
      addTag(formData.newTag.trim().toLowerCase());
      updateFormData("newTag", "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare story data
      const storyData = {
        title: formData.title.trim(),
        content: {
          type: 'text',
          text: formData.content.trim(),
          media: []
        },
        location: {
          coordinates: [0, 0], // TODO: Get coordinates from geocoding
          address: {
            formatted: formData.location.trim() || 'Unknown',
            city: formData.location.trim() || 'Unknown',
            country: 'Unknown'
          }
        },
        tags: formData.tags,
        visibility: 'public'
      };

      // Call API to create story
      const response = await apiService.createStory(storyData);

      if (response.error) {
        let errorMessage = response.error;
        
        // Parse validation errors if available
        if (response.error.includes('Validation failed')) {
          errorMessage = 'Please check your story:\n' +
            '• Title must be 5-200 characters\n' +
            '• Content must be 50-5000 characters\n' +
            '• Location is required';
        }
        
        throw new Error(errorMessage);
      }

      toast({
        title: "Story published successfully!",
        description: "Your story is now live and visible to everyone!",
      });
      navigate("/my-stories");
    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to submit story',
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Header */}
      <div className="text-white py-12" style={{ background: 'linear-gradient(135deg, hsl(215, 30%, 12%) 0%, hsl(215, 30%, 18%) 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Share Your Story</h1>
          <p className="text-xl text-white/90">
            Add your unique experience to our global community of storytellers
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Type className="h-6 w-6 mr-2 text-primary" />
              Tell Your Story
            </CardTitle>
            <CardDescription>
              Share an authentic experience tied to a specific place that others would love to discover
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Story Title *</Label>
                <Input
                  id="title"
                  placeholder="Give your story a compelling title..."
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {formData.title.length}/200 characters (minimum 5 required)
                </p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Where did this story take place?"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Be specific! Include city, neighborhood, or landmark name
                </p>
              </div>

              {/* Story Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Your Story *</Label>
                <Textarea
                  id="content"
                  placeholder="Tell your story in detail. What happened? What made it special? How did it make you feel? Paint a picture with your words..."
                  value={formData.content}
                  onChange={(e) => updateFormData("content", e.target.value)}
                  className="min-h-48 resize-none"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {formData.content.length}/5000 characters. Minimum 50 characters required (aim for 200-500 for best engagement).
                </p>
              </div>

              {/* Media Upload Placeholder */}
              <div className="space-y-2">
                <Label>Add Media (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button type="button" variant="outline" className="h-24 flex-col">
                    <Camera className="h-6 w-6 mb-2" />
                    <span className="text-sm">Add Photo</span>
                  </Button>
                  <Button type="button" variant="outline" className="h-24 flex-col">
                    <Mic className="h-6 w-6 mb-2" />
                    <span className="text-sm">Record Audio</span>
                  </Button>
                  <Button type="button" variant="outline" className="h-24 flex-col">
                    <MapPin className="h-6 w-6 mb-2" />
                    <span className="text-sm">Pin Location</span>
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label>Tags (Select up to 5)</Label>
                
                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="default" 
                        className="cursor-pointer"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Common Tags */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Popular tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {commonTags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant={formData.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => formData.tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Custom Tag Input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Add custom tag..."
                      value={formData.newTag}
                      onChange={(e) => updateFormData("newTag", e.target.value)}
                      className="pl-10"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNewTag())}
                    />
                  </div>
                  <Button type="button" onClick={handleAddNewTag} variant="outline">
                    Add
                  </Button>
                </div>
              </div>

              {/* Guidelines */}
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-sm mb-2">Community Guidelines:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Share authentic, personal experiences</li>
                    <li>• Be respectful of local culture and privacy</li>
                    <li>• Focus on stories that help others discover places</li>
                    <li>• Avoid promotional content or advertising</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1 btn-glow" 
                  disabled={isSubmitting || formData.title.length < 5 || formData.content.length < 50 || !formData.location}
                >
                  {isSubmitting ? "Publishing Story..." : "Publish Story"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/explore")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitStory;