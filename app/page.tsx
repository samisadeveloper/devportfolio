import Header from './components/Header';
import ProjectsView from './components/ProjectsView';
import { loadProjects, Project } from './util/github';

export const dynamic = "force-static"

export default async function Home() {
        const projects = await loadProjects() as Project[];

        return (
                <>
                        <Header />

                        <ProjectsView projects={projects} />
                </>
        );
}
