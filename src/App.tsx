/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Track } from './types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'The Wires',
    artist: 'Elephants Dream',
    url: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3',
  },
  {
    id: '2',
    title: 'Snow Fight',
    artist: 'Sintel',
    url: 'https://storage.googleapis.com/media-session/sintel/snow-fight.mp3',
  },
  {
    id: '3',
    title: 'Prelude',
    artist: 'Big Buck Bunny',
    url: 'https://storage.googleapis.com/media-session/big-buck-bunny/prelude.mp3',
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#00fff9] font-sans selection:bg-[#ff00c1]/40 overflow-hidden flex flex-col relative">
      <div className="crt-overlay" />
      
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10"
           style={{
             backgroundImage: 'linear-gradient(to right, #00fff9 1px, transparent 1px), linear-gradient(to bottom, #00fff9 1px, transparent 1px)',
             backgroundSize: '32px 32px',
           }}
      />

      {/* Header */}
      <header className="relative z-10 p-8 flex justify-center items-center border-b-4 border-[#ff00c1] bg-[#050505]">
        <h1 
          className="text-4xl md:text-6xl font-glitch tracking-tighter text-[#00fff9] glitch-effect screen-tear"
          data-text="NEON_ERROR_SNAKE"
        >
          NEON_ERROR_SNAKE
        </h1>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 p-4 md:p-12 max-w-7xl mx-auto w-full">
        {/* Game Area */}
        <div className="flex-1 w-full flex justify-center items-center">
          <SnakeGame />
        </div>

        {/* Music Player Area */}
        <div className="w-full lg:w-[420px] flex-shrink-0">
          <MusicPlayer tracks={DUMMY_TRACKS} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-4 text-center text-[#ff00c1] text-[10px] font-mono border-t-4 border-[#00fff9] bg-[#050505]">
        SYSTEM_VERSION_2.5 // {new Date().getFullYear()} // ACCESS_GRANTED
      </footer>
    </div>
  );
}
