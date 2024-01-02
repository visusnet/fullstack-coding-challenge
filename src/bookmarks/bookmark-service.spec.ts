import { InMemoryRepositoryStorage } from "../storage/in-memory-repository-storage";
import { repositoryDouble } from "../test/doubles";
import { BookmarkService } from "./bookmark-service";

describe("BookmarkService", () => {
  it("bookmarks a repository", () => {
    const bookmarkService = new BookmarkService(
      new InMemoryRepositoryStorage(),
    );
    const repository = repositoryDouble();
    bookmarkService.bookmarkRepository(repository);
    expect(bookmarkService.getBookmarkedRepositories()).toEqual([repository]);
  });

  it("does not bookmark a repository twice", () => {
    const bookmarkService = new BookmarkService(
      new InMemoryRepositoryStorage(),
    );
    const repository = repositoryDouble();
    bookmarkService.bookmarkRepository(repository);
    expect(() => {
      bookmarkService.bookmarkRepository(repository);
    }).toThrow("Repository already bookmarked");
    expect(bookmarkService.getBookmarkedRepositories()).toEqual([repository]);
  });
});
