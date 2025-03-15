import { AppDataSource } from "../_helpers/db";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

const userRepository = AppDataSource.getRepository(User);

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(): Promise<User[]> {
  return await userRepository.find();
}

async function getById(id: number): Promise<User> {
  return await userRepository.findOneBy({ id });
}

async function create(params: Partial<User> & { password: string}): Promise<void> {
  if (await userRepository.findOneBy({ email: params.email })) {
    throw new Error(`Email "${params.email}" is already registered`);
  }

  const user = userRepository.create(params);
  user.passwordHash = await bcrypt.hash(params.password, 10);  

  await userRepository.save(user); 
}

async function update(id: number, params: Partial<User>): Promise<void> {
  const user = await getById(id);
  Object.assign(user, params);
  await userRepository.save(user);
}

async function _delete(id: number): Promise<void> {
  await userRepository.delete(id);
}
