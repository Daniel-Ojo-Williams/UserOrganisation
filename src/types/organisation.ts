import { Organisation, User } from "@prisma/client";

export interface IOrganisation{
  getUserRecord: (profileUser: string, loggedInUser: string) => Promise<User>;
  getUserOrganisations: (userId: string) => Promise<Organisation[]>
}