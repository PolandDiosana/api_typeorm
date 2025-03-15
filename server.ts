import "rootpath"; 
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { errorHandler } from "./_middleware/error-handler";
import { router as userRoutes } from "./users/users.controller";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoutes);

app.use((err: string | Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

const port: number = process.env.NODE_ENV === "production" ? Number(process.env.PORT) || 80 : 4000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
