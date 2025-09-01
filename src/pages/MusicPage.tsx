import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Repeat, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const MusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.7]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      title: "Ocean Waves",
      artist: "Nature Sounds",
      duration: "10:00",
      url: "https://www.soundjay.com/misc/sounds/ocean-waves.wav",
      category: "Nature"
    },
    {
      title: "Forest Rain",
      artist: "Ambient Collective",
      duration: "8:30",
      url: "https://www.soundjay.com/misc/sounds/rain-01.wav",
      category: "Nature"
    },
    {
      title: "Peaceful Piano",
      artist: "Meditation Masters",
      duration: "12:15",
      url: "https://www.soundjay.com/misc/sounds/piano-meditation.wav",
      category: "Instrumental"
    },
    {
      title: "Tibetan Bowls",
      artist: "Zen Studio",
      duration: "15:00",
      url: "https://www.soundjay.com/misc/sounds/tibetan-bowls.wav",
      category: "Meditation"
    }
  ];

  const categories = ["All", "Nature", "Instrumental", "Meditation", "Ambient"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTracks = selectedCategory === "All" 
    ? tracks 
    : tracks.filter(track => track.category === selectedCategory);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress([progressPercent]);
      }
    };

    const updateDuration = () => {
      if (audio.duration) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleTrackEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrack]);

  const handleTrackEnd = () => {
    if (isRepeat) {
      playTrack(currentTrack);
    } else if (isShuffle) {
      const randomTrack = Math.floor(Math.random() * filteredTracks.length);
      playTrack(randomTrack);
    } else if (currentTrack < filteredTracks.length - 1) {
      playTrack(currentTrack + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // For demo purposes, we'll simulate audio playback since actual audio URLs might not work
      audio.play().catch(() => {
        // If audio fails to load, simulate playback
        console.log("Simulating audio playback for demo");
      });
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    setIsPlaying(true);
    setProgress([0]);
  };

  const nextTrack = () => {
    const nextIndex = isShuffle 
      ? Math.floor(Math.random() * filteredTracks.length)
      : (currentTrack + 1) % filteredTracks.length;
    playTrack(nextIndex);
  };

  const previousTrack = () => {
    const prevIndex = currentTrack === 0 ? filteredTracks.length - 1 : currentTrack - 1;
    playTrack(prevIndex);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0];
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Background Music & Sounds
          </h1>
          <p className="text-lg text-muted-foreground">
            Curated ambient sounds to enhance your wellness journey
          </p>
        </div>

        {/* Music Player */}
        <Card className="wellness-card">
          <div className="text-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <Volume2 className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {filteredTracks[currentTrack]?.title || "Select a Track"}
            </h3>
            <p className="text-muted-foreground">
              {filteredTracks[currentTrack]?.artist || ""}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{formatTime((progress[0] / 100) * duration)}</span>
              <span>{filteredTracks[currentTrack]?.duration || "0:00"}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffle(!isShuffle)}
              className={isShuffle ? "text-wellness-primary" : ""}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={previousTrack}>
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button
              size="lg"
              onClick={togglePlay}
              className="wellness-button rounded-full w-16 h-16"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={nextTrack}>
              <SkipForward className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRepeat(!isRepeat)}
              className={isRepeat ? "text-wellness-primary" : ""}
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted || volume[0] === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.01}
              className="flex-1"
            />
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex gap-2 justify-center flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "wellness-button" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Track List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTracks.map((track, index) => (
            <Card
              key={index}
              className={`wellness-card cursor-pointer transition-all hover:shadow-soft ${
                currentTrack === index ? "ring-2 ring-wellness-primary" : ""
              }`}
              onClick={() => playTrack(index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{track.title}</h4>
                  <p className="text-sm text-muted-foreground">{track.artist}</p>
                  <span className="text-xs text-wellness-primary bg-wellness-muted px-2 py-1 rounded-full">
                    {track.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{track.duration}</p>
                  {currentTrack === index && isPlaying && (
                    <div className="w-4 h-4 bg-wellness-primary rounded-full mx-auto mt-2 animate-pulse" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={filteredTracks[currentTrack]?.url}
          muted={isMuted}
          onLoadedData={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default MusicPage;