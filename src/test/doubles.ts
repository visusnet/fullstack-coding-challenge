import { Repository } from "../gitHub/repository";
import { GitHubRepository } from "../gitHub/repositoryLoader";

export function githubRepositoryDouble(
  overrides: Partial<GitHubRepository> = {},
): GitHubRepository {
  return {
    id: 1,
    name: "fullstack-coding-challenge",
    html_url: "https://github.com/visusnet/fullstack-coding-challenge",
    description: "",
    stargazers_count: 1,
    language: "TypeScript",
    ...overrides,
  };
}

export function repositoryDouble(): Repository {
  return {
    name: "fullstack-coding-challenge",
    htmlUrl: "https://github.com/visusnet/fullstack-coding-challenge",
    description: "",
    numberOfStars: 1,
  };
}
