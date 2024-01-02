import { Repository } from "../gitHub/repository";
import { InMemoryRepositoryStorage } from "./in-memory-repository-storage";

describe("store and load", () => {
  it("stores and loads a repository", () => {
    const repository: Repository = {
      name: "fullstack-coding-challenge",
      htmlUrl: "https://github.com/visusnet/fullstack-coding-challenge",
      description: "",
      numberOfStars: 1,
    };
    const storage = new InMemoryRepositoryStorage();
    storage.storeRepository(repository);
    expect(storage.loadRepositories()).toEqual([repository]);
  });
});
