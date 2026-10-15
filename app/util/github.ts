import projectsData from "../projects.json"

const REPOS_BASE_URL = "https://api.github.com/repos";
const USER_CONTENT_BASE_URL = "https://raw.githubusercontent.com";
const COLORS_API_URL = "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"

const getFetchHeaders = () => {
    const token = process.env.GITHUB_TOKEN || '';
    return {
        "Accept": "application/vnd.github+json",
        "User-Agent": "NextJS-Portfolio-App",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
};

async function ghFetch(url: string) {
    const response = await fetch(url, { headers: getFetchHeaders() });
    if (!response.ok) {
        const body = await response.text();
        throw new Error(`${response.status} ${response.statusText} for ${url}: ${body.slice(0, 300)}`);
    }
    return response.json();
}

type Language = {
        lang: string,
        percentage: number
        color: string | undefined,
}

export type Repository = {
        url: string,
        author: string,
        repo: string,
        description: string,
        languages: Language[]
        commitHash: string
};

export type Project = {
        name: string
        repository: Repository
        icon?: string | Blob | undefined
};

async function getLanguages(author: String, repo: String) {
        const languages = [] as Language[];

        const json = await ghFetch(`${REPOS_BASE_URL}/${author}/${repo}/languages`) as Record<string, number>;

        const sumLines = Object.values(json).reduce((sum: number, value: number) => sum + value, 0);

        const responseColors = await fetch(COLORS_API_URL);
        const colors = await responseColors.json() as any;

        for (const language of Object.entries(json)) {
                const lang = language[0];
                const lines = language[1];
                const percentage = (lines/sumLines)*100;

                const color = colors[lang]?.color || "#9198a1";

                languages.push({
                        lang: lang,
                        percentage: percentage,
                        color: color
                });
        }

        return languages;
}

async function getLatestCommit(author: String, repo: String, branch = "main") {
        const json = await ghFetch(`${REPOS_BASE_URL}/${author}/${repo}/git/ref/heads/${branch}`) as any;

        return json.object.sha;
}

async function getRepositoryData(author: String, repo: String) {
        const json = await ghFetch(`${REPOS_BASE_URL}/${author}/${repo}`);

        return json;
}

export async function getResourcePath(repository: Repository, path: String) {
        const author = repository.author;
        const repo = repository.repo;
        const hash = repository.commitHash;

        return `${USER_CONTENT_BASE_URL}/${author}/${repo}/${hash}/${path}`;
}

async function getRepositoryFromUrl(url: String) {
        const author = url.split("github.com/")[1].split("/")[0];
        const repo = url.split(author+"/")[1];

        const [languages, commitHash, repositoryInfo] = await Promise.all([
                getLanguages(author, repo),
                getLatestCommit(author, repo, "main"),
                getRepositoryData(author, repo) as any
        ]);

        return {
                url: url,
                author: author,
                repo: repo,
                description: repositoryInfo.description,
                languages: languages,
                commitHash: commitHash
        } as Repository;
}

export async function loadProjects() : Promise<Project[]> {
        const newProjects = [];
        const errors: string[] = [];

        console.log("token present:", !!process.env.GITHUB_TOKEN, "length:", process.env.GITHUB_TOKEN?.length);

        for (const json of projectsData) {
                try {
                        const repository = await getRepositoryFromUrl(json.repository);

                        const icon = await getResourcePath(repository, ".github/media/icon.svg");

                        const project = {
                                name: json.name,
                                repository: repository,
                                icon: icon,
                        } as Project;

                        newProjects.push(project);
                } catch (error) {
                        errors.push(`${json.name}: ${(error as Error).message}`);
                        console.error(`Error compiling project ${json.name}:`, error);
                }
        }

        if (newProjects.length === 0 && projectsData.length > 0) {
                throw new Error("All projects failed:\n" + errors.join("\n"));
        }

        return newProjects;
}
