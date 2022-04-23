import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/home/Header";
import { Main } from "../components/home/Main";
import { Footer } from "../components/home/Footer";

const Home: NextPage = () => {
  return (
    <div id="app">
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="sr-only">감귤마켓 홈화면과 피드</h1>
      <Header />
      {typeof window !== 'undefined' && (
        <>
          <Main />
          <Footer />    
        </>
      )}
      
    </div>
  );
};

export default Home;
