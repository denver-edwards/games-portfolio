import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Games on your Phone</title>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      </Head>
      <ToastContainer position="top-center" autoClose={false} />
      <Component {...pageProps} />
    </>
  );
}
