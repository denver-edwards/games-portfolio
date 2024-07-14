import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { fiveLetterWords as words } from "@/utils/words";
import Button from "@/components/Button";

export default function Wordle() {
  const [letters, setLetters] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [userInput, setUserInput] = useState(Array(5).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [wrongTries, setWrongTries] = useState(0);
  const [incorrectLetter, setIncorrectLetter] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    setLetters([...Array(26)].map((_, i) => String.fromCharCode(i + 65)));
    resetGame();
  }, []);

  useEffect(() => {
    if (wrongTries === 6) {
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

  function handleKeyPress(event) {
    const letter = event.key.toUpperCase();
    if (
      letters.includes(letter) &&
      currentGuess.length < selectedWord.length &&
      !gameOver
    ) {
      setCurrentGuess(currentGuess + letter);
    }
  }

  function checkGuess() {
    if (currentGuess.length === selectedWord.length) {
      const newUserInput = [...userInput];
      newUserInput[currentRow] = currentGuess;
      setUserInput(newUserInput);

      if (currentGuess.toUpperCase() === selectedWord.toUpperCase()) {
        toast.success("Congratulations! You've guessed the word!", {
          toastId: "notice-good",
          className: "custom-toast-success",
        });
        setGameOver(true);
      } else {
        for (let i = 0; i < selectedWord.length; i++) {
          if (!selectedWord.toUpperCase().includes(currentGuess[i])) {
            setIncorrectLetter([...incorrectLetter, currentGuess[i]]);
          }
        }
        setWrongTries(wrongTries + 1);
        setCurrentRow(currentRow + 1);
        setCurrentGuess("");
      }
    }
  }

  function resetGame() {
    const newWord = selectRandomWord();
    setSelectedWord(newWord);
    setUserInput(Array(5).fill(""));
    setCurrentRow(0);
    setWrongTries(0);
    setIncorrectLetter([]);
    setGameOver(false);
    setCurrentGuess("");
    toast.dismiss("notice-bad");
    toast.dismiss("notice-good");
  }

  function selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentGuess, gameOver]);

  const displayRows = Array(5)
    .fill("")
    .map((_, rowIndex) => {
      const guess = userInput[rowIndex];
      return (
        <div key={rowIndex} className="flex space-x-2 justify-center mb-2">
          {Array(selectedWord.length)
            .fill("")
            .map((_, colIndex) => (
              <div
                key={colIndex}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-center text-2xl sm:text-3xl rounded-md ${
                  guess[colIndex]
                    ? guess[colIndex].toUpperCase() ===
                      selectedWord[colIndex].toUpperCase()
                      ? "bg-green-500 text-white"
                      : selectedWord.toUpperCase().includes(guess[colIndex])
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-300 text-black"
                    : "bg-white shadow"
                }`}
              >
                {guess[colIndex] || ""}
              </div>
            ))}
        </div>
      );
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4 bg-slate-300">
      <Link
        className="absolute top-4 left-4 sm:top-10 sm:left-10 uppercase hover:text-slate-700"
        href="/"
      >
        {"<"} Back
      </Link>

      <div>{displayRows}</div>

      <div className="flex space-x-2 justify-center mb-2">
        {Array(selectedWord.length)
          .fill("")
          .map((_, colIndex) => (
            <div
              key={colIndex}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-center text-2xl sm:text-3xl rounded-md bg-white shadow`}
            >
              {currentGuess[colIndex] || ""}
            </div>
          ))}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={checkGuess}
      >
        Guess
      </button>

      <div className="grid grid-cols-6 sm:grid-cols-7 gap-1 sm:gap-2 mt-4">
        {letters.map((letter) => (
          <button
            className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center text-center text-xl sm:text-2xl border rounded-2xl drop-shadow-md ${
              incorrectLetter.includes(letter)
                ? "bg-red-400 text-white cursor-default border-none drop-shadow-xl"
                : "bg-white hover:bg-gray-200 hover:text-gray-900 drop-shadow-xl transition"
            }`}
            key={letter}
            onClick={() => handleKeyPress({ key: letter })}
            disabled={wrongTries === 6 || gameOver}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="absolute top-4 right-4 sm:top-10 sm:right-10 flex flex-col items-end space-y-2">
        <Button
          passFunc={resetGame}
          text="Reset"
          customCSS={"bg-rose-600 hover:bg-rose-700 "}
        />
      </div>
    </div>
  );
}
