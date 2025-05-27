import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ProfilePage from "./profile";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ProfilePage mainUser={session.user}/>
    </div>
  );
}