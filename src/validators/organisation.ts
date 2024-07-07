import { z } from "zod";

export const createOrganisation = z.object({
  name: z.string({ message: 'Organisation name is required' }),
  description: z.string().optional()
});

export const addUser = z.object({
  userId: z.string({ message: 'User ID is required to add a user to an organisation' })
});

export type createOrg = z.infer<typeof createOrganisation>;