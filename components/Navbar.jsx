"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <nav className="flex items-center justify-between bg-gray-100 shadow px-6 py-3 sticky top-0 z-50">
      <Link href="/dashboard" className="text-2xl font-bold hover:text-gray-700">
        Resume Maker
      </Link>

      <div className="flex items-center gap-4">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt=""
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-sm text-gray-600">{session.user?.name}</span>
        <Link
          href="/dashboard"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Dashboard
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
