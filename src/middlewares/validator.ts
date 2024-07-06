import { AnyZodObject, ZodError } from "zod";
import { type Request, type Response, type NextFunction } from 'express-serve-static-core';
import { HttpCode } from "../utils";

export const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.method === 'GET') {
        const query = req.query && schema.parse(req.query);
        req.query = query;
      } else {
        const body = req.body && schema.parse(req.body);
        req.body = body;
      }
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errors = error.issues.map(issue => {
          return {
            path: issue.path[0],
            message: issue.message
          }
        })
        ;
        return res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ errors });
      }

      if (error instanceof Error) {
        return res.status(HttpCode.BAD_REQUEST).json({ error: true, message: error.message })
      }

      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Something went wrong', serverMessage: error.message });
    }
  }
};
