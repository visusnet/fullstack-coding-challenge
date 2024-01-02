import express from "express";
import request from "supertest";
import { repositoryDouble } from "../test/doubles";
import { registerRoutes } from "./routes";

jest.mock("./bookmark-service", () => ({
  BookmarkService: jest.fn().mockImplementation(() => ({
    getBookmarkedRepositories: jest.fn().mockReturnValue([repositoryDouble()]),
  })),
}));

describe("GET /bookmarks", () => {
  const app = express();
  app.use(express.json());
  registerRoutes(app);

  it("returns a list of bookmarked repositories", async () => {
    const response = await request(app)
      .get("/bookmarks")
      .set("Accept", "application/json")
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8",
    );
    expect(response.body).toEqual([repositoryDouble()]);
  });
});
