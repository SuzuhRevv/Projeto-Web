import './page.module.css'
import styles from './page.module.css'
import Queue from './components/queue/queue'
import Header from './components/header/header'
import React, { useState } from 'react'

export default async function Home() {
  return (
    <>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&family=Open+Sans&family=Overpass:wght@500&family=Poppins:ital,wght@0,400;0,500;1,700&display=swap" rel="stylesheet"/>
        </head>
        <main className={styles.main}>
          <Header />
            <Queue />
          <footer className={styles.footer}>Com 💛 Info Jr UFBA 2022</footer>
        </main>
      </html>
    </>    
  )
}
