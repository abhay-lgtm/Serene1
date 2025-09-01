import { useState } from "react";
import { Music, BookOpen, BarChart3, Gamepad2, Newspaper, Phone, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import musicIcon from "@/assets/music-icon.jpg";
import diaryIcon from "@/assets/diary-icon.jpg";
import moodIcon from "@/assets/mood-icon.jpg";
import gamesIcon from "@/assets/games-icon.jpg";
import newsIcon from "@/assets/news-icon.jpg";
import supportIcon from "@/assets/support-icon.jpg";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      icon: <Music className="w-8 h-8" />,
      image: musicIcon,
      title: "Mind-Relaxing Background Music",
      description: "Customizable ambient sounds and light instruments tailored to your mood and preferences for ultimate relaxation."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      image: diaryIcon,
      title: "Daily Digital Diary",
      description: "Spend just 2 minutes daily answering calming reflection questions designed to bring comfort and mindfulness."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      image: moodIcon,
      title: "Mood Reporting & AI Analysis",
      description: "Track your daily mood and receive personalized insights, trend analysis, and AI-guided meditation suggestions."
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      image: gamesIcon,
      title: "Relaxation Games",
      description: "Simple, calming games including puzzles, breathing exercises, and mandala coloring for stress relief."
    },
    {
      icon: <Newspaper className="w-8 h-8" />,
      image: newsIcon,
      title: "Positive Current Affairs",
      description: "Curated uplifting news focusing on kindness, innovation, and inspiring events from around the world."
    },
    {
      icon: <Phone className="w-8 h-8" />,
      image: supportIcon,
      title: "Helpline & Counseling Access",
      description: "Quick access to emergency helplines and nearby counseling centers for professional mental health support."
    }
  ];

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="lg"
          className="bg-white/90 backdrop-blur-xl border-wellness-primary/20 hover:bg-white/95 bg-transparent"
        >
          {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
          {isPlaying ? "Pause" : "Play"} Ambient Sounds
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 fade-in-up">
            <span className="bg-gradient-to-r from-wellness-primary to-wellness-secondary bg-clip-text text-transparent">
              Serene
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 fade-in-up font-light leading-relaxed">
            Your peaceful digital sanctuary for emotional well-being and stress relief
          </p>
          <Button 
            onClick={onGetStarted}
            className="wellness-button text-lg px-8 py-4 fade-in-up"
          >
            Begin Your Wellness Journey
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-peaceful">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Wellness Toolkit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover powerful tools designed to nurture your mental health and create lasting peace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="wellness-card group hover:scale-105 fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-peaceful">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Find Your Inner Peace?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands who have transformed their daily lives with our gentle, science-backed wellness tools
          </p>
          <Button 
            onClick={onGetStarted}
            className="wellness-button text-lg px-8 py-4"
          >
            Start Your Free Journey Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;