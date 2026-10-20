import { Ref, useEffect, useState } from "react";
import { getResourcePath, Project } from "../util/github";

import Markdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { IoLogoGithub } from "react-icons/io";
import { motion } from "motion/react";
import { CgWebsite } from "react-icons/cg";

async function updatePath(project: Project, text: string, regex: RegExp) {
        const matches = [...text.matchAll(regex)];

        const replacements = await Promise.all(
                matches.map(async (match) => {
                        const originalPath = match[0];

                        const newPath = await getResourcePath(project.repository, originalPath); 

                        return {
                                start: match.index,
                                end: match.index + originalPath.length,
                                newValue: newPath
                        };
                })
        );

        let updatedText = text;
        for (let i = replacements.length - 1; i >= 0; i--) {
                const { start, end, newValue } = replacements[i];
                updatedText = updatedText.slice(0, start) + newValue + updatedText.slice(end);
        }

        return updatedText;
}

export default function ProjectModal({project, dialogRef}: {project: Project | undefined, dialogRef: Ref<HTMLDialogElement>}) {
        if (!project) return <div></div>;

        const [readme, setReadme] = useState<string>();

        useEffect(() => {
                async function load(project: Project) {
                        const path = await getResourcePath(project.repository, "README.md");
                        const response = await fetch(path);

                        const text = await response.text();
                        const regex = /(?:\.?[a-zA-Z0-9_\-]+\/)+[a-zA-Z0-9_\-\.]+\.[a-zA-Z0-9]+/g;

                        const updatedText = await updatePath(project, text, regex);

                        setReadme(updatedText);
                }

                if (project) {
                        load(project);
                }
        }, [project]);

        return (
                <motion.dialog

                initial={{y: -120}}
                animate={{y: 0}}
                transition={{duration: 1}}

                style={{outline: 'none', backgroundColor: '#0d1117', justifySelf: 'center', scrollbarWidth: 'none'}}
                ref={dialogRef}>
                        {readme &&
                                <div style={{margin: 15}}>
                                        <div style={{position: 'absolute', display: 'flex', flexDirection: 'row', gap: 15, right: 0, margin: 50}}>
                                                <motion.div
                                                        style={{cursor: 'pointer'}}
                                                        onClick={() => window.open(project.repository.url)}
                                                        whileHover={{scale: 1.1}}
                                                >
                                                        <IoLogoGithub color='#6f7587'  size={55} />
                                                </motion.div>

                                                {project.website &&
                                                        <motion.div>
                                                                <CgWebsite color='#6f7587' size={55} />
                                                        </motion.div>
                                                }
                                        </div>

                                        <div className="markdown-body" style={{fontSize: 18, width: 1200}}>
                                                <Markdown
                                                rehypePlugins={[rehypeRaw]}
                                                components={{
                                                        h1: ({ children }) => <h1 style={{ textAlign: 'left', fontSize: '2em', fontWeight: 'bold' }}>{children}</h1>,
                                                        h2: ({ children }) => <h2 style={{ textAlign: 'left', fontSize: '1.5em', fontWeight: 'bold' }}>{children}</h2>,
                                                        h3: ({ children }) => <h3 style={{ textAlign: 'left', fontSize: '1.25em', fontWeight: 'bold' }}>{children}</h3>,
                                                        p: ({ children }) => <p style={{ textAlign: 'left' }}>{children}</p>
                                                }}
                                                >{readme}</Markdown>
                                        </div>
                                </div>
                        }
                </motion.dialog>
        );
}
