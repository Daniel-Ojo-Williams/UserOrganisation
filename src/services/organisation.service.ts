import { prisma } from "../config";
import { IOrganisation } from "../types";
import { CustomError, HttpCode } from "../utils";

class OrganisationService implements IOrganisation {
  async getUserRecord(profileUser: string, loggedInUser: string) {
    const userProfile = await prisma.user.findUnique({
      where: { userId: profileUser },
    });

    if (!userProfile)
      throw new CustomError(HttpCode.NOT_FOUND, "User not found", "Not Found");

    if (profileUser !== loggedInUser) {
      // --| If a user is trying to view another user profile, they have to be in at least one organisation together
      const club = await prisma.organisation.findFirst({
        where: {
          AND: [
            { users: { some: { userId: profileUser } } },
            { users: { some: { userId: loggedInUser } } },
          ],
        },
      });

      if (!club)
        throw new CustomError(
          HttpCode.FORBIDDEN,
          "You can only view users in the same organisation as you",
          "Forbidden"
        );
    }

    // @ts-ignore
    delete userProfile.password;
    return userProfile;
  }

  async getUserOrganisations(userId: string) {
    const organisation = await prisma.organisation.findMany({
      where: { users: { every: { userId  }  } }
    });

    return organisation;
  }
}

export default OrganisationService;
