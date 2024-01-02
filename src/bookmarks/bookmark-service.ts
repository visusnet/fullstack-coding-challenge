import { Repository } from "../gitHub/repository";
import { RepositoryStorage } from "../storage/repository-storage";

export class BookmarkService {
  constructor(private readonly repositoryStorage: RepositoryStorage) {}

  bookmarkRepository(repository: Repository): void {
    this.repositoryStorage.storeRepository(repository);
  }

  getBookmarkedRepositories(): Repository[] {
    return this.repositoryStorage.loadRepositories();
  }
}
