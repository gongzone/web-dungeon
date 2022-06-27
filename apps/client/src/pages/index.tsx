import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BsFillAlarmFill } from 'react-icons/bs'

import { Button, GlobalStyle, defaultTheme } from 'ui'

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
              width: '500px',
              height: '500px',
            }}
          >
            <Button kind="primary" size="sm">
              제출
              <AiFillPlusCircle />
            </Button>
            <Button kind="primary" appearance="outline">
              닫기 <BsFillAlarmFill />
            </Button>
            <Button kind="danger" size="lg" fullWidth disabled>
              <AiFillPlusCircle />
              로그인
            </Button>
            <Button kind="primary" size="sm" iconOnly disabled>
              <BsFillAlarmFill />
            </Button>
            <Button kind="danger" size="md" iconOnly>
              <BsFillAlarmFill />
            </Button>
            <Button kind="danger" appearance="ghost" size="lg" iconOnly>
              <BsFillAlarmFill />
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Home
