'use client'

import Typewriter from 'typewriter-effect';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import { motion } from "motion/react"

/*
 * TODO
 * my projects
 * move minecraft plugin development to projects
 * contact me
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
            <a href="https://www.youtube.com/@thejavaman42">
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

        <div className="skills">
          <article className="markdown-body">
            <ReactMarkdown>
          {`
# Skills
### Minecraft Plugin Development

Over the past *5+* years I've developed a large collection of Minecraft plugins including a modular minigame manager and a framework for rapidly creating custom items and recipes.

I also designed and built my own minigame, *Bear Wars,* from scratch. It’s inspired by the core mechanics of Hypixel’s Bed Wars, but developed with my own systems, features, and gameplay twists to make it unique to my framework and server environment.

### Docker

Over the past several months I've focused on improving efficency and portability of my projects by adopting *Docker* and *Docker Compose*.

I use *Docker* to self-host servers, API endpoints, and various hobbyist projects, allowing me to manage deployments cleanly and consistently.

### Cloudflare

In recent months I've been leveraging *Cloudflare's* Domain registration, workers, and reverse tunnels.

My knowledge regarding this platform is still limited but I am excited to keep learning how it can be used in both professional and hobbyist enviornments.
`
          }
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </>
  );
}
