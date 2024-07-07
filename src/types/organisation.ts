import { Organisation, User } from "@prisma/client";

export interface IOrganisation{
  getUserRecord: (profileUser: string, loggedInUser: string) => Promise<User>;
  getUserOrganisations: (userId: string) => Promise<Organisation[]>;
  getOrganisation: (orgId: string) => Promise<Organisation>;
  createOrganisation: (userId: string,name: string, description?: string) => Promise<Organisation>;
  addUserToOrg: (userId: string, orgId: string) => Promise<void>;
}