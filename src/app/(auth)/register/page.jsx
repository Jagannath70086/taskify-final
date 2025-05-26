import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-600 mb-4">
            <span className="text-white text-xl font-bold">T</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Create an account</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Join Taskify and boost your productivity
          </p>
        </div>

        <RegisterForm />

        <div className="text-center mt-6">
          <p className="text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
