import { MouseEventHandler } from 'react';
import RadixTooltip from 'react-radix-tooltip';
import { motion } from 'motion/react';
import { Project } from '../util/github';

const cardColor = "#101a21";
const cardColorDown = "#17232b";

export default function ProjectCard({project, onClick}: {project: Project, onClick: MouseEventHandler<HTMLDivElement>}) {
        return (
                <RadixTooltip
                content={
                        <div>
                        <h1>Click to learn more</h1>
                        </div>
                }
                delayDuration={200}
                placement='top'
                arrow={true}
                >

                <motion.div

                whileHover={{ backgroundColor: cardColorDown }}

                style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.15)',
                        backgroundColor: cardColor,
                        borderColor: "white",
                        borderRadius: 15,
                        margin: 25,
                        width: '95%',
                        cursor: 'pointer',
                }}

                onClick={onClick}
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
                                <h1 style={{fontSize: 25, fontWeight: 450}}>Languages</h1>

                                <div style={{overflow: 'hidden', borderRadius: 12, display: 'flex', marginTop: 5, flexWrap: 'nowrap', width: '80%', height: 12}}>
                                        {project.repository.languages.map((lang, index) => (
                                                <div key={index} style={{backgroundColor: lang.color, height: 12, width: `${lang.percentage}%`}}></div>
                                        ))}
                                </div>

                                <ul style={{display: 'flex', marginTop: 10, flexWrap: 'wrap', gap: 10}}>
                                        {project.repository.languages.map((lang, index) => (
                                                <div key={index} style={{height: 20, alignItems: 'center', display: 'flex', gap: 10}}>
                                                        <p style={{fontSize: 35, color: lang.color}}>•</p>
                                                        <p style={{fontSize: 18}}>{lang.lang}</p>
                                                        <p style={{fontSize: 18, color: '#9198a1'}}>{lang.percentage.toFixed(1)}%</p>
                                                </div>
                                        ))}
                                </ul>
                        </div>
                </motion.div>
                </RadixTooltip>
        );
}
