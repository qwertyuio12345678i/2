import { z } from 'zod';

export const User = z
  .object({
    email: z.string().email({ message: 'Enter valid email' }),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain 1 capital letter' })
      .regex(/[a-z]/, { message: 'Password must contain 1 lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain 1 digit' }),

    confirm: z.string(),
    date: z.number().nonnegative(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['password'],
  });

export const Note = z.object({
  title: z.string().min(1, { message: 'Note must have a title' }),
  text: z.string().optional(),
  date: z.number().nonnegative(),
  authorId: z.number().nonnegative(),
});

/*

export const User = z
  .object({
    email: z.string().email({ message: 'Введите правильный email' }),
    password: z
      .string()
      .min(8, { message: 'Пароль должен содержать хотя бы 8 символов' })
      .refine(
        (password) =>
          /[A-Z]/.test(password) &&
          /[a-z]/.test(password) &&
          /[0-9]/.test(password),
        {
          message: `Password isn't valid`,
          path: ['password'],
        }
      ),

    confirm: z.string(),
    date: z.number().nonnegative(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });


*/
