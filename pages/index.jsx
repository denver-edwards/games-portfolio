import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen pt-10 pb-16 bg-slate-300 gap-x-2">
      <Link
        href="/hangman"
        className="bg-purple-500 hover:bg-purple-700 text-white text-sm rounded-xl px-2 py-1"
      >
        Hangman
      </Link>

      <Link
        href="/wordle"
        className="bg-pink-500 hover:bg-pink-700 text-white text-sm rounded-xl px-2 py-1"
      >
        Wordle
      </Link>

      <Link
        href="/blackjack"
        className="bg-emerald-500 hover:bg-emerald-700 text-white text-sm rounded-xl px-2 py-1"
      >
        Blackjack
      </Link>

      <footer className="absolute bottom-3 text-xs text-gray-600">
        Made with ❤️
      </footer>
    </main>
  );
}
