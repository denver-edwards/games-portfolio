import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { GiSpades, GiClubs, GiDiamonds, GiHearts } from "react-icons/gi";

export default function Card({ number }) {
  const [typeIcon, setTypeIcon] = useState(null);

  const cardRef = useRef(null);
  const cardType = number.slice(0, 1);
  const cardNum = number.slice(1);

  useEffect(() => {
    if (cardType === "H") {
      setTypeIcon(<GiHearts size={"3em"} />);
    } else if (cardType === "C") {
      setTypeIcon(<GiClubs size={"3em"} />);
    } else if (cardType === "D") {
      setTypeIcon(<GiDiamonds size={"3em"} />);
    } else if (cardType === "S") {
      setTypeIcon(<GiSpades size={"3em"} />);
    }
  }, [cardType]);

  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
      nodeRef={cardRef}
    >
      <div
        ref={cardRef}
        className="font-slab relative w-40 h-[15em] bg-slate-100 border border-slate-100 rounded-lg shadow-xl flex-shrink-0 mr-4"
        style={{ minWidth: "160px" }}
      >
        <p className="absolute top-2 right-2">{cardNum}</p>
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50">
          {typeIcon}
        </p>
        <p className="absolute bottom-2 left-2 rotate-180">{cardNum}</p>
      </div>
    </Draggable>
  );
}
