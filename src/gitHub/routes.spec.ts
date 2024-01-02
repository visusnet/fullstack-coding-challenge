import express from "express";
import request from "supertest";
import { repositoryDouble } from "../test/doubles";
import { registerRoutes } from "./routes";

jest.mock("./repositoryLoader", () => ({
  loadPopularRepositoriesCreatedLastWeek: jest
    .fn()
    .mockResolvedValue([
      jest.requireActual("../test/doubles").repositoryDouble(),
    ]),
}));

describe("/popularRepositoriesCreatedLastWeek", () => {
  const app = express();
  registerRoutes(app);

  it("returns a list of popular repositories created last week", async () => {
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
});
