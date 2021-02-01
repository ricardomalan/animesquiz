import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Quiz - Animes</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href={db.favicon} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="title" content="Quiz - Animes" key="title" />
        <meta name="description" content={db.description} key="desc" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Quiz - Animes" key="ogsitename" />
        <meta property="og:url" content="https://animesquiz.ricardomalan.vercel.app/" key="ogurl" />
        <meta property="og:title" content="Quiz - Animes" key="ogtitle" />
        <meta property="og:description" content={db.description} key="ogdesc" />
        <meta property="og:image" content={db.preview_site} key="ogimg" />
        <meta property="og:image:type" content="image/png" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
