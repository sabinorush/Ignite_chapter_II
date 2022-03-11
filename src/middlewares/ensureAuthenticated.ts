import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error("Token missing!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "de704ccdaf8544d3ef44907604e1e0ab") as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if(!user) {
      throw new Error("user does not exists!");
    }

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}