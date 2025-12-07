/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";

export const InterestEnum = z.enum([
  "MUSIC","SPORTS","HIKING","TRAVEL","COOKING","READING","DANCING",
  "GAMING","TECHNOLOGY","PHOTOGRAPHY","ART","MOVIES","FITNESS","YOGA",
  "CYCLING","RUNNING","CAMPING","FISHING","LANGUAGES","FOOD",
  "VOLUNTEERING","GARDENING","WRITING","FASHION","BUSINESS","FINANCE",
  "MEDITATION","DIY","PETS","SOCIALIZING","OTHER",
]);

export const registerValidation = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),

  client: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    bio: z
      .string()
      .min(10, "Bio must be at least 10 characters long"),

    contactNumber: z
      .string()
      .min(11, "Contact number must be at least 11 digits"),

    location: z
      .string()
      .min(3, "Location must be at least 3 characters"),

    interests: z
      .array(InterestEnum)
      .min(1, "At least one interest must be selected"),

    // optional profilePhoto if you want to allow sending a URL (backend will overwrite after upload)
    profilePhoto: z.string().url().optional(),
  }),
});

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });