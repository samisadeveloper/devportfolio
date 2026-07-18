'use client'

import Typewriter from 'typewriter-effect';
// import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import { motion } from "motion/react"

import { FaJava, FaNodeJs, FaReact } from "react-icons/fa";
import { IoLibraryOutline } from "react-icons/io5";

import RadixTooltip from 'react-radix-tooltip';

function MyHeader() {
  return (
    <header style={{
      display: 'flex',
      height: 100,
      justifyContent: 'center',
      backgroundColor: '#131f28',
      width: '100%',
      boxShadow: '0 0 50px 15px rgba(0, 0, 0, 0.25)',
      justifySelf: 'center',
    }}>
      <div id="typewriter" style={{ fontSize: 65 }}>
        <Typewriter
          options={{
            strings: ['samisa.dev', 'sam is a dev', 'sam is a developer', 'sam is a programmer'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </header>
  )
}

function Socials() {
  const width = 80;
  const height = 80;

  const socials = [
    {
      link: 'https://github.com/samisadeveloper',
      img: '/github-logo.svg',
      alt: 'github'
    },
    {
      link: 'https://www.youtube.com/@thejavaman42',
      img: '/youtube-icon.svg',
      alt: 'youtube'
    },
    {
      link: 'https://www.linkedin.com/in/samuel-keller-378878293/',
      img: '/linkedin-logo.svg',
      alt: 'linkedin'
    }
  ]

  return (
    <motion.div
      style={{
        alignSelf: 'center',
        height: 110,
        marginTop: 25,
        borderRadius: 15,
        justifySelf: 'center',
        width: 900,
      }}

      className="socials"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {
        socials.map((social, index) => (
          <motion.div
            style={{
              width: width * 1.2,
              height: height * 1.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key={index}
            whileHover={{ scale: 1.05 }}
          >
            <a
              href={social.link}>
              <Image
                src={social.img}
                alt={social.alt}
                width={width}
                height={height}
              />
            </a>
          </motion.div>
        ))
      }
    </motion.div >);
}

const languages = {
  "java": { desc: '', icon: <FaJava color={'white'} size={35} /> },
  "react": { desc: '', icon: <FaReact color={'white'} size={35} /> },
  "nodejs": { desc: '', icon: <FaNodeJs color={'white'} size={35} /> },
  "minigame-lib": { desc: 'This project uses my minigame library.', icon: <IoLibraryOutline color={'white'} size={35} /> }
};

type LangKey = keyof typeof languages;

function Language({ lang }: { lang: LangKey }) {
  if (!(lang in languages)) {
    return <></>
  } else {
    const langName = lang.charAt(0).toUpperCase() + lang.slice(1);

    return (
      <RadixTooltip
        content={
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} >
            <strong style={{ fontSize: 25 }}>{langName}</strong>

            {languages[lang].desc && <p style={{ fontSize: 20 }}>{languages[lang].desc}</p>}
            {!languages[lang].desc && <p style={{ fontSize: 20 }}>This project was made with {langName}.</p>}
          </motion.div>
        }
        placement="top"
        sideOffset={15}
        arrow={true}
        style={{
          borderRadius: '9px'
        }}
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          {languages[lang].icon}
        </motion.div>
      </RadixTooltip>);
  }
}

function Projects() {
  const projects = [
    {
      name: "Bearwars",
      desc: "Bearwars is a minecraft minigame developed in java.",
      languages: ['java', 'minigame-lib']
    },
    {
      name: "Minigame Library",
      desc: "Minigame library is a library I wrote to help with minecraft minigame development",
      languages: ['java']
    },
    {
      name: "Minecraft Web Interface",
      desc: "Web interface for minecraft servers utilizing websockets and nodejs.",
      languages: ['java', "react", "nodejs"]
    },
    {
      name: "Giggy Museum",
      desc: "Museum website I made for a friend, mostly to learn react.",
      languages: ['react']
    },
    {
      name: "Discord AI Bot",
      desc: "discord bot which interfaces with LM studio to generate silly responses.",
      languages: ['nodejs']
    }
  ] as const;

  return (
    <div style={{ justifyItems: 'center' }}>
      <h1 style={{ fontSize: 90 }}>My Projects</h1>

      <div style={{
        boxShadow: '0 0 50px 15px rgba(0, 0, 0, 0.25)',
        scrollbarWidth: 'none',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#16222a',
        height: '600px',
        width: '60%',
        overflowY: 'scroll',
        justifyItems: 'center'
      }}>

        {projects.map((project, index) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.15)',
              backgroundColor: '#19242b',
              borderRadius: 15,
              margin: 25,
              width: '95%',
              height: 120
            }}
            key={index}>
            <div style={{ margin: 15, justifyContent: 'space-evenly', alignContent: 'center', flexDirection: 'column' }}>
              <h1 style={{ fontSize: 45, fontWeight: 'bold' }}>{project.name}</h1>
              <p style={{ fontSize: 20, color: '#c7d1d7' }}>{project.desc}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', margin: 20 }}>
              {project.languages.map((lang, index) => (
                <Language key={index} lang={lang} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <div>
        <MyHeader />

        <Socials />

        <main style={{ marginTop: 150 }}>
          <Projects />
        </main>
      </div >
    </div>
  );
}
