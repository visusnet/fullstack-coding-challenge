import express, { Express } from "express";
import * as gitHub from "./gitHub/routes";

const app: Express = express();
/* c8 ignore next */
const port = process.env.PORT ?? 3000;

app.use(express.json());

gitHub.registerRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
