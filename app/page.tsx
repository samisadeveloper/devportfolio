'use client'

// import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import { motion } from "motion/react"

import { FaJava, FaNodeJs, FaReact } from "react-icons/fa";
import { IoLibraryOutline } from "react-icons/io5";

import Header from './components/Header';
import { ReactNode, useEffect, useState } from 'react';
import ProjectCard, { loadProjects, Project, Repository } from './components/Project';
import Modal from './components/Modal';

export default function Home() {
        const [modalContent, setModalContent] = useState<ReactNode>(null);
        const [projects, setProjects] = useState<Project[]>([]);

        useEffect(() => {
                async function load() {
                        const newProjects = await loadProjects();

                        setProjects(newProjects);
                };

                load();
        }, []);

        return (
                <>
                        
                        <Header />

                        <Modal content={modalContent} />

                        {projects.map((project, index) => (
                                <ProjectCard key={index} project={project} setModal={setModalContent} />
                        ))}
                </>
        );
}
