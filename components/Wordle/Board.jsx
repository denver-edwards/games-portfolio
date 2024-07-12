import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { words } from "@/utils/words";

export default function Wordle() {
  const [letters, setLetters] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [userInput, setUserInput] = useState([]);
  const [wrongTries, setWrongTries] = useState(0);
  const [incorrectLetter, setIncorrectLetter] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setLetters([...Array(26)].map((_, i) => String.fromCharCode(i + 65)));
    resetGame();
  }, []);

  function checkLetter(letter) {
    if (wrongTries < 6 && !gameOver) {
      const updatedUserInput = userInput.slice();
      let isCorrectGuess = false;

      selectedWord.split("").forEach((char, index) => {
        if (char.toUpperCase() === letter) {
          updatedUserInput[index] = letter;
          isCorrectGuess = true;
        }
      });

      if (!isCorrectGuess) {
        setIncorrectLetter([...incorrectLetter, letter]);
        setWrongTries(wrongTries + 1);
      }

      setUserInput(updatedUserInput);
    }
  }

  function resetGame() {
    const newWord = selectRandomWord();
    setSelectedWord(newWord);
    setUserInput(Array(newWord.length).fill("_"));
    setWrongTries(0);
    setIncorrectLetter([]);
    setGameOver(false);
    toast.dismiss("notice-bad");
    toast.dismiss("notice-good");
  }

  function selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4 bg-slate-300">
      <Link
        className="absolute top-10 left-10 uppercase hover:text-slate-700"
        href="/"
      >
        {"<"} Back
      </Link>
    </div>
  );
}
