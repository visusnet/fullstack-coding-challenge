import { Repository } from "../gitHub/repository";

export class InMemoryRepositoryStorage {
  private readonly persistedRepositories: Repository[] = [];

  public storeRepository(repository: Repository): void {
    this.persistedRepositories.push(repository);
  }

  public loadRepositories(): Repository[] {
    return this.persistedRepositories;
  }
}
