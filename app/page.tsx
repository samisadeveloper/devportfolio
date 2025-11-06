'use client'

import { Component } from 'react';
import Typewriter from 'typewriter-effect';

// this is the new file

/* TODO:
 - change the favicon.ico

 - use an animation engine for the content inside of <main>
 - caching of stuff
*/ 

function MyHeader() {
  return (
    <header>
      <p>&#123;</p>
      <div id="typewriter">
        <Typewriter 
          options={{
            strings: ['samisa.dev', 'sam is a dev', 'sam is a developer'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <p>&#125;</p>
    </header>
  )
}

export default function Home() {
  return (
    <div>
      <MyHeader />
      <main>
      </main>
    </div>
  );
}
