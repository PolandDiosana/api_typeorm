import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { validateRequest } from "../_middleware/validate-request";
import { Role } from "../_helpers/role";
import { userService } from "./user.service";

export const router = express.Router();

// Routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getById(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.create(req.body);
    res.json({ message: "User created" });
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.update(parseInt(req.params.id), req.body);
    res.json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
}

async function _delete(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.delete(parseInt(req.params.id));
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

function createSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });

  validateRequest(req, res, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    title: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string().valid(Role.Admin, Role.User),
    email: Joi.string(),
    password: Joi.string().min(6),
    confirmPassword: Joi.string().valid(Joi.ref("password")),
  });

  validateRequest(req, res, next, schema); 
}

