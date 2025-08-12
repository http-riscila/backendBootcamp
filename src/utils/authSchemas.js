import z from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { error: 'Nome deve conter pelo menos 3 caracteres' })
      .max(50)
      .trim(),
    email: z.email().lowercase(),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        error:
          'Password must include at least: 1 lowercase letter, 1 uppercase letter and a number',
      }),
    bio: z.string().min(2).max(100).trim().optional(),
  }),
});
