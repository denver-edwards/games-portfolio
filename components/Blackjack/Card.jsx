import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { GiSpades, GiClubs, GiDiamonds, GiHearts } from "react-icons/gi";

const CARD_TYPES = {
  H: { icon: <GiHearts size="3em" />, color: "text-red-600" },
  D: { icon: <GiDiamonds size="3em" />, color: "text-red-600" },
  C: { icon: <GiClubs size="3em" />, color: "text-black" },
  S: { icon: <GiSpades size="3em" />, color: "text-black" },
};

export default function Card({ number, faceDown = false }) {
  const cardRef = useRef(null);
  const cardType = number.slice(0, 1);
  const cardNum = number.slice(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const defaultPosition = { x: 0, y: 0 };
  const verticalLimit = 30;

  const handleDrag = (e, data) => {
    const newY = Math.max(
      Math.min(data.y, defaultPosition.y + verticalLimit),
      defaultPosition.y - verticalLimit
    );
    setPosition({ x: defaultPosition.x, y: newY });
  };

  if (faceDown) {
    return (
      <div className="relative w-40 h-[15em] bg-blue-800 border-2 border-slate-100 rounded-lg shadow-xl flex-shrink-0 mr-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-red-600 opacity-20"></div>
        </div>
      </div>
    );
  }

  return (
    <Draggable
      nodeRef={cardRef}
      position={position}
      onDrag={handleDrag}
      onStop={() => setPosition({ x: defaultPosition.x, y: position.y })}
    >
      <div
        ref={cardRef}
        className={`font-slab relative w-40 h-[15em] bg-slate-100 border-2 border-slate-100 rounded-lg shadow-xl flex-shrink-0 mr-4 transition-all hover:shadow-2xl hover:-translate-y-2`}
        style={{ minWidth: "160px" }}
      >
        <p
          className={`absolute top-2 left-2 text-2xl font-bold ${CARD_TYPES[cardType]?.color}`}
        >
          {cardNum}
        </p>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 ${CARD_TYPES[cardType]?.color}`}
        >
          {CARD_TYPES[cardType]?.icon}
        </div>
        <p
          className={`absolute bottom-2 right-2 rotate-180 text-2xl font-bold ${CARD_TYPES[cardType]?.color}`}
        >
          {cardNum}
        </p>
      </div>
    </Draggable>
  );
}
