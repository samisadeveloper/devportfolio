const REPOS_BASE_URL = "https://api.github.com/repos";
const USER_CONTENT_BASE_URL = "https://raw.githubusercontent.com";
const COLORS_API_URL = "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"

type Language = {
        lang: String,
        percentage: number
        color: string | undefined,
}

// TODO: also include repository website
export type Repository = {
        url: String,
        author: String,
        repo: String,
        description: String,
        languages: Language[]
        commitHash: String
};

async function getLanguages(author: String, repo: String) {
        const languages = [] as Language[];

        const response = await fetch(`${REPOS_BASE_URL}/${author}/${repo}/languages`);
        const json = (await response.json()) as Record<string, number>;

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
        const response = await fetch(`${REPOS_BASE_URL}/${author}/${repo}/git/ref/heads/${branch}`);
        const json = await response.json() as any;

        return json.object.sha;
}

async function getRepositoryData(author: String, repo: String) {
        const response = await fetch(`${REPOS_BASE_URL}/${author}/${repo}`, {
                headers: {
                        "Accept": "application/vnd.github+json",
                }
        });

        return await response.json();
}

export async function getResourcePath(repository: Repository, path: String) {
        const author = repository.author;
        const repo = repository.repo;
        const hash = repository.commitHash;

        return `${USER_CONTENT_BASE_URL}/${author}/${repo}/${hash}/${path}`;
}

export async function getRepositoryFromUrl(url: String) {
        const author = url.split("github.com/")[1].split("/")[0];
        const repo = url.split(author+"/")[1];

        const languages = await getLanguages(author, repo);
        const commitHash = await getLatestCommit(author, repo, "main");

        const repositoryInfo = await getRepositoryData(author, repo) as any;

        return {
                url: url,
                author: author,
                repo: repo,
                description: repositoryInfo.description,
                languages: languages,
                commitHash: commitHash
        } as Repository;
}
