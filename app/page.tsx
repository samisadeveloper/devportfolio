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

// Hi, I’m Sam — a backend developer with a strong foundation in Java and Lua, and growing expertise in modern JavaScript frameworks. I enjoy building scalable systems, automating workflows, and deploying real-world applications. My journey started with game development and has expanded into full-stack projects, server management, and cloud hosting.
export default function Home() {
  const content = 
    `
  # About me
  Hi, I'm Sam - a backend developer with a strong foundation in Java and Lua, and growing expertise in modern JavaScript frameworks. 
  
  I enjoy building scalable systems, and deploying real-world applications.

  My journey started with game development and has expanded into full-stack projects, server management, and cloud deployment.

  I also value incredibly fast workflows, which is why I use Vim and a tiling window manager for development. 

  # Education
  [**Davis Catalyst Center**](https://catalyst.davis.k12.ut.us/)   
  Game Development and Cybersecurity Courses (High School)
  
  [**Davis Technical College**](https://www.davistech.edu/)  
  Software Development Program (currently enrolled)

  # DevOps
  I have hands-on experience with several DevOps tools which support efficient development, deployment, and hosting workflows:
  - **Docker** - Containerized backend services
  - **Docker Compose** - Used in conjunction with Docker to host backend APIs 
  - **Cloudflare Workers / Pages** - Deployment for static sites
  - **Cloudflared** - Used for secure tunneling and reverse proxying to expose local services.
  
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

        <article className="markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
}
