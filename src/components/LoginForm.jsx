"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaGoogle, FaApple } from "react-icons/fa";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined,
      });
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setErrors({ general: 'Invalid credentials' });
    } else {
      toast.success("Successfully signed in!", {
        duration: 3000,
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
        },
      });
      router.push("/dashboard");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLoginProviders = [
    {
      name: "Google",
      icon: <FaGoogle className="mr-2 h-4 w-4" />,
      color: "bg-white",
      hoverColor: "hover:bg-slate-50",
      textColor: "text-slate-800",
      borderColor: "border-slate-200",
      action: () => signIn("google"),
    },
    {
      name: "GitHub",
      icon: <FaGithub className="mr-2 h-4 w-4" />,
      color: "bg-slate-800",
      hoverColor: "hover:bg-slate-900",
      textColor: "text-white",
      borderColor: "border-slate-700",
      action: () => signIn("github"),
    },
    {
      name: "Apple",
      icon: <FaApple className="mr-2 h-4 w-4" />,
      color: "bg-black",
      hoverColor: "hover:bg-slate-900",
      textColor: "text-white",
      borderColor: "border-black",
      action: () => signIn("apple"),
    },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.email
                    ? "border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-500/30 text-red-500"
                    : "border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500"
                } bg-white dark:bg-slate-900/70 focus:ring-4 focus:ring-blue-300/20 dark:focus:ring-blue-500/20 outline-none transition text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                placeholder="youremail@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.password
                      ? "border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-500/30 text-red-500"
                      : "border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500"
                  } bg-white dark:bg-slate-900/70 focus:ring-4 focus:ring-blue-300/20 dark:focus:ring-blue-500/20 outline-none transition pr-10 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg bg-blue-600 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300/20 dark:focus:ring-blue-500/30 flex items-center justify-center disabled:opacity-70 shadow-lg shadow-blue-500/10`}
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-2">
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
            {socialLoginProviders.map((provider) => (
              <button
                key={provider.name}
                onClick={provider.action}
                className={`w-full flex items-center cursor-not-allowed justify-center py-2.5 px-4 rounded-lg ${provider.color} ${provider.hoverColor} ${provider.textColor} text-sm font-medium border ${provider.borderColor} transition-colors shadow-sm`}
              >
                {provider.icon}
                {provider.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
