import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { words } from "@/utils/words";
import Link from "next/link";
import Hangman from "@/components/Hangman/HangmanFigure";
import Button from "@/components/Button";

export default function Board() {
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

  useEffect(() => {
    if (wrongTries === 6) {
      setUserInput(selectedWord.split("").map((char) => char.toUpperCase()));
      toast.error(
        `Too many tries. You lose! The word was: ${selectedWord.toUpperCase()}`,
        {
          toastId: "notice-bad",
          className: "custom-toast-error",
        }
      );
      setGameOver(true);
    }
  }, [wrongTries]);

  useEffect(() => {
    if (
      userInput.join("") !== "" &&
      !userInput.includes("_") &&
      selectedWord !== ""
    ) {
      if (!gameOver && userInput.join("") === selectedWord.toUpperCase()) {
        toast.success("You got it right! Good job!", {
          toastId: "notice-good",
          className: "custom-toast-success",
        });
        setGameOver(true);
      }
    }
  }, [userInput.join(""), selectedWord, gameOver]);

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

      <div className="absolute top-10 right-10 flex flex-col items-end space-y-2">
        <div className="text-lg text-slate-700">Mistakes: {wrongTries}</div>
        <Button
          passFunc={resetGame}
          text="Reset"
          customCSS={"bg-rose-600 hover:bg-rose-700 "}
        />
      </div>

      <div className="flex justify-center mt-4">
        <Hangman wrongTries={wrongTries} />
      </div>

      <div className="flex space-x-2 flex-wrap justify-center">
        {userInput.map((char, index) => (
          <div
            key={index}
            className="w-10 h-10 flex items-center justify-center text-center text-3xl rounded-xl bg-white shadow"
          >
            {char}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-7 gap-2 mt-4">
        {letters.map((letter) => (
          <button
            className={`w-12 sm:w-20 h-12 sm:h-20 flex items-center justify-center text-center text-2xl sm:text-3xl border rounded-2xl drop-shadow-md ${
              incorrectLetter.includes(letter)
                ? "bg-red-400 text-white cursor-default border-none drop-shadow-xl"
                : "bg-white hover:bg-gray-200 hover:text-gray-900 transition"
            }`}
            key={letter}
            onClick={() => checkLetter(letter)}
            disabled={wrongTries === 6 || gameOver}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
