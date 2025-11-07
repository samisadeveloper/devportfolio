'use client'

import Typewriter from 'typewriter-effect';
import ReactMarkdown from 'react-markdown';

/* TODO
  - nothing
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
  const content = 
  `
  # About me
  My name is Sam, and I love backend development.
  
  I have always been fascinated by programming and have written a lot of code over the years.

  Most of my experience comes from Java and Lua, but I've recently been learning JavaScript and various JavaScript frameworks.

  # Education
  During Highschool, I participated in the Game Development and Cybersecurity courses offered by the [Davis Catalyst Center](https://catalyst.davis.k12.ut.us/)

  I am currently enrolled in the Software Development course at [Davis Technical College](https://www.davistech.edu/)
  ` 

  return (
    <>
      <MyHeader />
      <main>
        <article className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
}
