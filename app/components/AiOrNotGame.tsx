"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";

// Lists of real and AI-generated images
const realImages = [
  "/real-image-1.jpg",
  "/real-image-2.jpg",
  "/real-image-3.jpg",
  "/real-image-4.jpg",
  "/real-image-5.jpg",
  "/real-image-6.jpg",
  "/real-image-7.jpg",
  "/real-image-8.jpg",
  "/real-image-9.jpg",
  "/real-image-10.jpg",
];

const aiImages = [
  "/ai-image-1.jpg",
  "/ai-image-2.jpg",
  "/ai-image-3.jpg",
  "/ai-image-4.jpg",
  "/ai-image-5.jpg",
  "/ai-image-6.jpg",
  "/ai-image-7.jpg",
  "/ai-image-8.jpg",
  "/ai-image-9.jpg",
  "/ai-image-10.jpg",
];

export default function AiOrNotGame() {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Shuffle arrays and create rounds
  const rounds = useMemo(() => {
    const shuffledReal = [...realImages].sort(() => Math.random() - 0.5);
    const shuffledAI = [...aiImages].sort(() => Math.random() - 0.5);
    return shuffledReal.slice(0, 10).map((realImage, index) => ({
      realImage,
      aiImage: shuffledAI[index],
      aiIsLeft: Math.random() < 0.5,
    }));
  }, []);

  const handleChoice = useCallback((choiceIsLeft: boolean) => {
    if (choiceIsLeft === rounds[currentRound].aiIsLeft) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentRound === 9) {
      setGameOver(true);
    } else {
      setCurrentRound((prevRound) => prevRound + 1);
    }
  }, [currentRound, rounds]);

  if (gameOver) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl mb-4">Your score: {score} / 10</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setCurrentRound(0);
            setScore(0);
            setGameOver(false);
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  const round = rounds[currentRound];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Round {currentRound + 1} / 10</h2>
      <div className="flex justify-between mb-4">
        <div className="w-[48%]">
          <Image
            src={round.aiIsLeft ? round.aiImage : round.realImage}
            alt="Image 1"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
          <button
            className="btn btn-primary w-full mt-2"
            onClick={() => handleChoice(true)}
          >
            This is AI
          </button>
        </div>
        <div className="w-[48%]">
          <Image
            src={round.aiIsLeft ? round.realImage : round.aiImage}
            alt="Image 2"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
          <button
            className="btn btn-primary w-full mt-2"
            onClick={() => handleChoice(false)}
          >
            This is AI
          </button>
        </div>
      </div>
      <p className="text-xl">Current Score: {score}</p>
    </div>
  );
}
