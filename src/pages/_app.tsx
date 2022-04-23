import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layouts";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps: { pageProps } }: AppProps) {
  return (
    // <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    // </SessionProvider>
  );
}

export default App;
