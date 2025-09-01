import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings } from 'lucide-react';

const MeditationComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(600);
  const [selectedSession, setSelectedSession] = useState('breathing');
  const [showSettings, setShowSettings] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(4);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [voiceRate, setVoiceRate] = useState(0.8);
  
  const intervalRef = useRef(null);
  const breathingIntervalRef = useRef(null);

  const meditationSessions = {
    breathing: {
      name: 'Breathing Focus',
      description: 'AI-guided breathing exercises with real-time feedback',
      duration: 600,
      color: 'bg-blue-50'
    },
    mindfulness: {
      name: 'Mindfulness',
      description: 'Present moment awareness with gentle guidance',
      duration: 900,
      color: 'bg-green-50'
    },
    sleep: {
      name: 'Sleep Preparation',
      description: 'Calming session to prepare for restful sleep',
      duration: 1200,
      color: 'bg-purple-50'
    },
    stress: {
      name: 'Stress Relief',
      description: 'AI-powered stress reduction techniques',
      duration: 480,
      color: 'bg-orange-50'
    }
  };

  const aiGuidanceTexts = {
    breathing: {
      inhale: "Breathe in slowly... Let the air fill your lungs completely",
      exhale: "Now breathe out gently... Release all tension",
      hold: "Hold this breath... Feel the stillness within"
    },
    mindfulness: [
      "Notice the sensations in your body without judgment",
      "Observe your thoughts as they come and go like clouds",
      "Bring your attention back to the present moment",
      "Feel the connection between your mind and body"
    ],
    sleep: [
      "Let your body sink deeper into relaxation",
      "Release the events of today with each breath",
      "Feel peace washing over you like gentle waves",
      "Allow your mind to drift toward peaceful rest"
    ],
    stress: [
      "Acknowledge your stress without resistance",
      "Breathe out the tension you've been carrying",
      "Find calm in this moment of stillness",
      "Let go of what you cannot control"
    ]
  };

  // Voice guidance function
  const speakGuidance = (text) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceRate * 0.7; // Slower, more calming
    utterance.pitch = 0.6; // Lower, more soothing pitch
    utterance.volume = 0.8; // Clear volume for voice
    
    // Try to find the most natural, calm voice available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Natural') ||
      voice.name.includes('Enhanced') ||
      voice.name.includes('Premium') ||
      voice.name.includes('Google') ||
      voice.name.includes('Microsoft') ||
      (voice.lang.includes('en') && voice.name.includes('Female'))
    ) || voices.find(voice => voice.lang.includes('en-US')) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Add pauses for more natural delivery
    utterance.text = text.replace(/\.\.\./g, '... ').replace(/\./g, '. ');
    
    window.speechSynthesis.speak(utterance);
  };

  // Breathing animation controller
  useEffect(() => {
    if (isPlaying && selectedSession === 'breathing') {
      breathingIntervalRef.current = setInterval(() => {
        setBreathingCount(prev => {
          if (prev <= 1) {
            setBreathingPhase(currentPhase => {
              if (currentPhase === 'inhale') return 'hold';
              if (currentPhase === 'hold') return 'exhale';
              return 'inhale';
            });
            return breathingPhase === 'hold' ? 2 : 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    }

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [isPlaying, selectedSession, breathingPhase]);

  // Session timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    if (isPlaying && isVoiceEnabled) {
      // Initial welcome message - delayed to let user settle
      if (currentTime === 3) {
        const welcomeText = `Welcome to your ${meditationSessions[selectedSession].name} session. Find a comfortable position and let's begin.`;
        speakGuidance(welcomeText);
      }
      
      // Periodic guidance during session
      if (currentTime > 0 && currentTime % 45 === 0 && currentTime < duration - 45) {
        const guidanceText = getAIGuidance();
        speakGuidance(guidanceText);
      }
      
      // Breathing phase guidance - only on phase transitions
      if (selectedSession === 'breathing' && breathingCount === 4) {
        if (breathingPhase === 'inhale' && currentTime % 12 === 0) {
          speakGuidance("Breathe in slowly and deeply");
        } else if (breathingPhase === 'exhale' && currentTime % 12 === 6) {
          speakGuidance("Now breathe out gently");
        }
      }
      
      // Gentle closing message
      if (currentTime === duration - 15) {
        speakGuidance("Your session is almost complete. Take these final moments to appreciate your practice.");
      }
    }
  }, [currentTime, isPlaying, isVoiceEnabled, selectedSession, breathingPhase, breathingCount]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setBreathingPhase('inhale');
    setBreathingCount(4);
    window.speechSynthesis.cancel();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAIGuidance = () => {
    if (selectedSession === 'breathing') {
      return aiGuidanceTexts.breathing[breathingPhase];
    } else {
      const phrases = aiGuidanceTexts[selectedSession];
      const index = Math.floor((currentTime / 30) % phrases.length);
      return phrases[index];
    }
  };

  const getBreathingCircleSize = () => {
    const baseSize = 120;
    const expansion = breathingPhase === 'inhale' ? 40 : breathingPhase === 'hold' ? 20 : 0;
    return baseSize + expansion;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 via-white to-green-100 shadow-lg border-b-2 border-blue-200 px-10 py-6 rounded-b-3xl">
        <div className="bg-gradient-to-r from-blue-100 via-white to-green-100 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-400 tracking-tight">
            AI <span className="text-green-400">Meditation</span>
          </span>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-blue-100 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Guidance
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isVoiceEnabled}
                    onChange={(e) => setIsVoiceEnabled(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Enable Voice</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.2"
                  step="0.1"
                  value={voiceRate}
                  onChange={(e) => setVoiceRate(Number(e.target.value))}
                  className="flex-1"
                  disabled={!isVoiceEnabled}
                  title="Voice Speed"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md bg-white"
              >
                <option value={300}>5 minutes</option>
                <option value={600}>10 minutes</option>
                <option value={900}>15 minutes</option>
                <option value={1200}>20 minutes</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Session Selection */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6 tracking-wide bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-xl py-3 shadow-sm px-5">
           Choose Your Session
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md">
          {Object.entries(meditationSessions).map(([key, session]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedSession(key);
                setDuration(session.duration);
                handleReset();
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedSession === key
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <h3 className="font-medium text-gray-800 mb-1">{session.name}</h3>
              <p className="text-sm text-gray-600">{session.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Meditation Interface */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Breathing Visualization (for breathing session) */}
        {selectedSession === 'breathing' && (
          <div className="mb-8 flex flex-col items-center">
            <div
              className="rounded-full bg-gradient-to-br from-blue-200 to-blue-300 transition-all duration-1000 ease-in-out flex items-center justify-center"
              style={{
                width: `${getBreathingCircleSize()}px`,
                height: `${getBreathingCircleSize()}px`
              }}
            >
              <div className="text-white font-medium text-lg">
                {breathingPhase.toUpperCase()}
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-3xl font-light text-gray-800">{breathingCount}</div>
              <div className="text-sm text-gray-600 mt-1">
                {breathingPhase === 'inhale' ? 'Breathe In' : 
                 breathingPhase === 'hold' ? 'Hold' : 'Breathe Out'}
              </div>
            </div>
          </div>
        )}

        {/* General Meditation Visualization (for other sessions) */}
        {selectedSession !== 'breathing' && (
          <div className="mb-8 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center animate-pulse">
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-50"></div>
            </div>
          </div>
        )}

        {/* AI Guidance Text */}
        <div className="max-w-md text-center mb-8">
          <p className="text-lg text-gray-700 font-light leading-relaxed">
            {isPlaying ? getAIGuidance() : "Select a session and press play to begin your guided meditation"}
          </p>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="text-4xl font-light text-gray-800 mb-2">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Toggle Voice Guidance"
          >
            {isVoiceEnabled ? (
              <Volume2 className="w-6 h-6 text-gray-600" />
            ) : (
              <VolumeX className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Session Info */}
        <div className="mt-8 text-center max-w-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {meditationSessions[selectedSession].name}
          </h3>
          <p className="text-sm text-gray-600">
            {meditationSessions[selectedSession].description}
          </p>
        </div>
      </div>



      {/* AI Insights Panel */}
      {currentTime > 60 && isPlaying && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <div className="text-xs text-blue-600 font-medium mb-1">AI INSIGHT</div>
          <p className="text-sm text-gray-700">
            Your breathing rhythm is becoming more steady. Great progress!
          </p>
        </div>
      )}

      {/* Session Complete Modal */}
      {currentTime >= duration && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Session Complete!</h3>
            <p className="text-gray-600 mb-6">
              You've completed your {meditationSessions[selectedSession].name} session. 
              How do you feel?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                New Session
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Log Mood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeditationComponent;