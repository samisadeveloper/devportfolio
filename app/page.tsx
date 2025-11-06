'use client'

import { Component } from 'react';
import Typewriter from 'typewriter-effect';

// this is the new file

/* TODO:
 - use an animation engine for the content inside of <main>
 - seperation of concerns on different pages (maybe)
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
        <h2 className="text-8xl font-bold">About me</h2>
        <p className="text-6xl">
        My name is Sam, I am a developer. <br /> I have been writing code for several years.
        <br /> <br />
        I am mostly familiar with Java and Lua but I have some experience in other languages as well.
        </p>

        <h3 className="text-8xl pt-35 font-bold">Experience</h3>
        <p className="text-6xl">
        I have experience with these languages
        </p>
        <ul className="pl-25 text-5xl">
          <li>Java</li>
          <li>Lua</li>
          <li>Javascript</li>
          <li>C#</li>
        </ul>

        <br /> <br />
      </main>
    </div>
  );
}
