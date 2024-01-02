import { Repository } from "./repository";

export async function loadPopularRepositories(): Promise<Repository[]> {
  await fetch(
    "https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc",
  );
  return [];
}
