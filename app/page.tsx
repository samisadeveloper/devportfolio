'use client'

import Typewriter from 'typewriter-effect';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import { motion } from "motion/react"

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
  My name is **Sam**, and I love backend development.
  
  I have always been fascinated by programming and have written a lot of code over the years.

  Most of my experience comes from **Java** and **Lua**, but I've recently been learning **JavaScript** and various **JavaScript** frameworks.

  # Education
  During Highschool, I participated in the Game Development and Cybersecurity courses offered by the [Davis Catalyst Center](https://catalyst.davis.k12.ut.us/)

  I am currently enrolled in the Software Development course at [Davis Technical College](https://www.davistech.edu/)
  ` 

  return (
    <>
      <MyHeader />
      <main>
        <motion.div className="socials"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
          >
            <a href="https://github.com/samisadeveloper">
              <Image
                src="/github-logo.svg"
                alt="github"
                width={150}
                height={150}
              />
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
          >
            <a href="https://www.youtube.com/@samisgaming42">
              <Image
                src="/youtube-icon.svg"
                alt="youtube"
                width={150}
                height={150}
              />
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
          >
            <a href="https://www.linkedin.com/in/samuel-keller-378878293/">
              <Image
                src="/linkedin-logo.svg"
                alt="linkedin"
                width={150}
                height={150}
              />
            </a>
          </motion.div>
        </motion.div>
        <article className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
}
