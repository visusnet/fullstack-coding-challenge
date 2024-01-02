import { loadPopularRepositoriesCreatedLastWeek } from "./repositoryLoader";
import { Express, Request, Response } from "express";

export function registerRoutes(app: Express): void {
  app.get(
    "/popularRepositoriesCreatedLastWeek",
    async (_: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");

      try {
        const repositories = await loadPopularRepositoriesCreatedLastWeek();
        res.send(repositories);
      } catch (error: unknown) {
        res.status(500).send({ error: (error as Error).message });
      }
    },
  );
}
