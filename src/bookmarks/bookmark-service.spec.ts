import { InMemoryRepositoryStorage } from "../storage/in-memory-repository-storage";
import { repositoryDouble } from "../test/doubles";
import { BookmarkService } from "./bookmark-service";

describe("BookmarkService", () => {
  const bookmarkService = new BookmarkService(new InMemoryRepositoryStorage());

  it("bookmarks a repository", () => {
    const repository = repositoryDouble();
    bookmarkService.bookmarkRepository(repository);
    expect(bookmarkService.getBookmarkedRepositories()).toEqual([repository]);
  });
});
