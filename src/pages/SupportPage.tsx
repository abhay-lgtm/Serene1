import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, Heart, Shield, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SupportPage = () => {
  const [userLocation, setUserLocation] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const emergencyNumbers = [
    {
      country: "United States",
      services: [
        { name: "National Suicide Prevention Lifeline", number: "988", type: "Crisis" },
        { name: "Crisis Text Line", number: "Text HOME to 741741", type: "Text" },
        { name: "SAMHSA National Helpline", number: "1-800-662-4357", type: "Substance Abuse" },
        { name: "National Domestic Violence Hotline", number: "1-800-799-7233", type: "Domestic Violence" }
      ]
    },
    {
      country: "United Kingdom", 
      services: [
        { name: "Samaritans", number: "116 123", type: "Crisis" },
        { name: "Crisis Text Line", number: "Text SHOUT to 85258", type: "Text" },
        { name: "Mind Infoline", number: "0300 123 3393", type: "Mental Health" },
        { name: "National Domestic Abuse Helpline", number: "0808 2000 247", type: "Domestic Violence" }
      ]
    },
    {
      country: "Canada",
      services: [
        { name: "Talk Suicide Canada", number: "1-833-456-4566", type: "Crisis" },
        { name: "Kids Help Phone", number: "1-800-668-6868", type: "Youth" },
        { name: "Crisis Services Canada", number: "1-833-456-4566", type: "Crisis" },
        { name: "Canadian Mental Health Association", number: "Visit cmha.ca", type: "Mental Health" }
      ]
    }
  ];

  const onlineResources = [
    {
      name: "BetterHelp",
      description: "Professional online therapy and counseling",
      url: "https://betterhelp.com",
      type: "Online Therapy"
    },
    {
      name: "7 Cups",
      description: "Free emotional support and online therapy",
      url: "https://7cups.com", 
      type: "Peer Support"
    },
    {
      name: "Crisis Text Line",
      description: "24/7 crisis support via text messaging",
      url: "https://crisistextline.org",
      type: "Crisis Support"
    },
    {
      name: "NAMI (National Alliance on Mental Illness)",
      description: "Education, support and advocacy for mental health",
      url: "https://nami.org",
      type: "Education"
    },
    {
      name: "Mindfulness-Based Stress Reduction",
      description: "Evidence-based mindfulness programs",
      url: "https://mbsr-training.com",
      type: "Mindfulness"
    },
    {
      name: "Calm",
      description: "Meditation and sleep stories app",
      url: "https://calm.com",
      type: "Meditation"
    }
  ];

  const selfCareStrategies = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Breathing Exercises",
      description: "Practice 4-7-8 breathing: Inhale for 4, hold for 7, exhale for 8"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Reach Out",
      description: "Connect with a trusted friend, family member, or counselor"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Create a Safe Space",
      description: "Find a quiet, comfortable place where you feel secure"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Ground Yourself",
      description: "Use the 5-4-3-2-1 technique: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste"
    }
  ];

  const searchLocalCounselors = () => {
    // In a real app, this would use a geolocation API or counselor directory API
    const mockResults = [
      {
        name: "Peaceful Minds Counseling Center",
        address: "123 Wellness St, Your City",
        phone: "(555) 123-4567",
        specialties: ["Anxiety", "Depression", "Stress Management"],
        rating: 4.8,
        distance: "0.5 miles"
      },
      {
        name: "Dr. Sarah Johnson, Licensed Therapist",
        address: "456 Healing Ave, Your City", 
        phone: "(555) 987-6543",
        specialties: ["CBT", "Mindfulness", "Trauma"],
        rating: 4.9,
        distance: "1.2 miles"
      },
      {
        name: "Serenity Wellness Group",
        address: "789 Calm Blvd, Your City",
        phone: "(555) 555-0123",
        specialties: ["Group Therapy", "Family Counseling", "EMDR"],
        rating: 4.7,
        distance: "2.1 miles"
      }
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Support & Counseling Resources
          </h1>
          <p className="text-lg text-muted-foreground">
            You're not alone. Professional help and support are always available.
          </p>
        </div>

        {/* Emergency Alert */}
        <Card className="wellness-card bg-red-50 border-red-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-700">Immediate Crisis Support</h3>
              <p className="text-red-600">
                If you're in immediate danger or having thoughts of self-harm, please call emergency services (911, 999, etc.) 
                or your local crisis helpline immediately.
              </p>
            </div>
          </div>
        </Card>

        {/* Emergency Numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {emergencyNumbers.map((country, index) => (
            <Card key={index} className="wellness-card">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-wellness-primary" />
                {country.country}
              </h3>
              <div className="space-y-3">
                {country.services.map((service, serviceIndex) => (
                  <div key={serviceIndex} className="border-l-4 border-wellness-primary pl-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{service.name}</p>
                        <p className="text-sm text-wellness-primary bg-wellness-muted px-2 py-1 rounded-full inline-block">
                          {service.type}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-mono text-wellness-secondary mt-2">{service.number}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Local Counselor Search */}
        <Card className="wellness-card">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-wellness-primary" />
            Find Local Counselors
          </h2>
          
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Enter your city or zip code"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={searchLocalCounselors}
              className="wellness-button"
              disabled={!userLocation.trim()}
            >
              Search
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Counselors Near You</h3>
              {searchResults.map((counselor, index) => (
                <Card key={index} className="bg-wellness-muted border-wellness-primary/20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-foreground">{counselor.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {counselor.address} • {counselor.distance}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-wellness-primary">★ {counselor.rating}</p>
                      <p className="text-sm font-mono">{counselor.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {counselor.specialties.map((specialty: string, idx: number) => (
                      <span key={idx} className="text-xs bg-wellness-primary text-white px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
              <p className="text-xs text-blue-700 bg-blue-50 p-3 rounded-lg">
                <strong>Note:</strong> These are sample results for demonstration. A real implementation would integrate with 
                professional counselor directories and location services.
              </p>
            </div>
          )}
        </Card>

        {/* Online Resources */}
        <Card className="wellness-card">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-wellness-secondary" />
            Online Support Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onlineResources.map((resource, index) => (
              <div key={index} className="border-l-4 border-wellness-secondary pl-4 py-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{resource.name}</h4>
                    <span className="text-xs bg-wellness-secondary text-white px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Self-Care Strategies */}
        <Card className="wellness-card">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Heart className="w-6 h-6 text-wellness-accent" />
            Immediate Self-Care Strategies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selfCareStrategies.map((strategy, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-wellness-accent to-wellness-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {strategy.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{strategy.title}</h4>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Support Message */}
        <Card className="wellness-card text-center bg-gradient-to-br from-wellness-primary/10 to-wellness-secondary/10">
          <div className="w-16 h-16 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-4">You Matter</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Taking the step to seek support shows incredible strength and self-awareness. 
            Your mental health matters, and there are people who want to help you on your journey to wellness. 
            Remember that healing is not linear, and it's okay to take things one day at a time.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;