import Link from "next/link";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPassword() {
  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 text-center border border-slate-100 dark:border-slate-700">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Check your inbox</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            We've sent a password reset link to{" "}
            <span className="font-medium">{"email"}</span>. Please check your
            email and follow the instructions to reset your password.
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            If you don't see the email in your inbox, please check your spam
            folder.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300/20 dark:focus:ring-blue-500/30 text-center shadow-lg shadow-blue-500/10"
            >
              Return to Login
            </Link>
            <button className="block w-full py-2.5 px-4 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300/20 dark:focus:ring-slate-500/30 text-center">
              Resend email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 mb-4">
            <span className="text-white text-xl font-bold">T</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Forgot Password</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Enter your email and we'll send you a reset link
          </p>
          <div className="mt-4 text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg px-4 py-3 flex items-center justify-center text-sm">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            Password reset via email is not supported yet. Please create a new account.
          </div>
        </div>

        {/* <form className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 md:p-8 border border-slate-100 dark:border-slate-700">
          {false && (
            <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-600 dark:text-red-400 text-sm">
                {"error"}
              </p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-blue-300/20 dark:focus:ring-blue-500/20 outline-none transition"
                  placeholder="youremail@example.com"
                  required
                />
              </div>
            </div>

            <button className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300/20 dark:focus:ring-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
              Send Reset Link
            </button>
          </div>
        </form> */}

        <div className="text-center mt-6">
          <p className="text-slate-600 dark:text-slate-400">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
