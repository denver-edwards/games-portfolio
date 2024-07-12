import Head from "next/head";
import Board from "@/components/Wordle/Board";

export default function Hangman() {
  return (
    <>
      <Head>
        <title>Wordle</title>
      </Head>
      <Board />
    </>
  );
}
