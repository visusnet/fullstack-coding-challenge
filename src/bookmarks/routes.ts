import { isRepository } from "../gitHub/repository";
import { InMemoryRepositoryStorage } from "../storage/in-memory-repository-storage";
import { BookmarkService } from "./bookmark-service";
import { Express, Request, Response } from "express";

export function registerRoutes(app: Express): void {
  const bookmarkService = new BookmarkService(new InMemoryRepositoryStorage());

  app.put("/bookmarks", async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");

    try {
      if (!isRepository(req.body)) {
        throw new Error("Invalid repository");
      }

      bookmarkService.bookmarkRepository(req.body);
      res.send(req.body);
    } catch (error: unknown) {
      res.status(500).send({ error: (error as Error).message });
    }
  });

  app.get("/bookmarks", async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");

    res.send(bookmarkService.getBookmarkedRepositories());
  });
}
