import { loadPopularRepositoriesCreatedLastWeek } from "./repositoryLoader";
import { Express, Request, Response } from "express";

export function registerRoutes(app: Express): void {
  app.get(
    "/popularRepositoriesCreatedLastWeek",
    async (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");

      const language: string | undefined = req.query.language as
        | string
        | undefined;

      try {
        const repositories =
          await loadPopularRepositoriesCreatedLastWeek(language);
        res.send(repositories);
      } catch (error: unknown) {
        res.status(500).send({ error: (error as Error).message });
      }
    },
  );
}
