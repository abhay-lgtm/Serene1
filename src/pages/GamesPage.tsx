import { useState } from "react";
import { RotateCcw, Trophy, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const GamesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Relaxation Games
          </h1>
          <p className="text-lg text-muted-foreground">
            Calming activities designed to reduce stress and promote mindfulness
          </p>
        </div>

        {/* Game Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <GameCard
            title="Zen Tic-Tac-Toe"
            description="A peaceful twist on the classic game"
            icon={<Trophy className="w-8 h-8" />}
            gameComponent={<TicTacToe />}
          />
          <GameCard
            title="Breathing Bubbles"
            description="Pop bubbles in rhythm with your breath"
            icon={<Star className="w-8 h-8" />}
            gameComponent={<BreathingBubbles />}
          />
          <GameCard
            title="Memory Garden"
            description="Cultivate mindfulness through memory"
            icon={<Clock className="w-8 h-8" />}
            gameComponent={<MemoryGame />}
          />
        </div>
      </div>
    </div>
  );
};

const GameCard = ({ title, description, icon, gameComponent }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gameComponent: React.ReactNode;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="wellness-card">
      {!isPlaying ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <Button 
            onClick={() => setIsPlaying(true)}
            className="wellness-button w-full"
          >
            Start Game
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(false)}
            >
              Back to Games
            </Button>
          </div>
          {gameComponent}
        </div>
      )}
    </Card>
  );
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index: number) => (
    <button
      key={index}
      className="w-16 h-16 bg-white border-2 border-wellness-primary rounded-lg font-bold text-2xl text-wellness-primary hover:bg-wellness-muted transition-colors"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="text-center">
      {winner ? (
        <div className="mb-4">
          <p className="text-lg font-semibold text-wellness-primary mb-2">
            🎉 Player {winner} wins! 🎉
          </p>
        </div>
      ) : (
        <p className="text-lg font-medium text-foreground mb-4">
          Player {isXNext ? 'X' : 'O'}'s turn
        </p>
      )}
      
      <div className="grid grid-cols-3 gap-2 mb-4 justify-center">
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
      </div>
      
      <Button
        onClick={resetGame}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 mx-auto"
      >
        <RotateCcw className="w-4 h-4" />
        New Game
      </Button>
    </div>
  );
};

const BreathingBubbles = () => {
  const [bubbles, setBubbles] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);

  const generateBubble = () => {
    const newBubble = Date.now();
    setBubbles(prev => [...prev, newBubble]);
    
    // Remove bubble after 3 seconds
    setTimeout(() => {
      setBubbles(prev => prev.filter(id => id !== newBubble));
    }, 3000);
  };

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubbleId => bubbleId !== id));
    setScore(prev => prev + 1);
  };

  const startBreathingSession = () => {
    setIsBreathing(true);
    setScore(0);
    setBubbles([]);

    // Generate bubbles every 2 seconds for breathing rhythm
    const interval = setInterval(generateBubble, 2000);
    
    // Stop after 30 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsBreathing(false);
    }, 30000);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <p className="text-lg font-medium text-foreground mb-2">Score: {score}</p>
        {isBreathing && (
          <p className="text-sm text-muted-foreground">
            Breathe in... breathe out... pop the bubbles mindfully
          </p>
        )}
      </div>

      <div className="relative h-40 bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg mb-4 overflow-hidden">
        {bubbles.map((id, index) => (
          <div
            key={id}
            className="absolute w-8 h-8 bg-blue-300 rounded-full cursor-pointer hover:bg-blue-400 transition-colors animate-pulse"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 70}%`,
              animationDuration: '2s'
            }}
            onClick={() => popBubble(id)}
          />
        ))}
      </div>

      {!isBreathing ? (
        <Button
          onClick={startBreathingSession}
          className="wellness-button"
        >
          Start Breathing Session (30s)
        </Button>
      ) : (
        <p className="text-wellness-primary font-medium">Session in progress...</p>
      )}
    </div>
  );
};

const MemoryGame = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const symbols = ['🌸', '🍃', '🌺', '🦋', '🌙', '⭐', '🌻', '🌿'];

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameStarted(true);
  };

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched(prev => [...prev, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isGameComplete = matched.length === cards.length && cards.length > 0;

  return (
    <div className="text-center">
      {!gameStarted ? (
        <div>
          <p className="text-muted-foreground mb-4">
            Match pairs of symbols to cultivate mindfulness and memory
          </p>
          <Button onClick={initializeGame} className="wellness-button">
            Start Memory Garden
          </Button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-lg font-medium text-foreground">Moves: {moves}</p>
            {isGameComplete && (
              <p className="text-wellness-primary font-semibold">
                🎉 Garden Complete! Well done! 🎉
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {cards.map((symbol, index) => (
              <button
                key={index}
                className="w-12 h-12 bg-white border-2 border-wellness-primary rounded-lg text-xl hover:bg-wellness-muted transition-colors"
                onClick={() => handleCardClick(index)}
              >
                {flipped.includes(index) || matched.includes(index) ? symbol : '🌱'}
              </button>
            ))}
          </div>

          <Button
            onClick={initializeGame}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            New Garden
          </Button>
        </div>
      )}
    </div>
  );
};

export default GamesPage;