import { loadPopularRepositories } from "./repositoryLoader";

describe("loadPopularRepositories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes an HTTP call to GitHub", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: async () => [],
    } as Response);

    await loadPopularRepositories();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.github.com/search/repositories"),
    );
  });

  it("returns an empty array if the response is empty", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: async () => [],
    } as Response);

    const repositories = await loadPopularRepositories();

    expect(repositories).toEqual([]);
  });
});
