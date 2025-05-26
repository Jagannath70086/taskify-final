"use client";

import React, { ChangeEvent, useEffect, useRef } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaGoogle, FaApple } from "react-icons/fa";

import { registerUser, socialLogin } from "@/actions/auth";
import { toast } from "sonner";

const initialFormState = {
  errors: {},
  success: false,
  message: "",
};

const passwordRequirements = [
  {
    id: "length",
    label: "8+ characters",
    test: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    label: "1 uppercase",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: "number",
    label: "1 number",
    test: (password) => /\d/.test(password),
  },
  {
    id: "special",
    label: "1 special char",
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

const socialLoginProvidersList = [
  {
    name: "Google",
    icon: <FaGoogle className="mr-2 h-4 w-4" />,
    color: "bg-white",
    hoverColor: "hover:bg-slate-50",
    textColor: "text-slate-800",
    borderColor: "border-slate-200",
    action: async () => {
      await socialLogin("google");
    },
  },
  {
    name: "GitHub",
    icon: <FaGithub className="mr-2 h-4 w-4" />,
    color: "bg-slate-800",
    hoverColor: "hover:bg-slate-900",
    textColor: "text-white",
    borderColor: "border-slate-700",
    action: async () => {
      await socialLogin("github");
    },
  },
  {
    name: "Apple",
    icon: <FaApple className="mr-2 h-4 w-4" />,
    color: "bg-black",
    hoverColor: "hover:bg-slate-900",
    textColor: "text-white",
    borderColor: "border-black",
    action: async () => {
      await socialLogin("apple");
    },
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={`w-full py-2.5 px-4 rounded-lg bg-indigo-600 ${
        pending ? "cursor-not-allowed" : "cursor-pointer"
      } text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300/20 dark:focus:ring-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/10 disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {pending ? (
        <>
          <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
          Creating Account...
        </>
      ) : (
        <>
          Create Account
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </>
      )}
    </button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useFormState(registerUser, initialFormState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const errors = state?.errors || {};

  const isFirstRender = useRef(true);

  const validatePasswordRequirement = (requirement) => {
    return requirement.test(password);
  };

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, {
        duration: 5000,
      });
    }
  }, [state.success, state.message]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (state) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [state]);

  return (
    <div className="w-full max-w-lg">
      {" "}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 md:p-8 border border-slate-100 dark:border-slate-700">
        <form action={formAction} className="">
          {" "}
          {state?.message && !state.success && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {state.message}
            </div>
          )}
          {state?.success && state.message && (
            <div className="mb-5 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm">
              {state.message}
            </div>
          )}
          {errors.general && !state.message && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {errors.general}
            </div>
          )}
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <UserIcon className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg border ${
                    errors.name
                      ? "border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-500/30 text-red-500"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500"
                  } bg-white dark:bg-slate-900/70 focus:ring-4 focus:ring-indigo-300/20 dark:focus:ring-indigo-500/20 outline-none transition text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                  placeholder="John Doe"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                />
              </div>
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors.name[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg border ${
                    errors.email
                      ? "border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-500/30 text-red-500"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500"
                  } bg-white dark:bg-slate-900/70 focus:ring-4 focus:ring-indigo-300/20 dark:focus:ring-indigo-500/20 outline-none transition text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                  placeholder="youremail@example.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors.email[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full pl-11 pr-10 py-2.5 rounded-lg border ${
                    errors.password
                      ? "border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-500/30 text-red-500"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500"
                  } bg-white dark:bg-slate-900/70 focus:ring-4 focus:ring-indigo-300/20 dark:focus:ring-indigo-500/20 outline-none transition text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                  placeholder="••••••••"
                  aria-describedby={
                    errors.password
                      ? "password-error"
                      : "password-requirements-info"
                  }
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors.password[0]}
                </p>
              )}
              <div
                id="password-requirements-info"
                className="mt-2 grid grid-cols-2 gap-2"
              >
                {passwordRequirements.map((req) => {
                  const isValid = validatePasswordRequirement(req);
                  return (
                    <div key={req.id} className="flex items-center text-xs">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center mr-1.5 transition-colors duration-200 ${
                          isValid
                            ? "bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700"
                            : "bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        <CheckIcon
                          className={`h-3 w-3 transition-colors duration-200 ${
                            isValid
                              ? "text-green-600 dark:text-green-400"
                              : "text-slate-400 dark:text-slate-500"
                          }`}
                        />
                      </div>
                      <span
                        className={`transition-colors duration-200 ${
                          isValid
                            ? "text-green-700 dark:text-green-400"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {req.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full pl-11 pr-10 py-2.5 rounded-lg border ${
                    errors.confirmPassword ||
                    (confirmPassword && password && !passwordsMatch)
                      ? "border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-500/30"
                      : passwordsMatch && confirmPassword
                      ? "border-green-400 dark:border-green-500 focus:ring-green-300 dark:focus:ring-green-500/20"
                      : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500"
                  } bg-white dark:bg-slate-900/70 focus:ring-4 ${
                    passwordsMatch && confirmPassword
                      ? "focus:ring-green-300/20 dark:focus:ring-green-500/20"
                      : "focus:ring-indigo-300/20 dark:focus:ring-indigo-500/20"
                  } outline-none transition text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                  placeholder="••••••••"
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
                  }
                  aria-invalid={
                    !!errors.confirmPassword ||
                    (confirmPassword && password && !passwordsMatch)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors.confirmPassword[0]}
                </p>
              )}
              {confirmPassword && password && (
                <div className="mt-1">
                  {passwordsMatch ? (
                    <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Passwords match
                    </p>
                  ) : (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      Passwords do not match
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-slate-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:bg-slate-700 dark:focus:ring-indigo-600 dark:ring-offset-slate-800"
                  aria-describedby={errors.terms ? "terms-error" : undefined}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="text-slate-600 dark:text-slate-400"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            {errors.terms && (
              <p
                id="terms-error"
                className="mt-1 text-sm text-red-500 dark:text-red-400"
              >
                {errors.terms[0]}
              </p>
            )}

            <SubmitButton />
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {socialLoginProvidersList.map((provider) => (
              <form
                action={provider.action}
                key={provider.name}
                className="w-full"
              >
                <button
                  type="submit"
                  className={`w-full flex items-center cursor-not-allowed justify-center py-2.5 px-4 rounded-lg ${provider.color} ${provider.hoverColor} ${provider.textColor} text-sm font-medium border ${provider.borderColor} transition-colors shadow-sm`}
                >
                  {provider.icon}
                  {provider.name}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
