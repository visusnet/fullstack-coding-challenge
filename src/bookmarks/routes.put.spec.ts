import express from "express";
import request from "supertest";
import { repositoryDouble } from "../test/doubles";
import { registerRoutes } from "./routes";

describe("PUT /bookmarks", () => {
  const app = express();
  app.use(express.json());
  registerRoutes(app);

  it("bookmarks a repository", async () => {
    const response = await request(app)
      .put("/bookmarks")
      .set("Accept", "application/json")
      .send(repositoryDouble());

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8",
    );
    expect(response.body).toEqual(repositoryDouble());
  });

  it("rejects an invalid repository", async () => {
    const response = await request(app)
      .put("/bookmarks")
      .set("Accept", "application/json")
      .send({});

    expect(response.statusCode).toBe(500);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8",
    );
    expect(response.body).toEqual({ error: "Invalid repository" });
  });
});
