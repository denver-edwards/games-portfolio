import React, { useEffect, useState } from "react";
import Card from "@/components/Blackjack/Card";
import arrayShuffle from "@/utils/arrayShuffle";

export default function Table() {
  const [cardDeck, setCardDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);

  useEffect(() => {
    generateDeck();
  }, []);

  // useEffect(() => {
  //   console.log(cardDeck);
  // }, [cardDeck]);
  //
  // useEffect(() => {
  //   console.log(playerHand);
  // }, [playerHand]);

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

    const newDeck = suits.flatMap((suit) =>
      ranks.map((rank) => `${suit}${rank}`)
    );

    const shuffleDeck = arrayShuffle(newDeck);
    setCardDeck(shuffleDeck);

    dealInitialCards(shuffleDeck);
  }

  function dealInitialCards(deck) {
    // if (deck.length < 052) return;

    const firstCard = deck[0];
    const secondCard = deck[1];

    setPlayerHand([firstCard, secondCard]);
    setCardDeck(deck.slice(2));
  }

  function dealCards() {
    if (cardDeck.length < 1) return;

    const nextCard = cardDeck[0];

    setPlayerHand((prevHand) => [...prevHand, nextCard]);
    setCardDeck((prevDeck) => prevDeck.slice(1));
  }

  function reset() {
    setCardDeck([]);
    setPlayerHand([]);
    generateDeck();
  }

  return (
    <>
      <button
        onClick={reset}
        className="bg-red-400 hover:bg-red-600 py-2 px-4 text-white rounded-3xl"
      >
        Reset
      </button>
      <div className="flex">
        {playerHand.map((card, index) => (
          <Card key={index} number={card} />
        ))}
      </div>
      s <button onClick={dealCards}>Deal More Cards</button>
    </>
  );
}
