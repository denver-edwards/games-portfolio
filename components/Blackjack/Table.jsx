import React, { useEffect, useState } from "react";
import Card from "@/components/Blackjack/Card";
import arrayShuffle from "@/utils/arrayShuffle";

const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const SUITS = ["H", "D", "C", "S"];

export default function Table() {
  const [cardDeck, setCardDeck] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'bust', 'win', 'lose', 'push'
  const [message, setMessage] = useState("");

  useEffect(() => {
    const deck = generateDeck();
    setCardDeck(deck);
    dealInitialCards(deck);
  }, []);

  function generateDeck() {
    let fullDeck = [];
    for (let i = 0; i < 6; i++) {
      const newDeck = SUITS.flatMap((suit) =>
        RANKS.map((rank) => `${suit}${rank}`)
      );
      fullDeck = fullDeck.concat(arrayShuffle(newDeck));
    }
    return fullDeck;
  }

  function dealInitialCards(deck) {
    const playerCards = [deck[0], deck[2]];
    const dealerCards = [deck[1], deck[3]];

    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setCardDeck(deck.slice(4));

    updateCounts(playerCards, dealerCards);
    setGameStatus("playing");
    setMessage("");
  }

  function hit() {
    if (gameStatus !== "playing") return;

    if (cardDeck.length < 20) {
      setCardDeck(generateDeck());
    }

    const newPlayerHand = [...playerHand, cardDeck[0]];
    setPlayerHand(newPlayerHand);
    setCardDeck(cardDeck.slice(1));

    const newCount = calculateHandValue(newPlayerHand);
    setPlayerCount(newCount);

    if (newCount > 21) {
      setGameStatus("bust");
      setMessage("Bust! You went over 21.");
    } else if (newCount === 21) {
      stand();
    }
  }

  function stand() {
    if (gameStatus !== "playing") return;

    let newDealerHand = [...dealerHand];
    let dealerValue = calculateHandValue(newDealerHand);

    // Dealer draws until they have at least 17
    while (dealerValue < 17) {
      newDealerHand = [...newDealerHand, cardDeck[0]];
      setCardDeck(cardDeck.slice(1));
      dealerValue = calculateHandValue(newDealerHand);
    }

    setDealerHand(newDealerHand);
    setDealerCount(dealerValue);

    const playerValue = calculateHandValue(playerHand);

    // Determine game outcome
    if (dealerValue > 21) {
      setGameStatus("win");
      setMessage("Dealer busts! You win!");
    } else if (dealerValue > playerValue) {
      setGameStatus("lose");
      setMessage("Dealer wins!");
    } else if (playerValue > dealerValue) {
      setGameStatus("win");
      setMessage("You win!");
    } else {
      setGameStatus("push");
      setMessage("Push! It's a tie.");
    }
  }

  function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;

    hand.forEach((card) => {
      const rank = card.slice(1);
      if (rank === "A") {
        value += 11;
        aces++;
      } else if (["K", "Q", "J"].includes(rank)) {
        value += 10;
      } else {
        value += parseInt(rank);
      }
    });

    // Adjust for aces
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  }

  function updateCounts(playerCards, dealerCards) {
    setPlayerCount(calculateHandValue(playerCards));
    setDealerCount(calculateHandValue([dealerCards[0]]));
  }

  function reset() {
    const newDeck = generateDeck();
    setCardDeck(newDeck);
    dealInitialCards(newDeck);
  }

  return (
    <div className="min-h-screen bg-green-800 p-8 relative">
      <button
        onClick={reset}
        className="bg-red-500 hover:bg-red-600 py-2 px-4 text-white rounded-lg absolute top-4 right-4 z-50 transition-colors"
      >
        New Game
      </button>

      <div className="flex flex-col items-center">
        <div className="mb-12">
          <h2 className="text-white text-xl mb-4">
            Dealer: {gameStatus !== "playing" ? dealerCount : "?"}
          </h2>
          <div className="flex">
            {dealerHand.map((card, index) => (
              <Card
                key={index}
                number={card}
                faceDown={index === 1 && gameStatus === "playing"}
              />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-xl mb-4">Player: {playerCount}</h2>
          <div className="flex">
            {playerHand.map((card, index) => (
              <Card key={index} number={card} />
            ))}
          </div>
        </div>

        {message && (
          <div
            className={`text-2xl font-bold mb-6 ${
              gameStatus === "win"
                ? "text-yellow-300"
                : gameStatus === "lose" || gameStatus === "bust"
                ? "text-red-300"
                : "text-white"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={hit}
            disabled={gameStatus !== "playing"}
            className={`py-3 px-8 rounded-lg text-white font-bold ${
              gameStatus !== "playing"
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            Hit
          </button>
          <button
            onClick={stand}
            disabled={gameStatus !== "playing"}
            className={`py-3 px-8 rounded-lg text-white font-bold ${
              gameStatus !== "playing"
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } transition-colors`}
          >
            Stand
          </button>
        </div>
      </div>
    </div>
  );
}
