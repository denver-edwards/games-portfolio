import React, { useEffect, useState } from "react";
import Card from "@/components/Blackjack/Card";
import arrayShuffle from "@/utils/arrayShuffle";

export default function Table() {
  const [cardDeck, setCardDeck] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const deck = generateDeck();
    setCardDeck(deck);
    dealInitialCards(deck);
  }, []);

  function generateDeck() {
    const suits = ["H", "D", "C", "S"];
    const ranks = [
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

    let fullDeck = [];

    for (let i = 0; i < 6; i++) {
      let newDeck = suits.flatMap((suit) =>
        ranks.map((rank) => `${suit}${rank}`)
      );

      fullDeck = fullDeck.concat(arrayShuffle(newDeck));
    }

    return fullDeck;
  }

  function dealInitialCards(deck) {
    const initialHand = deck.slice(0, 2);
    setPlayerHand(initialHand);
    setCardDeck(deck.slice(2));
    updatePlayerCount(initialHand);
  }

  function dealCard() {
    if (cardDeck.length < 60) {
      const deck = generateDeck();
      setCardDeck(deck);
    }

    const nextCard = cardDeck[0];
    const newHand = [...playerHand, nextCard];
    setPlayerHand(newHand);
    setCardDeck(cardDeck.slice(1));
    updatePlayerCount(newHand);
  }

  function reset() {
    setCardDeck([]);
    setPlayerHand([]);
    setPlayerCount(0);
    setDealerHand([]);
    const newDeck = generateDeck();
    setCardDeck(newDeck);
    dealInitialCards(newDeck);
  }

  function nextHand() {
    setPlayerHand([]);
    setDealerHand([]);
    dealInitialCards(cardDeck);
  }

  function updatePlayerCount(hand) {
    let newCount = 0;
    for (let i = 0; i < hand.length; i++) {
      let cardValue = hand[i].slice(1);
      if (cardValue === "K" || cardValue === "Q" || cardValue === "J") {
        cardValue = 10;
      } else if (cardValue === "A") {
        cardValue = 11; // or 1, depending on your game logic
      }
      newCount += Number(cardValue);
    }
    setPlayerCount(newCount);
  }
  // first dealers card is shown, 2nd isnt
  // all players cards are face up
  return (
    <>
      <button
        onClick={reset}
        className="bg-red-400 hover:bg-red-600 py-2 px-4 text-white rounded-3xl absolute top-10 right-10 z-50 outline-none"
      >
        Reset
      </button>

      <div className="flex">
        {playerHand.map((card, index) => (
          <Card key={index} number={card} />
        ))}
      </div>

      <div>Score:{playerCount}</div>
      <button
        onClick={dealCard}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 rounded-3xl bg-green-600 hover:bg-green-800 text-white px-20 py-1 drop-shadow-xl"
      >
        Hit
      </button>
    </>
  );
}
