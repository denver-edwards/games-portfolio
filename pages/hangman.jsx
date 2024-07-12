import Head from "next/head";
import Keyboard from "@/components/Hangman/Keyboard";

export default function Hangman() {
  return (
    <>
      <Head>
        <title>Hangman</title>
      </Head>
      <Keyboard />
    </>
  );
}
