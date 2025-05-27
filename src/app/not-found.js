"use client";

import Link from "next/link";
import { Home, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";

function Error({ statusCode, hasGetInitialPropsRun, err }) {
  const getErrorMessage = () => {
    if (statusCode === 404) {
      return {
        title: "Page Not Found",
        description:
          "The page you're looking for doesn't exist or has been moved.",
        code: "404",
      };
    } else if (statusCode === 500) {
      return {
        title: "Server Error",
        description: "Something went wrong on our end. Please try again later.",
        code: "500",
      };
    } else if (statusCode === 403) {
      return {
        title: "Access Forbidden",
        description: "You don't have permission to access this resource.",
        code: "403",
      };
    } else {
      return {
        title: "Something Went Wrong",
        description: "An unexpected error occurred. Please try again.",
        code: statusCode || "Error",
      };
    }
  };

  const errorInfo = getErrorMessage();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-6 mx-auto border border-blue-200 dark:border-blue-800">
                <AlertCircle className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 rounded-full px-4 py-2 shadow-lg border border-slate-200 dark:border-slate-700">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  {errorInfo.code}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                {errorInfo.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
              {errorInfo.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-300 min-w-[140px]"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>

            <button
              onClick={handleRefresh}
              className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px]"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px]"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>

          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-6 max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              If you continue to experience issues, please contact our support
              team.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link
                href="/support"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact Support
              </Link>
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <Link
                href="/help"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
