import React from "react";
import type { AppProps } from "next/app";

import { Layout } from "../components/Layout";
import "../styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import ApiProvider from "../ApiProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApiProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApiProvider>
  );
}

export default MyApp;
