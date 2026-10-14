'use client'

import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import ProjectCard, { loadProjects, Project } from './components/Project';
import ProjectModal from './components/ProjectModal';

export default function Home() {
        const modal = useRef<HTMLDialogElement>(null);

        const [projects, setProjects] = useState<Project[]>([]);
        const [currentProject, setCurrentProject] = useState<Project>();

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

                        <ProjectModal dialogRef={modal} project={currentProject} />

                        <div style={{justifyItems: 'center'}}>
                                {projects.map((project, index) => (
                                        <ProjectCard key={index} project={project} onClick={() => {
                                                modal.current?.showModal();

                                                setCurrentProject(project);
                                        }} />
                                ))}
                        </div>
                </>
        );
}
