import { Repository } from "./repository";

export async function loadPopularRepositories(): Promise<Repository[]> {
  const response = await fetch(
    "https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc",
  );
  return toRepositories(
    (await response.json()) as GitHubRepositoryResponsePayload,
  );
}

function toRepositories(
  githubRepositoriesResponsePayload: GitHubRepositoryResponsePayload,
): Repository[] {
  return githubRepositoriesResponsePayload.items.map((item: any) => ({
    name: item.name,
    htmlUrl: item.html_url,
    description: item.description,
    numberOfStars: item.stargazers_count,
  }));
}

type GitHubRepositoryResponsePayload = {
  items: GitHubRepository[];
};

type GitHubRepository = {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
};
