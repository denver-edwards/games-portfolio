import Head from "next/head";
import Board from "@/components/Hangman/Board";

export default function Hangman() {
  return (
    <>
      <Head>
        <title>Hangman</title>
      </Head>
      <Board />
    </>
  );
}
