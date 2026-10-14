import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import RadixTooltip from 'react-radix-tooltip';

export type Repository = {
        url: String,
        author: String,
        repo: String,
};

export type Project = {
        name: String
        description: String
        repository: Repository
        icon?: string | Blob | undefined
};

const cardColor = "#101a21";
const cardColorDown = "#17232b";

const modalContent = (
        <div style={{borderWidth: 1, borderColor: 'red', width: 500, height: 500}}>
                <h1>This is a project lol</h1>
        </div>
);

export async function loadProjects() : Promise<Project[]> {
        const response = await fetch("/projects.json");
        const jsonArray = await response.json() as any;

        const newProjects = [];

        for (const json of jsonArray) {
                const repositoryUrl = json.repository;

                const author = repositoryUrl.split("github.com/")[1].split("/")[0];

                const repository = {
                        url: repositoryUrl,
                        author: author,
                        repo: repositoryUrl.split(author+"/")[1]
                } as Repository;

                // TODO: get the languages as well
                // https://api.github.com/repos/samisadeveloper/Web-Virtual-Display/languages

                const project = {
                        name: json.name,
                        description: json.description,
                        repository: repository,
                        icon: ""
                } as Project;

                newProjects.push(project);
        }

        return newProjects;
}

export default function ProjectCard({project, setModal}: {project: Project, setModal: Dispatch<SetStateAction<ReactNode>>}) {
        const [hovered, setHovered] = useState(false);

        useEffect(() => {
                async function getLanguages() {
                        

                        const url = "https://api.github.com/repos/samisadeveloper/Web-Virtual-Display/languages";

                        const response = await fetch(url);
                        const json = await response.json();

                        console.log(json);
                }

                getLanguages();
        })

        return (
                <RadixTooltip
                content={
                        <div>
                        <h1>Click to learn more</h1>
                        </div>
                }
                placement='bottom'
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

                                <p style={{ fontSize: 18, width: 1200, }}>{project.description}</p>
                        </div>
                </div>
                </RadixTooltip>
        );
}
