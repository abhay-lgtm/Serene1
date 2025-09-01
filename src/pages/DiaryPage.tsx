import { useState } from "react";
import { Calendar, Clock, Heart, Smile, Frown, Meh, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const DiaryPage = () => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [todaysMood, setTodaysMood] = useState<number | null>(null);
  const [hasWrittenToday, setHasWrittenToday] = useState(false);

  // Sample diary entries (in real app, this would come from backend)
  const [entries] = useState([
    {
      date: "2024-01-15",
      mood: 4,
      entry: "Today was filled with small moments of joy. I noticed the morning light streaming through my window and took a moment to appreciate it. The breathing exercises are really helping me stay centered.",
      question: "What brought you peace today?"
    },
    {
      date: "2024-01-14", 
      mood: 3,
      entry: "I felt a bit overwhelmed with work today, but taking time to write here helps me process my thoughts. I'm grateful for this space to reflect.",
      question: "How did you show kindness to yourself today?"
    },
    {
      date: "2024-01-13",
      mood: 5,
      entry: "Beautiful day! Went for a walk in the park and felt so connected to nature. The meditation session this morning set a wonderful tone for the entire day.",
      question: "What made you smile today?"
    }
  ]);

  const reflectionQuestions = [
    "What brought you peace today?",
    "How did you show kindness to yourself today?",
    "What made you smile today?",
    "What are you grateful for right now?",
    "How did you grow today?",
    "What moment today will you remember?",
    "How did you connect with others today?",
    "What challenged you and how did you handle it?",
    "What beauty did you notice today?",
    "How did you take care of your wellbeing today?"
  ];

  const todaysQuestion = reflectionQuestions[new Date().getDate() % reflectionQuestions.length];

  const moodEmojis = [
    { emoji: "😢", label: "Very Sad", value: 1 },
    { emoji: "😕", label: "Sad", value: 2 },
    { emoji: "😐", label: "Neutral", value: 3 },
    { emoji: "😊", label: "Happy", value: 4 },
    { emoji: "😄", label: "Very Happy", value: 5 }
  ];

  const getMoodIcon = (mood: number) => {
    const icons = [<Frown />, <Frown />, <Meh />, <Smile />, <Star />];
    return icons[mood - 1] || <Meh />;
  };

  const getMoodColor = (mood: number) => {
    const colors = [
      "text-red-400",
      "text-orange-400", 
      "text-yellow-400",
      "text-green-400",
      "text-wellness-primary"
    ];
    return colors[mood - 1] || "text-gray-400";
  };

  const handleSaveEntry = () => {
    if (!currentEntry.trim() || todaysMood === null) return;
    
    // In a real app, this would save to the backend
    console.log("Saving entry:", { entry: currentEntry, mood: todaysMood });
    setHasWrittenToday(true);
    setCurrentEntry("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Daily Digital Diary
          </h1>
          <p className="text-lg text-muted-foreground">
            Your 2-minute daily reflection space for inner peace
          </p>
        </div>

        {/* Today's Entry Section */}
        <Card className="wellness-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Today's Reflection</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(new Date().toISOString().split('T')[0])}
              </p>
            </div>
          </div>

          {!hasWrittenToday ? (
            <div className="space-y-6">
              {/* Today's Question */}
              <div className="bg-wellness-muted p-4 rounded-lg">
                <h3 className="font-semibold text-wellness-primary mb-2">Today's Mindful Question:</h3>
                <p className="text-foreground">{todaysQuestion}</p>
              </div>

              {/* Mood Selector */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">How are you feeling today?</h3>
                <div className="flex gap-3 justify-center">
                  {moodEmojis.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setTodaysMood(mood.value)}
                      className={`p-3 rounded-full text-3xl transition-all hover:scale-110 ${
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
              </div>

              {/* Text Entry */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Your thoughts (take your time):</h3>
                <Textarea
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  placeholder="Let your thoughts flow naturally... There's no wrong way to express yourself here."
                  className="min-h-32 resize-none border-wellness-primary/20 focus:border-wellness-primary"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {currentEntry.length} characters • Aim for just 2 minutes of reflection
                </p>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSaveEntry}
                disabled={!currentEntry.trim() || todaysMood === null}
                className="wellness-button w-full"
              >
                Save Today's Reflection
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-wellness-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Beautiful Work Today!</h3>
              <p className="text-muted-foreground">
                You've completed your daily reflection. Take a moment to appreciate this act of self-care.
              </p>
            </div>
          )}
        </Card>

        {/* Previous Entries */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Clock className="w-6 h-6 text-wellness-primary" />
            Your Reflection Journey
          </h2>
          
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <Card key={index} className="wellness-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{formatDate(entry.date)}</p>
                    <p className="text-sm text-wellness-primary italic">"{entry.question}"</p>
                  </div>
                  <div className={`flex items-center gap-2 ${getMoodColor(entry.mood)}`}>
                    {getMoodIcon(entry.mood)}
                    <span className="text-sm font-medium">Mood: {entry.mood}/5</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{entry.entry}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Inspiration */}
        <Card className="wellness-card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-wellness-secondary to-wellness-accent rounded-full mx-auto mb-4 flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Daily Reminder</h3>
          <p className="text-muted-foreground">
            "Every day is a new opportunity to nurture your inner peace. Your thoughts and feelings are valid, 
            and taking time to reflect is a beautiful gift you give yourself."
          </p>
        </Card>

        {/* Note about data persistence */}
        <Card className="wellness-card bg-blue-50/50 border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            <strong>Note:</strong> To save your diary entries permanently and access them across devices, 
            this app would need to be connected to a backend database. Currently, entries are stored locally for demo purposes.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DiaryPage;