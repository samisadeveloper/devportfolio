'use client'

import { useRef, useState } from 'react';
import { Project } from '../util/github';
import ProjectModal from './ProjectModal';
import ProjectCard from './Project';

export default function ProjectsView({projects}: {projects: Project[]}) {
        const modal = useRef<HTMLDialogElement>(null);

        const [currentProject, setCurrentProject] = useState<Project>();

        return (
                <>
                        <ProjectModal dialogRef={modal} project={currentProject} />

                        <div style={{justifyItems: 'center'}}>
                                {projects.map(project => (
                                        <ProjectCard key={project.name} project={project} onClick={() => {
                                                setCurrentProject(project);

                                                modal.current?.showModal();
                                        }} />
                                ))}
                        </div>
                </>
        );
}
