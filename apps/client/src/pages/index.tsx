import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { PrimaryBtn, SecondaryBtn, GlobalStyle, defaultTheme } from 'ui'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: 'white',
              width: '500px',
              height: '500px',
            }}
          >
            <PrimaryBtn>제출</PrimaryBtn>
            <SecondaryBtn>로그인</SecondaryBtn>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Home
