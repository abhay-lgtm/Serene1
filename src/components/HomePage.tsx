import { useState } from "react";
import { Music, BookOpen, BarChart3, Gamepad2, Newspaper, Phone, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MentalHealthSearch from "./MentalHealthSearch";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  onLogout: () => void;
}

const HomePage = ({ onLogout }: HomePageProps) => {
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", icon: <BarChart3 className="w-5 h-5" />, label: "Dashboard" },
    { id: "music", icon: <Music className="w-5 h-5" />, label: "Background Music" },
    { id: "diary", icon: <BookOpen className="w-5 h-5" />, label: "Daily Diary" },
    { id: "mood", icon: <BarChart3 className="w-5 h-5" />, label: "Mood Report & AI Analysis" },
    { id: "games", icon: <Gamepad2 className="w-5 h-5" />, label: "Relaxation Games" },
    { id: "news", icon: <Newspaper className="w-5 h-5" />, label: "Positive Current Affairs" },
    { id: "support", icon: <Phone className="w-5 h-5" />, label: "Helpline & Counseling" },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Welcome Back to Your Wellness Journey
        </h1>
        <p className="text-lg text-muted-foreground">
          How are you feeling today? Let's continue nurturing your peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="wellness-card">
          <div className="flex items-center mb-4">
            <Music className="w-6 h-6 text-wellness-primary mr-3" />
            <h3 className="text-lg font-semibold">Today's Mood Music</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Personalized ambient sounds based on your preferences
          </p>
          <Button 
            className="wellness-button-secondary w-full"
            onClick={() => navigate("/music")}
          >
            Start Listening
          </Button>
        </Card>

        <Card className="wellness-card">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-wellness-secondary mr-3" />
            <h3 className="text-lg font-semibold">Daily Reflection</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            "What brought you joy today?" - 2 minutes to peace
          </p>
          <Button 
            className="wellness-button-secondary w-full"
            onClick={() => navigate("/diary")}
          >
            Write Entry
          </Button>
        </Card>

        <Card className="wellness-card">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-wellness-accent mr-3" />
            <h3 className="text-lg font-semibold">Mood Insights</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Your wellness trend is improving this week
          </p>
          <Button 
            className="wellness-button-secondary w-full"
            onClick={() => navigate("/mood")}
          >
            View Report
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="wellness-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Gamepad2 className="w-6 h-6 text-wellness-primary mr-3" />
            Quick Relaxation
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-wellness-muted rounded-lg">
              <span>Breathing Exercise</span>
              <Button size="sm" variant="outline" onClick={() => navigate("/games")}>Start</Button>
            </div>
            <div className="flex justify-between items-center p-3 bg-wellness-muted rounded-lg">
              <span>Mandala Coloring</span>
              <Button size="sm" variant="outline" onClick={() => navigate("/games")}>Play</Button>
            </div>
            <div className="flex justify-between items-center p-3 bg-wellness-muted rounded-lg">
              <span>Zen Puzzle</span>
              <Button size="sm" variant="outline" onClick={() => navigate("/games")}>Begin</Button>
            </div>
          </div>
        </Card>

        <Card className="wellness-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Newspaper className="w-6 h-6 text-wellness-secondary mr-3" />
            Today's Inspiration
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-wellness-primary pl-4">
              <h4 className="font-medium">Community Garden Initiative Spreads Joy</h4>
              <p className="text-sm text-muted-foreground">Local volunteers transform vacant lots into beautiful spaces...</p>
            </div>
            <div className="border-l-4 border-wellness-secondary pl-4">
              <h4 className="font-medium">New Meditation App Helps Students</h4>
              <p className="text-sm text-muted-foreground">University partnership reduces stress levels by 40%...</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "music":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Background Music</h2>
            <p className="text-muted-foreground">Curated ambient sounds for your wellness journey</p>
          </div>
        );
      case "diary":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Daily Digital  Diary</h2>
            <p className="text-muted-foreground">Your 2-minute daily reflection space</p>
          </div>
        );
      case "mood":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Mood Report & AI Analysis</h2>
            <p className="text-muted-foreground">Track your emotional wellness journey</p>
          </div>
        );
      case "games":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Relaxation Games</h2>
            <p className="text-muted-foreground">Calming activities for stress relief</p>
          </div>
        );
      case "news":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Positive Current Affairs</h2>
            <p className="text-muted-foreground">Uplifting news to brighten your day</p>
          </div>
        );
      case "support":
        return (
          <div className="text-center">
            <MentalHealthSearch/>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white/80 backdrop-blur-sm border-r border-border transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-xl font-bold text-wellness-primary">Serene</h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "dashboard") {
                    setActiveSection(item.id);
                  } else {
                    navigate(`/${item.id}`);
                  }
                }}
                className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-wellness-primary text-white shadow-soft'
                    : 'text-muted-foreground hover:bg-wellness-muted hover:text-foreground'
                }`}
              >
                {item.icon}
                {!sidebarCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-border p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-foreground">
              {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Profile Popup Overlay */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md wellness-card">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Welcome, Wellness Seeker</h3>
              <p className="text-muted-foreground">Your journey to inner peace continues</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 bg-wellness-muted rounded-lg">
                <span className="text-sm font-medium">Streak</span>
                <span className="text-sm text-wellness-primary font-semibold">7 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-wellness-muted rounded-lg">
                <span className="text-sm font-medium">Mood Score</span>
                <span className="text-sm text-wellness-secondary font-semibold">8.2/10</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-wellness-muted rounded-lg">
                <span className="text-sm font-medium">Sessions</span>
                <span className="text-sm text-wellness-accent font-semibold">23 completed</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={onLogout}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out  
              </Button>
              <Button
                onClick={() => setShowProfile(false)}
                className="wellness-button w-full"
              >
                Continue Journey
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HomePage;