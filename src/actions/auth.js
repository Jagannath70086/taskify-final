"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";


const passwordRequirements = new RegExp(
  "^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]:\";'<>?,./]).{8,}$"
);

const userSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .regex(/^[a-zA-Z\s]+$/, "Name must not contain special characters or numbers"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRequirements,
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
      ),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
    terms: z.literal("on", {
      errorMap: () => ({
        message: "You must accept the Terms of Service and Privacy Policy.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function registerUser(prevState, formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const terms = formData.get("terms");

    const parsed = userSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
      terms,
    });

    if (!parsed.success) {
      return {
        errors: parsed.error.flatten().fieldErrors,
        success: false,
        message: "Registration failed.",
      };
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: "User already exists",
        success: false,
        errors: { email: ["User already exists with this email."] },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      message: "Successfully registered, please login.",
      success: true,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      message: "Some error occurred",
      success: false,
      errors: { general: ["An unexpected error occurred."] },
    };
  }
}

export async function socialLogin(
  provider
) {}
