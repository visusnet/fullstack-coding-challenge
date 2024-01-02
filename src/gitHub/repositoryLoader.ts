import { Repository } from "./repository";

export async function loadPopularRepositoriesCreatedLastWeek(
  language?: string,
): Promise<Repository[]> {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=created:%3E${sevenDaysBeforeToday()}&sort=stars&order=desc`,
  );

  const payload = await response.json();

  if (!isGitHubRepositoryResponsePayload(payload)) {
    throw new Error("Invalid response payload");
  }

  return toRepositories(
    typeof language !== "undefined"
      ? payload.items.filter(
          (item: any) =>
            item.language?.toLocaleLowerCase() === language.toLocaleLowerCase(),
        )
      : payload.items,
  );
}

function toRepositories(gitHubRepositories: GitHubRepository[]): Repository[] {
  return gitHubRepositories.map((item: any) => ({
    name: item.name,
    htmlUrl: item.html_url,
    description: item.description,
    numberOfStars: item.stargazers_count,
  }));
}

function sevenDaysBeforeToday(): string {
  const today = new Date();
  const sevenDaysBefore = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return sevenDaysBefore.toISOString().split("T")[0];
}

type GitHubRepositoryResponsePayload = {
  items: GitHubRepository[];
};

export type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  stargazers_count: number;
  language: string | null;
};

function isGitHubRepositoryResponsePayload(
  payload: unknown,
): payload is GitHubRepositoryResponsePayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    Array.isArray((payload as any).items) &&
    (payload as any).items.every(isGitHubRepository)
  );
}

function isGitHubRepository(payload: unknown): payload is GitHubRepository {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as any).name === "string" &&
    typeof (payload as any).html_url === "string" &&
    typeof (payload as any).description !== "undefined" &&
    typeof (payload as any).stargazers_count === "number"
  );
}
