import { useState } from "react";
import { TrendingUp, Calendar, Brain, Target, Clock, Star, BarChart3, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MoodPage = () => {
  const [todaysMood, setTodaysMood] = useState<number | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  // Sample mood data (in real app, this would come from backend)
  const moodHistory = [
    { date: "2024-01-15", mood: 4, energy: 3, stress: 2, activities: ["meditation", "exercise"] },
    { date: "2024-01-14", mood: 3, energy: 4, stress: 3, activities: ["journaling"] },
    { date: "2024-01-13", mood: 5, energy: 5, stress: 1, activities: ["meditation", "music", "nature"] },
    { date: "2024-01-12", mood: 2, energy: 2, stress: 4, activities: [] },
    { date: "2024-01-11", mood: 4, energy: 3, stress: 2, activities: ["exercise", "journaling"] },
    { date: "2024-01-10", mood: 3, energy: 3, stress: 3, activities: ["meditation"] },
    { date: "2024-01-09", mood: 5, energy: 4, stress: 1, activities: ["nature", "music", "meditation"] }
  ];

  const moodEmojis = [
    { emoji: "😢", label: "Very Low", value: 1, color: "text-red-500" },
    { emoji: "😕", label: "Low", value: 2, color: "text-orange-500" },
    { emoji: "😐", label: "Neutral", value: 3, color: "text-yellow-500" },
    { emoji: "😊", label: "Good", value: 4, color: "text-green-500" },
    { emoji: "😄", label: "Excellent", value: 5, color: "text-wellness-primary" }
  ];

  const calculateAverage = (key: 'mood' | 'energy' | 'stress') => {
    const sum = moodHistory.reduce((acc, day) => acc + day[key], 0);
    return (sum / moodHistory.length).toFixed(1);
  };

  const getTrendDirection = (key: 'mood' | 'energy' | 'stress') => {
    if (moodHistory.length < 2) return "stable";
    const recent = moodHistory.slice(0, 3).reduce((acc, day) => acc + day[key], 0) / 3;
    const older = moodHistory.slice(3, 6).reduce((acc, day) => acc + day[key], 0) / 3;
    
    if (key === 'stress') {
      return recent < older ? "improving" : recent > older ? "declining" : "stable";
    }
    return recent > older ? "improving" : recent < older ? "declining" : "stable";
  };

  const getInsights = () => {
    const insights = [];
    
    const avgMood = parseFloat(calculateAverage('mood'));
    const avgEnergy = parseFloat(calculateAverage('energy'));
    const avgStress = parseFloat(calculateAverage('stress'));
    
    if (avgMood >= 4) {
      insights.push("Your mood has been consistently positive! Keep up the great work with your wellness practices.");
    } else if (avgMood < 3) {
      insights.push("Your mood could use some attention. Consider incorporating more mindfulness or physical activity into your routine.");
    }
    
    if (avgEnergy >= 4) {
      insights.push("Your energy levels are excellent! You're maintaining good vitality.");
    } else if (avgEnergy < 3) {
      insights.push("Your energy seems low. Ensure you're getting enough sleep, nutrition, and gentle movement.");
    }
    
    if (avgStress <= 2) {
      insights.push("Great job managing stress! Your coping strategies are working well.");
    } else if (avgStress >= 4) {
      insights.push("Your stress levels are elevated. Consider practicing breathing exercises or seeking additional support.");
    }
    
    // Activity-based insights
    const topActivity = moodHistory
      .flatMap(day => day.activities)
      .reduce((acc: {[key: string]: number}, activity) => {
        acc[activity] = (acc[activity] || 0) + 1;
        return acc;
      }, {});
    
    const mostFrequent = Object.entries(topActivity).sort(([,a], [,b]) => b - a)[0];
    if (mostFrequent) {
      insights.push(`You engage with '${mostFrequent[0]}' most frequently. Consider how this activity affects your wellbeing.`);
    }
    
    return insights.slice(0, 3); // Return top 3 insights
  };

  const getRecommendations = () => {
    const avgMood = parseFloat(calculateAverage('mood'));
    const avgStress = parseFloat(calculateAverage('stress'));
    
    const recommendations = [];
    
    if (avgStress > 3) {
      recommendations.push({
        title: "Stress Management",
        description: "Try our 5-minute breathing exercise",
        action: "Start Breathing Exercise",
        icon: <Brain className="w-5 h-5" />
      });
    }
    
    if (avgMood < 3.5) {
      recommendations.push({
        title: "Mood Boost",
        description: "Listen to uplifting music or nature sounds",
        action: "Open Music Library",
        icon: <Heart className="w-5 h-5" />
      });
    }
    
    recommendations.push({
      title: "Daily Reflection",
      description: "Write in your wellness diary",
      action: "Start Writing",
      icon: <Star className="w-5 h-5" />
    });
    
    return recommendations.slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mood Report & AI Analysis
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your emotional wellness journey with personalized insights
          </p>
        </div>

        {/* Today's Check-in */}
        <Card className="wellness-card">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-wellness-primary" />
            Today's Mood Check-in
          </h2>
          
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-4">How are you feeling right now?</p>
            <div className="flex gap-3 justify-center">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setTodaysMood(mood.value)}
                  className={`p-4 rounded-full text-4xl transition-all hover:scale-110 ${
                    todaysMood === mood.value 
                      ? 'bg-wellness-primary shadow-soft scale-110' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  title={mood.label}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
            {todaysMood && (
              <p className="text-wellness-primary font-medium mt-3">
                Feeling {moodEmojis.find(m => m.value === todaysMood)?.label} today
              </p>
            )}
          </div>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-1">{calculateAverage('mood')}</h3>
            <p className="text-sm text-muted-foreground mb-2">Average Mood</p>
            <span className={`text-xs px-2 py-1 rounded-full ${
              getTrendDirection('mood') === 'improving' ? 'bg-green-100 text-green-700' :
              getTrendDirection('mood') === 'declining' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {getTrendDirection('mood') === 'improving' ? '↗ Improving' : 
               getTrendDirection('mood') === 'declining' ? '↘ Needs attention' : 
               '→ Stable'}
            </span>
          </Card>

          <Card className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600 mb-1">{calculateAverage('energy')}</h3>
            <p className="text-sm text-muted-foreground mb-2">Energy Level</p>
            <span className={`text-xs px-2 py-1 rounded-full ${
              getTrendDirection('energy') === 'improving' ? 'bg-green-100 text-green-700' :
              getTrendDirection('energy') === 'declining' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {getTrendDirection('energy') === 'improving' ? '↗ Increasing' : 
               getTrendDirection('energy') === 'declining' ? '↘ Decreasing' : 
               '→ Stable'}
            </span>
          </Card>

          <Card className="wellness-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-1">{calculateAverage('stress')}</h3>
            <p className="text-sm text-muted-foreground mb-2">Stress Level</p>
            <span className={`text-xs px-2 py-1 rounded-full ${
              getTrendDirection('stress') === 'improving' ? 'bg-green-100 text-green-700' :
              getTrendDirection('stress') === 'declining' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {getTrendDirection('stress') === 'improving' ? '↗ Improving' : 
               getTrendDirection('stress') === 'declining' ? '↘ Increasing' : 
               '→ Stable'}
            </span>
          </Card>
        </div>

        {/* Weekly Mood Chart */}
        <Card className="wellness-card">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-wellness-secondary" />
            7-Day Mood Trend
          </h2>
          
          <div className="space-y-4">
            {moodHistory.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-muted-foreground">
                  {formatDate(day.date)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-sm">Mood</span>
                    <Progress value={day.mood * 20} className="flex-1 h-2" />
                    <span className="w-8 text-sm text-muted-foreground">{day.mood}/5</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-sm">Energy</span>
                    <Progress value={day.energy * 20} className="flex-1 h-2" />
                    <span className="w-8 text-sm text-muted-foreground">{day.energy}/5</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-sm">Stress</span>
                    <Progress value={day.stress * 20} className="flex-1 h-2" />
                    <span className="w-8 text-sm text-muted-foreground">{day.stress}/5</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {day.activities.map((activity, idx) => (
                    <span key={idx} className="text-xs bg-wellness-muted px-2 py-1 rounded-full">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="wellness-card">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Brain className="w-6 h-6 text-wellness-accent" />
            AI-Powered Insights
          </h2>
          
          <div className="space-y-4">
            {getInsights().map((insight, index) => (
              <div key={index} className="flex gap-3 p-4 bg-wellness-muted rounded-lg">
                <Star className="w-5 h-5 text-wellness-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Personalized Recommendations */}
        <Card className="wellness-card">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Target className="w-6 h-6 text-wellness-primary" />
            Recommended Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getRecommendations().map((rec, index) => (
              <div key={index} className="border border-wellness-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-wellness-primary rounded-full flex items-center justify-center text-white">
                    {rec.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{rec.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  {rec.action}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Summary */}
        <Card className="wellness-card bg-gradient-to-br from-wellness-primary/10 to-wellness-secondary/10">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">This Week's Progress</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You've been actively tracking your wellness for 7 days! Your mood average is {calculateAverage('mood')}/5, 
              and your stress management is showing {getTrendDirection('stress')} trends. 
              Keep up the mindful self-awareness—every small step counts toward your wellbeing journey.
            </p>
          </div>
        </Card>

        {/* Data Note */}
        <Card className="wellness-card bg-blue-50/50 border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            <strong>Note:</strong> To save your mood data permanently and generate personalized AI insights, 
            this app would need to be connected to a backend database with AI processing capabilities. 
            Currently showing demo data for illustration purposes.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MoodPage;