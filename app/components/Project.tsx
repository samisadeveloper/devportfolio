import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import RadixTooltip from 'react-radix-tooltip';
import { getRepositoryFromUrl, getResourcePath, Repository } from '../util/github';

export type Project = {
        name: String
        repository: Repository
        icon?: string | Blob | undefined
};

const cardColor = "#101a21";
const cardColorDown = "#17232b";

// TODO: add a proper modal for each project
const modalContent = (
        <div style={{borderWidth: 1, borderColor: 'red', width: 500, height: 500}}>
                <h1>This is a project lol</h1>
        </div>
);

export async function loadProjects() : Promise<Project[]> {
        const projects = await fetch("/projects.json").then(response => response.json()) as any;

        const newProjects = [];

        for (const json of projects) {
                const repository = await getRepositoryFromUrl(json.repository);

                const icon = await getResourcePath(repository, ".github/media/icon.svg");

                const project = {
                        name: json.name,
                        description: json.description,
                        repository: repository,
                        icon: icon,
                } as Project;

                newProjects.push(project);
        }

        return newProjects;
}

export default function ProjectCard({project, setModal}: {project: Project, setModal: Dispatch<SetStateAction<ReactNode>>}) {
        const [hovered, setHovered] = useState(false);

        return (
                <RadixTooltip
                content={
                        <div>
                        <h1>Click to learn more</h1>
                        </div>
                }
                placement='top'
                arrow={true}
                >
                <div
                style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.15)',
                        backgroundColor: hovered ? cardColorDown : cardColor,
                        borderColor: "white",
                        borderRadius: 15,
                        margin: 25,
                        width: '95%',
                        cursor: 'pointer',
                }}

                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}

                onClick={() => setModal(modalContent)}
                >
                        <div style={{ margin: 15, marginLeft: 20, justifyContent: 'space-evenly', alignContent: 'center', flexDirection: 'column' }}>
                                <div style={{display: 'flex', alignItems: 'center', gap: 15,}}>
                                        {project.icon && <img width="100" height="100" alt="Application Icon" src={project.icon} />}

                                        <h1 style={{ fontSize: 35, fontWeight: '200' }}>{project.name}</h1>
                                </div>

                                <br />

                                <p style={{ fontSize: 18, width: 1200, }}>{project.repository.description}</p>
                        </div>

                        <div style={{marginRight: 20, marginTop: 20, width: 350, height: '80%'}}>
                                <h1 style={{fontSize: 25, fontWeight: 250}}>Languages</h1>

                                <ul style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
                                        {project.repository.languages.map((lang, index) => (
                                                <div key={index} style={{alignItems: 'center', display: 'flex', gap: 10}}>
                                                        <p style={{fontSize: 20, color: lang.color}}>•</p>
                                                        <p style={{fontSize: 18}}>{lang.lang}</p>
                                                        <p style={{fontSize: 18, color: '#9198a1'}}>{lang.percentage.toFixed(1)}%</p>
                                                </div>
                                        ))}
                                </ul>
                        </div>
                </div>
                </RadixTooltip>
        );
}
