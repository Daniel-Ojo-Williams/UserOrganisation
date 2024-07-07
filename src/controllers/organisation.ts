import { Request, Response } from "express";
import { IOrganisation } from "../types";
import { CustomError, HttpCode } from "../utils";
import { createOrg } from "../validators";

class Organisation {
  constructor(private readonly OrganisationService: IOrganisation){}

  async getUserProfile(req: Request, res: Response) {
    try {
      const { userId } = req.user;
      const { id } = <{ id: string }>req.params;

      const user = await this.OrganisationService.getUserRecord(id, userId);

      res.status(HttpCode.OK).json({ status: 'success', message: 'Fetched user data successfuly', data: user });
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(error.status_code)
          .json({
            message: error.message,
            status: error.status,
            statusCode: error.status_code,
          });

      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        status: "Server error",
        serverMessage: (error as Error).message,
      });
    }
  }

  async getUserOrganisaions(req: Request, res: Response) {
    try {
      const { userId } = req.user;

      const organisations = await this.OrganisationService.getUserOrganisations(userId);

      res.status(HttpCode.OK).json({ status: 'success', message: 'Fetched user organisations successfuly', data: { organisations } });
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(error.status_code)
          .json({
            message: error.message,
            status: error.status,
            statusCode: error.status_code,
          });

      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        status: "Server error",
        serverMessage: (error as Error).message,
      });
    }
  }

  async getOrganisation(req: Request, res: Response) {
    try {
      const { orgId } = <{ orgId: string }>req.params;

      const organisation = await this.OrganisationService.getOrganisation(orgId);

      res.status(HttpCode.OK).json({ status: 'success', message: 'Fetched organisation successfuly', data: organisation });
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(error.status_code)
          .json({
            message: error.message,
            status: error.status,
            statusCode: error.status_code,
          });

      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        status: "Server error",
        serverMessage: (error as Error).message,
      });
    }
  }

  async createOrganisation(req: Request, res: Response) {
    try {
      const { userId } = req.user;
      const { name, description } = <createOrg>req.body;

      const organisation = await this.OrganisationService.createOrganisation(userId, name, description);

      res.status(HttpCode.OK).json({ status: 'success', message: 'Organisation created successfuly', data: organisation });
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(error.status_code)
          .json({
            message: error.message,
            status: error.status,
            statusCode: error.status_code,
          });

      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        status: "Server error",
        serverMessage: (error as Error).message,
      });
    }
  }

  async addUserToOrg(req: Request, res: Response) {
    try {
      const { userId } = <{ userId: string }>req.body;
      const { orgId } = <{ orgId: string }>req.params;

      await this.OrganisationService.addUserToOrg(userId, orgId);

      res.status(HttpCode.OK).json({ status: 'success', message: 'User added to organisation successfuly' });
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(error.status_code)
          .json({
            message: error.message,
            status: error.status,
            statusCode: error.status_code,
          });

      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({
          message: "Something went wrong",
          status: "Server error",
          serverMessage: (error as Error).message
        });
    }
  }

}

export default Organisation;
