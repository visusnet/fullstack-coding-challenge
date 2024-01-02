import { Repository } from "../gitHub/repository";
import { RepositoryStorage } from "../storage/repository-storage";

export class BookmarkService {
  constructor(private readonly repositoryStorage: RepositoryStorage) {}

  bookmarkRepository(repository: Repository): void {
    if (this.isRepositoryAlreadyBookmarked(repository)) {
      throw new Error("Repository already bookmarked");
    }

    this.repositoryStorage.storeRepository(repository);
  }

  getBookmarkedRepositories(): Repository[] {
    return this.repositoryStorage.loadRepositories();
  }

  private isRepositoryAlreadyBookmarked(repository: Repository): boolean {
    return this.repositoryStorage
      .loadRepositories()
      .some(
        (existingRepository) => existingRepository.name === repository.name,
      );
  }
}
