import React from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { Headphones, Circle, Music, Trophy, Gamepad2, Play, Pause } from 'lucide-react';

export const SnakeGame: React.FC = () => {
  const {
    snake,
    food,
    gameOver,
    score,
    isPaused,
    hasStarted,
    resetGame,
    GRID_SIZE,
  } = useSnakeGame();

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
        const isHead = snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;

        let cellContent = null;
        let cellClass = 'aspect-square border border-[#00fff9]/10 rounded-none transition-all duration-75 flex items-center justify-center';
        
        if (isHead) {
          cellClass += ' z-10 relative bg-[#00fff9]/30 shadow-[0_0_10px_#00fff9]';
          cellContent = <Headphones className="w-full h-full text-[#00fff9] drop-shadow-[0_0_4px_#00fff9] p-0.5" fill="currentColor" />;
        } else if (isSnake) {
          cellClass += ' opacity-80 bg-[#00fff9]/10 shadow-[0_0_5px_#00fff9]';
          cellContent = <Circle className="w-2/3 h-2/3 text-[#00fff9] drop-shadow-[0_0_2px_#00fff9]" fill="currentColor" />;
        } else if (isFood) {
          cellClass += ' animate-pulse bg-[#ff00c1]/30 shadow-[0_0_15px_#ff00c1]';
          cellContent = <Music className="w-full h-full text-[#ff00c1] drop-shadow-[0_0_6px_#ff00c1] p-0.5" fill="currentColor" />;
        } else {
          cellClass += ' bg-black/40';
        }

        grid.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {cellContent}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between w-full mb-8 px-4 items-center gap-4">
        <div className="flex items-center gap-4 text-xl md:text-2xl font-sans text-[#00fff9] drop-shadow-[0_0_8px_#00fff9]">
          <Trophy className="w-6 h-6 md:w-8 md:h-8" />
          <span>DATA_POINTS: {score.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-sans text-[#ff00c1]">
          {isPaused ? (
            <>
              <Pause className="w-4 h-4 text-[#ff00c1] drop-shadow-[0_0_8px_#ff00c1]" />
              <span className="text-[#ff00c1] drop-shadow-[0_0_8px_#ff00c1]">PROCESS_HALTED</span>
            </>
          ) : hasStarted ? (
            <>
              <Play className="w-4 h-4 text-[#00fff9] drop-shadow-[0_0_8px_#00fff9]" />
              <span className="text-[#00fff9] drop-shadow-[0_0_8px_#00fff9]">EXECUTION_ACTIVE</span>
            </>
          ) : (
            <>
              <Gamepad2 className="w-4 h-4 text-[#ff00c1] drop-shadow-[0_0_8px_#ff00c1]" />
              <span className="text-[#ff00c1] drop-shadow-[0_0_8px_#ff00c1]">SYSTEM_STANDBY</span>
            </>
          )}
        </div>
      </div>

      <div className="relative p-4 bg-black border-4 border-[#ff00c1] shadow-[0_0_40px_rgba(255,0,193,0.3)] w-full max-w-[500px] aspect-square overflow-hidden">
        <div
          className="grid gap-[1px] bg-[#00fff9]/10 p-1 w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {renderGrid()}
        </div>

        {/* Overlays */}
        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 p-8 text-center">
            <h2 
              className="text-2xl md:text-3xl font-glitch text-[#ff00c1] mb-8 glitch-effect"
              data-text="INITIALIZE_SEQUENCE"
            >
              INITIALIZE_SEQUENCE
            </h2>
            <p className="text-[#00fff9] font-sans text-[10px] animate-pulse leading-relaxed">
              INPUT_REQUIRED: STRIKE_ANY_DIRECTIONAL_KEY
            </p>
          </div>
        )}

        {isPaused && !gameOver && hasStarted && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <h2 className="text-2xl font-bold text-[#ff00c1] tracking-tighter drop-shadow-[0_0_15px_#ff00c1] glitch-effect" data-text="HALT_COMMAND">
              HALT_COMMAND
            </h2>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-30 p-8 text-center">
            <h2 
              className="text-4xl md:text-5xl font-glitch text-[#ff00c1] mb-4 glitch-effect"
              data-text="CRITICAL_FAILURE"
            >
              CRITICAL_FAILURE
            </h2>
            <p className="text-lg text-[#00fff9] font-sans mb-8 drop-shadow-[0_0_8px_#00fff9]">
              FINAL_YIELD: {score}
            </p>
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-transparent border-4 border-[#00fff9] text-[#00fff9] font-bold hover:bg-[#00fff9] hover:text-black transition-all duration-100 shadow-[0_0_20px_#00fff9] active:translate-y-1"
            >
              REBOOT_SYSTEM
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-12 text-[8px] text-[#ff00c1]/60 font-sans flex flex-col md:flex-row gap-6 tracking-widest">
        <span>[WASD_ARROWS] NAVIGATE</span>
        <span>[SPACE] INTERRUPT</span>
      </div>
    </div>
  );
};
