"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-end gap-4 px-6 py-3 bg-white shadow-sm">
      <TopMenuItem title="Booking" pageRef="/booking" />
      {status === "loading" ? (
        <span className="px-4 py-2 text-gray-500">...</span>
      ) : session ? (
        <Link
          href="/api/auth/signout"
          className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign-Out
        </Link>
      ) : (
        <TopMenuItem title="Sign-In" pageRef="/api/auth/signin" />
      )}
    </nav>
  );
}
