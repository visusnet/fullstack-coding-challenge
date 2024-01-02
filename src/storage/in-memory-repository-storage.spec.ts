import { repositoryDouble } from "../test/doubles";
import { InMemoryRepositoryStorage } from "./in-memory-repository-storage";

describe("store and load", () => {
  it("stores and loads a repository", () => {
    const repository = repositoryDouble();
    const storage = new InMemoryRepositoryStorage();
    storage.storeRepository(repository);
    expect(storage.loadRepositories()).toEqual([repository]);
  });
});
