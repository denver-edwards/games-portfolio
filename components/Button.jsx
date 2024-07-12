export default function Button({ passFunc, text, customCSS }) {
  return (
    <button
      className={`rounded-xl text-white px-4 py-1 transition ${
        !customCSS ? "bg-green-600 hover:bg-green-700" : customCSS
      }`}
      onClick={passFunc}
    >
      {text}
    </button>
  );
}
