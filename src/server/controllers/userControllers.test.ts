import { type Response, type Request } from "express";
import User from "../../database/models/User.js";
import { type UserDetailsStructure } from "../types.js";
import { getUsers, registerUser } from "./userControllers.js";
import bcrypt from "bcrypt";

describe("Given a getUsers controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 200", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
      } as Partial<Response>;
      const next = jest.fn();

      const expectedStatusCode = 200;

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({}),
      }));

      await getUsers(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});

describe("Given a registerUser controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status method with 201", async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
      } as Partial<Response>;
      const next = jest.fn();

      const newUser: UserDetailsStructure = {
        username: "Alex",
        password: "asdfghjklñ",
        email: "alex@gmail.com",
        avatar: "alex.png",
      };

      const expectedStatusCode = 201;

      req.body = newUser;
      bcrypt.hash = jest.fn().mockResolvedValue("asda123hjasd123hjk");
      User.create = jest.fn().mockResolvedValue(newUser);

      await registerUser(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
