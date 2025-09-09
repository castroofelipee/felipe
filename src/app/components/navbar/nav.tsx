"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full text-gray-700 px-4 py-3">
      <ul className="flex justify-end space-x-6 text-base font-medium">
        <li>
          <Link href="/home" className="hover:text-gray-500">
            Home
          </Link>
        </li>
        <li>
          <Link href="/loucuras" className="hover:text-gray-500">
            Loucuras
          </Link>
        </li>
      </ul>
    </nav>
  );
}
