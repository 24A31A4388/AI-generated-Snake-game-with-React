import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { Track } from '../types';

interface MusicPlayerProps {
  tracks: Track[];
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks }) => {
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    togglePlay,
    playNext,
    playPrev,
    setVolume,
    seek,
  } = useMusicPlayer(tracks);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black border-4 border-[#00fff9] p-6 shadow-[0_0_40px_rgba(0,255,249,0.2)] relative overflow-hidden group">
      {/* Glitchy background effect */}
      <div className="absolute inset-0 bg-[#ff00c1]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex flex-col mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-[#00fff9] tracking-tighter drop-shadow-[0_0_8px_#00fff9] glitch-effect" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <div className="text-[8px] text-[#ff00c1] font-mono">
            ID: {currentTrack.id.padStart(4, '0')}
          </div>
        </div>
        <p className="text-[10px] text-[#ff00c1] font-sans mt-1 uppercase">
          SOURCE: {currentTrack.artist}
        </p>
        
        {/* Audio Visualizer Mock */}
        <div className="flex gap-2 items-end h-12 mt-4 border-b-2 border-[#00fff9]/20 pb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
            <div
              key={bar}
              className={`flex-1 bg-[#ff00c1] shadow-[0_0_8px_#ff00c1] transition-all duration-100 ${
                isPlaying ? 'animate-pulse' : 'h-1'
              }`}
              style={{
                height: isPlaying ? `${Math.random() * 100}%` : '4px',
                animationDelay: `${bar * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-4 bg-black border-2 border-[#00fff9] appearance-none cursor-pointer accent-[#ff00c1] shadow-[0_0_10px_#00fff9]"
        />
        <div className="flex justify-between mt-4 text-[8px] font-sans text-[#00fff9]">
          <span>POS: {formatTime(progress)}</span>
          <span>LEN: {formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={playPrev}
            className="p-2 border-2 border-[#ff00c1] text-[#ff00c1] hover:bg-[#ff00c1] hover:text-black transition-all active:translate-y-0.5"
          >
            <SkipBack size={16} />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-4 bg-transparent border-4 border-[#00fff9] text-[#00fff9] shadow-[0_0_20px_#00fff9] hover:bg-[#00fff9] hover:text-black transition-all active:scale-95"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          
          <button
            onClick={playNext}
            className="p-2 border-2 border-[#ff00c1] text-[#ff00c1] hover:bg-[#ff00c1] hover:text-black transition-all active:translate-y-0.5"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-[8px] text-[#00fff9] mb-1">GAIN_LEVEL</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
              className="text-[#ff00c1] hover:text-[#00fff9] transition-colors"
            >
              {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-2 bg-black border border-[#00fff9] appearance-none cursor-pointer accent-[#ff00c1]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
