/**
 * Dropout Game Page
 * File: src/app/play/dropout/page.js
 */

'use client';

import { useState } from 'react';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/src/app/components/Navbar';

export default function DropoutGamePage() {
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  // Game data - FILL THIS IN WITH YOUR GAME INFO
  const gameData = {
    title: 'Dropout', // Replace with your actual game title
    shortDescription:
      'Sneak your drone out of school to collect the contraband!', // Add your tagline
    description: `Sneak your drone out of school to collect the contraband!

Dropout is a stealth game where you control a drone to fly through a small town, avoiding detection by teachers, police and the locals, whilst collecting items you're not allowed in school. The game features simple controls to get around, just collect all 10 green packages and drop them at the red zone in-front of the school.

Built in just 3 hours during Voyager Vibe Jam under high-pressure! Explore the world drawn up by Georgia, fleeing the bullets coded by Anthony.`, // Replace with your game's story
    genre: 'Action, Stealth', // e.g., Puzzle, Action, Adventure, etc.
    tags: ['Action', 'Stealth', 'Unity', 'vibe-jam', '2d', 'short'], // Replace with your game's tags
    controls: [
      { action: 'Move', keys: 'Arrow Keys / WASD' }, // Replace with your actual controls
      { action: 'Pick up / Drop', keys: 'E' },
      { action: 'Restart', keys: 'R' },
      { action: 'Rage Quit', keys: 'Ctrl + W' },
    ],
    screenshots: [
      '/games/dropout/Screenshots/1.png?',
      '/games/dropout/Screenshots/2.png?',
      '/games/dropout/Screenshots/3.png?',
      '/games/dropout/Screenshots/4.png?',
    ],
  };

  return (
    <div className="min-h-screen bg-darkBg">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-gray-400 text-sm">
          <Link href="/play" className="hover:text-primary">
            Play
          </Link>
          <span className="mx-2">›</span>
          <span className="text-white">{gameData.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Game */}
          <div className="lg:col-span-2">
            {/* Unity Game - Proper iframe with no constraints */}
            <div className="mb-6 bg-white p-2 rounded-lg">
              <iframe
                src="/games/dropout/index.html"
                style={{
                  width: '100%',
                  height: '80vh', // Use viewport height instead of fixed pixels
                  minHeight: '600px',
                  border: 'none',
                  borderRadius: '8px',
                  display: 'block',
                }}
                title="Dropout"
                allowFullScreen
              />
            </div>

            {/* Controls Info */}
            <Card className="bg-gray-900">
              <CardBody className="p-4">
                <h4 className="text-white font-semibold mb-3">
                  Controls
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {gameData.controls.map((control, index) => (
                    <div key={index} className="text-gray-300">
                      <span className="text-primary font-mono">
                        {control.keys}
                      </span>{' '}
                      - {control.action}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Screenshots */}
            <Card className="bg-gray-900 mt-6">
              <CardBody className="p-4">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Screenshots
                </h3>

                {/* Main Screenshot */}
                <div className="mb-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={gameData.screenshots[selectedScreenshot]}
                      alt={`Screenshot ${selectedScreenshot + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Screenshot Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {gameData.screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedScreenshot(index)}
                      className={`relative aspect-video rounded overflow-hidden border-2 transition-all ${
                        selectedScreenshot === index
                          ? 'border-primary'
                          : 'border-gray-700'
                      }`}
                    >
                      <Image
                        src={screenshot}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Game Info */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900">
              <CardBody className="p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {gameData.title}
                  </h1>
                  <p className="text-gray-300">
                    {gameData.shortDescription}
                  </p>
                </div>

                {/* Game Info */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Genre
                    </h4>
                    <p className="text-gray-300">{gameData.genre}</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Made for
                    </h4>
                    <p className="text-gray-300">Voyager Vibe Jam</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Development Time
                    </h4>
                    <p className="text-gray-300">3 hours</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">
                    About This Game
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {gameData.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {gameData.tags.map((tag) => (
                      <Chip
                        key={tag}
                        size="sm"
                        variant="flat"
                        color="primary"
                        className="text-xs"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
                {/* Vote Now Button */}
                <div className="mb-4">
                  <Button
                    onClick={() =>
                      window.open(
                        'https://form.jotform.com/252023824516047',
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                    className="w-full bg-accent hover:bg-primary text-white font-semibold"
                    startContent={<span>🗳️</span>}
                  >
                    Vote Now
                  </Button>
                </div>
                {/* Back Button */}
                <Button
                  as={Link}
                  href="/play"
                  className="w-full bg-primary hover:bg-accent text-white font-semibold"
                  startContent={<span>←</span>}
                >
                  Back to Play
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
TO DO - FILL IN YOUR GAME INFO:

1. gameData.title - Replace 'Dropout' with your actual game name
2. gameData.shortDescription - Add your game's tagline
3. gameData.description - Write your full game description  
4. gameData.genre - Replace with actual genre
5. gameData.tags - Replace with your game's tags
6. gameData.controls - Update with your actual game controls
*/
