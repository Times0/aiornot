"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleChoice = useCallback(
    (choiceIsLeft: boolean) => {
      if (choiceIsLeft === rounds[currentRound].aiIsLeft) {
        setScore((prevScore) => prevScore + 1);
      }

      if (currentRound === 9) {
        setGameOver(true);
      } else {
        setCurrentRound((prevRound) => prevRound + 1);
      }
    },
    [currentRound, rounds]
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        Round {currentRound + 1} / 10
      </h2>
      <AnimatePresence mode="wait">
        {gameOver ? (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center bg-secondary p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl mb-6">Your score: {score} / 10</p>
            <button
              className="btn btn-primary text-xl px-8 py-3"
              onClick={() => {
                setCurrentRound(0);
                setScore(0);
                setGameOver(false);
              }}
            >
              Play Again
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="gameround"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between mb-8"
          >
            <ImageChoice
              src={
                rounds[currentRound].aiIsLeft
                  ? rounds[currentRound].aiImage
                  : rounds[currentRound].realImage
              }
              onClick={() => handleChoice(true)}
              position="left"
            />
            <ImageChoice
              src={
                rounds[currentRound].aiIsLeft
                  ? rounds[currentRound].realImage
                  : rounds[currentRound].aiImage
              }
              onClick={() => handleChoice(false)}
              position="right"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.p
        className="text-2xl text-center font-bold"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
      >
        Current Score: {score}
      </motion.p>
    </div>
  );
}

function ImageChoice({
  src,
  onClick,
  position,
}: {
  src: string;
  onClick: () => void;
  position: string;
}) {
  return (
    <div className="w-[48%]">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative aspect-square mb-4"
      >
        <Image
          src={src}
          alt={`Image ${position}`}
          layout="fill"
          objectFit="cover"
          className="rounded-xl shadow-lg"
        />
      </motion.div>
      <button className="btn btn-primary w-full text-xl py-3" onClick={onClick}>
        This is AI
      </button>
    </div>
  );
}
