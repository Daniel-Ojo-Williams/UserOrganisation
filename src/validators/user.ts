import { z } from "zod"
export const createUser = z.object({
  firstName: z.string({ message: 'First name is required' }),
  lastName: z.string({ message: 'Last name is required' }),
  email: z.string({ message: 'Email is required' }),
  password: z.string({ message: 'Password is required' }),
  phone: z.string().optional()
});

export const login = z.object({
  password: z.string({ message: 'Password is required' }),
  email: z.string({ message: 'Email is required' })
})

export type newUser = z.infer<typeof createUser>;
export type loginUser = z.infer<typeof login>;