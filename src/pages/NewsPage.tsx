import { useState } from "react";
import { Heart, Star, Globe, Sparkles, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Environment", "Innovation", "Community", "Health", "Education", "Acts of Kindness"];

  const positiveNews = [
    {
      title: "Community Garden Initiative Transforms Urban Neighborhood",
      summary: "Local volunteers unite to convert vacant lots into thriving community gardens, bringing fresh produce and stronger connections to their neighborhood.",
      category: "Community",
      date: "2024-01-15",
      readTime: "3 min",
      image: "🌱",
      fullStory: "What started as a small group of neighbors concerned about food access has blossomed into a city-wide movement. The Sunny Side Community Garden now feeds over 200 families and has inspired 15 similar projects across the city.",
      impact: "200+ families served, 15 new gardens inspired"
    },
    {
      title: "Breakthrough: Scientists Develop Plastic-Eating Enzyme",
      summary: "Researchers create a revolutionary enzyme that can break down plastic waste in hours instead of centuries, offering hope for ocean cleanup efforts.",
      category: "Environment",
      date: "2024-01-14", 
      readTime: "4 min",
      image: "♻️",
      fullStory: "This groundbreaking enzyme can process PET plastic—used in bottles and containers—6 times faster than previous solutions. Early trials show it could help clean our oceans and reduce landfill waste significantly.",
      impact: "Could reduce ocean plastic by 30% within 10 years"
    },
    {
      title: "High School Students Invent Water Purification Device",
      summary: "Three teenagers from rural Kenya develop a low-cost water purification system that provides clean drinking water for their entire village.",
      category: "Innovation",
      date: "2024-01-13",
      readTime: "3 min", 
      image: "💧",
      fullStory: "Using solar energy and locally sourced materials, these students created a device that costs just $15 to build but can purify 100 liters of water daily. Their invention has already been adopted by 5 neighboring villages.",
      impact: "6 villages now have clean water access"
    },
    {
      title: "Meditation Program Reduces Student Stress by 40%",
      summary: "University partnership with mindfulness experts shows remarkable improvement in student mental health and academic performance.",
      category: "Health",
      date: "2024-01-12",
      readTime: "2 min",
      image: "🧘",
      fullStory: "The 'Mindful Campus' initiative taught 10,000 students meditation techniques over one semester. Results showed not only reduced stress but also improved focus, better sleep, and stronger peer relationships.",
      impact: "10,000 students report better mental health"
    },
    {
      title: "Teacher Creates Library from Discarded Books",
      summary: "Dedicated educator builds a 5,000-book library using donated and rescued books, bringing literacy to underserved communities.",
      category: "Education",
      date: "2024-01-11",
      readTime: "3 min",
      image: "📚",
      fullStory: "Ms. Rodriguez started by rescuing books from dumpsters and asking for donations. Her grassroots library now serves 500 children and has a 95% literacy improvement rate among regular visitors.",
      impact: "500 children have access to books, 95% literacy improvement"
    },
    {
      title: "Neighbors Launch 'Random Acts of Kindness' Chain",
      summary: "One small gesture of buying coffee for a stranger sparks a month-long chain reaction of kindness across three cities.",
      category: "Acts of Kindness",
      date: "2024-01-10",
      readTime: "2 min",
      image: "☕",
      fullStory: "Sarah's simple act of paying for a stranger's coffee led to over 1,000 documented acts of kindness. People shared stories of paid meals, helped groceries, free rides, and volunteer hours—all traced back to that one cup of coffee.",
      impact: "1,000+ acts of kindness documented across 3 cities"
    }
  ];

  const filteredNews = selectedCategory === "All" 
    ? positiveNews 
    : positiveNews.filter(article => article.category === selectedCategory);

  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      "Environment": "🌍",
      "Innovation": "💡",
      "Community": "🤝",
      "Health": "💚",
      "Education": "🎓",
      "Acts of Kindness": "❤️"
    };
    return icons[category] || "✨";
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Positive Current Affairs
          </h1>
          <p className="text-lg text-muted-foreground">
            Uplifting news to brighten your day and restore faith in humanity
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full mx-auto mb-3 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-wellness-primary">1,200+</h3>
            <p className="text-sm text-muted-foreground">Lives Positively Impacted</p>
          </Card>
          
          <Card className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-wellness-secondary to-wellness-accent rounded-full mx-auto mb-3 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-wellness-secondary">25</h3>
            <p className="text-sm text-muted-foreground">Communities Transformed</p>
          </Card>
          
          <Card className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-wellness-accent to-wellness-primary rounded-full mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-wellness-accent">100%</h3>
            <p className="text-sm text-muted-foreground">Good News Only</p>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`${selectedCategory === category ? "wellness-button" : ""} flex items-center gap-2`}
            >
              {category !== "All" && <span>{getCategoryIcon(category)}</span>}
              {category}
            </Button>
          ))}
        </div>

        {/* News Articles */}
        <div className="space-y-6">
          {filteredNews.map((article, index) => (
            <Card key={index} className="wellness-card hover:shadow-soft transition-all">
              <div className="flex items-start gap-4">
                {/* Article Icon */}
                <div className="text-4xl flex-shrink-0 mt-2">
                  {article.image}
                </div>
                
                {/* Article Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-wellness-primary text-white px-2 py-1 rounded-full">
                        {getCategoryIcon(article.category)} {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.date)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {article.readTime} read
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {article.summary}
                  </p>
                  
                  {expandedArticle === index && (
                    <div className="bg-wellness-muted p-4 rounded-lg mb-4 space-y-3">
                      <p className="text-foreground">{article.fullStory}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-wellness-primary" />
                        <span className="font-semibold text-wellness-primary">Impact:</span>
                        <span className="text-muted-foreground">{article.impact}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedArticle(expandedArticle === index ? null : index)}
                      className="text-wellness-primary hover:bg-wellness-muted"
                    >
                      {expandedArticle === index ? "Show Less" : "Read Full Story"}
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-500">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-500">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Daily Inspiration */}
        <Card className="wellness-card text-center bg-gradient-to-br from-wellness-primary/10 to-wellness-secondary/10">
          <div className="w-16 h-16 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-4">Today's Inspiration</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            "In a world where you can be anything, be kind. Every positive action, 
            no matter how small, creates ripples of hope that can transform communities 
            and change lives. You have the power to be part of these beautiful stories."
          </p>
        </Card>

        {/* Share Positivity */}
        <Card className="wellness-card text-center">
          <h3 className="text-lg font-bold text-foreground mb-4">Share Your Own Positive Story</h3>
          <p className="text-muted-foreground mb-4">
            Know of an inspiring story or positive news? We'd love to feature it and spread more joy!
          </p>
          <Button className="wellness-button">
            Submit a Story
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            <strong>Note:</strong> Story submission would require backend functionality to collect and moderate user submissions.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default NewsPage;