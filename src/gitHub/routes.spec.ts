import express from "express";
import request from "supertest";
import { repositoryDouble } from "../test/doubles";
import { registerRoutes } from "./routes";

jest.mock("./repositoryLoader", () => ({
  loadPopularRepositoriesCreatedLastWeek: jest.fn(),
}));

describe("/popularRepositoriesCreatedLastWeek", () => {
  const app = express();
  registerRoutes(app);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a list of popular repositories created last week", async () => {
    (
      jest.requireMock("./repositoryLoader")
        .loadPopularRepositoriesCreatedLastWeek as jest.Mock
    ).mockResolvedValue([repositoryDouble()]);

    const response = await request(app)
      .get("/popularRepositoriesCreatedLastWeek")
      .set("Accept", "application/json")
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8",
    );
    expect(response.body).toEqual([repositoryDouble()]);
  });

  it("returns a 500 response if an error occurs", async () => {
    (
      jest.requireMock("./repositoryLoader")
        .loadPopularRepositoriesCreatedLastWeek as jest.Mock
    ).mockRejectedValue(new Error("Something went wrong"));

    const response = await request(app)
      .get("/popularRepositoriesCreatedLastWeek")
      .set("Accept", "application/json")
      .send();

    expect(response.statusCode).toBe(500);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8",
    );
    expect(response.body).toEqual({ error: "Something went wrong" });
  });

  it("filters by language", async () => {
    (
      jest.requireMock("./repositoryLoader")
        .loadPopularRepositoriesCreatedLastWeek as jest.Mock
    ).mockResolvedValue([repositoryDouble()]);

    const response = await request(app)
      .get("/popularRepositoriesCreatedLastWeek?language=TypeScript")
      .set("Accept", "application/json")
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8",
    );
    expect(response.body).toEqual([repositoryDouble()]);
  });
});
