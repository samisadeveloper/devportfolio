'use client'

import Header from './components/Header';
import { ReactNode, useEffect, useState } from 'react';
import ProjectCard, { loadProjects, Project } from './components/Project';
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
