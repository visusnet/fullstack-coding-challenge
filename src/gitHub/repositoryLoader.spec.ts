import { loadPopularRepositoriesCreatedLastWeek } from "./repositoryLoader";

describe("loadPopularRepositoriesCreatedLastWeek", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes an HTTP call to GitHub", async () => {
    mockFetchResponse({ items: [] });

    await loadPopularRepositoriesCreatedLastWeek();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.github.com/search/repositories"),
    );
  });

  it("returns an empty array if the response is empty", async () => {
    mockFetchResponse({ items: [] });

    const repositories = await loadPopularRepositoriesCreatedLastWeek();

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

    const repositories = await loadPopularRepositoriesCreatedLastWeek();

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

    const repositories = await loadPopularRepositoriesCreatedLastWeek();

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

    await expect(loadPopularRepositoriesCreatedLastWeek()).rejects.toThrow(
      "Fetch failed",
    );
  });

  it("handles failed JSON parsing", async () => {
    mockFetchResponse("invalid JSON");

    await expect(loadPopularRepositoriesCreatedLastWeek()).rejects.toThrow(
      "Invalid response payload",
    );
  });

  it("fetches popular repositories created within the last week", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-01-02"));

    mockFetchResponse({ items: [] });

    await loadPopularRepositoriesCreatedLastWeek();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("created:%3E2023-12-26"),
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
