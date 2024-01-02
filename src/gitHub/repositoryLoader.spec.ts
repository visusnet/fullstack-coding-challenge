import { loadPopularRepositories } from "./repositoryLoader";

describe("loadPopularRepositories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes an HTTP call to GitHub", async () => {
    mockFetchResponse({ items: [] });

    await loadPopularRepositories();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.github.com/search/repositories"),
    );
  });

  it("returns an empty array if the response is empty", async () => {
    mockFetchResponse({ items: [] });

    const repositories = await loadPopularRepositories();

    expect(repositories).toEqual([]);
  });

  it("returns an array of repositories if the response is not empty", async () => {
    mockFetchResponse({
      items: [
        {
          id: 1,
          name: "fullstack-coding-challenge",
          html_url: "https://github.com/visusnet/fullstack-coding-challenge",
          description: "",
          stargazers_count: 1,
        },
      ],
    });

    const repositories = await loadPopularRepositories();

    expect(repositories).toHaveLength(1);
  });

  it("returns the fetched repositories", async () => {
    mockFetchResponse({
      items: [
        {
          id: 1,
          name: "fullstack-coding-challenge",
          html_url: "https://github.com/visusnet/fullstack-coding-challenge",
          description: "",
          stargazers_count: 1,
        },
      ],
    });

    const repositories = await loadPopularRepositories();

    expect(repositories).toEqual([
      {
        name: "fullstack-coding-challenge",
        htmlUrl: "https://github.com/visusnet/fullstack-coding-challenge",
        description: "",
        numberOfStars: 1,
      },
    ]);
  });

  it("handles failed fetch request", async () => {
    mockFetchWithFailure();

    await expect(loadPopularRepositories()).rejects.toThrow("Fetch failed");
  });

  it("handles failed JSON parsing", async () => {
    mockFetchResponse("invalid JSON");

    await expect(loadPopularRepositories()).rejects.toThrow(
      "Invalid response payload",
    );
  });
});

function mockFetchResponse(response: any): void {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: async () => response,
  } as Response);
}

function mockFetchWithFailure(): void {
  jest.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Fetch failed"));
}
