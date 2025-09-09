/**
 * Thor to The Rescue
 * File: src/app/play/thor-to-the-rescue/page.js
 */

'use client';

import { useState } from 'react';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/src/app/components/Navbar';

export default function ThorGamePage() {
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  // Game data from your PDF
  const gameData = {
    title: 'Thor to The Rescue',
    shortDescription:
      'An action game where you storm the vet to rescue dogs and fight guards, complete with a final riddle.',
    description: `You're Thor, a motorbike-riding Rottweiler on a high-stakes mission to break into a shady vet clinic and rescue caged pups. Use your bark to blast guards, duck under danger, and jump your way through this bite-sized action platformer.

Built in just 3 hours during Voyager Vibe Jam, Thor to The Rescue is a chaotic, heartfelt micro-adventure with satirical feel and way too many dog sounds.`,
    genre: 'Action',
    tags: [
      '2d',
      'action',
      'arcade',
      'comedy',
      'dogs',
      'funny',
      'platformer',
      'puzzle',
      'short',
      'satire',
    ],
    controls: [
      { action: 'Move', keys: 'W / D or ← / →' },
      { action: 'Duck', keys: 'S or ↓' },
      { action: 'Jump', keys: 'Space' },
      {
        action: 'Bark Attack',
        keys: 'Left Click (attacks in front)',
      },
    ],
    screenshots: [
      '/games/thor/Screenshots/1.webp',
      '/games/thor/Screenshots/2.webp',
      '/games/thor/Screenshots/3.webp',
      '/games/thor/Screenshots/4.webp',
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
                src="/games/thor/index.html"
                style={{
                  width: '100%',
                  height: '80vh', // Use viewport height instead of fixed pixels
                  minHeight: '600px',
                  border: 'none',
                  borderRadius: '8px',
                  display: 'block',
                }}
                title="Thor to The Rescue"
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
