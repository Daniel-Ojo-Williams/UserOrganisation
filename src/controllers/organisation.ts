import { Request, Response } from "express";
import { IOrganisation } from "../types";
import { CustomError, HttpCode } from "../utils";

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

      res
        .status(HttpCode.BAD_REQUEST)
        .json({
          message: "Authentication unsuccessful",
          status: "Bad request",
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

      res
        .status(HttpCode.BAD_REQUEST)
        .json({
          message: "Authentication unsuccessful",
          status: "Bad request",
        });
    }
  }

}

export default Organisation;
