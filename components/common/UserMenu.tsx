"use client";

import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cart/cartSlice";

const UserMenu = () => {
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropDown(false);
      }
    }
    if (dropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDown]);

  const handleSignOut = () => {
    signOut();
    router.replace("/");
    setDropDown(false);
    dispatch(clearCart());
  };

  const handleProfileLink = () => {
    setDropDown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {session?.user ? (
        <>
          <button
            onClick={() => setDropDown((prev) => !prev)}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
            aria-haspopup="true"
            aria-expanded={dropDown}
            aria-label="User menu"
          >
            {!session.user.image ? (
              <User size={28} className="text-white"/>
            ) : (
              <Image
                src={session.user.image}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full object-cover"
                priority
              />
            )}
          </button>

          {dropDown && (
            <div
              className="absolute top-14 right-0 w-40 rounded-lg bg-zinc-700 bg-opacity-90 text-white text-sm font-medium shadow-lg flex flex-col space-y-3 p-3 z-50"
              role="menu"
              aria-label="User dropdown menu"
            >
              <Link href={'/profile'} className="bg-zinc-800 py-2 rounded-lg hover:bg-zinc-600 transition text-center">
                <button 
                  
                  onClick={handleProfileLink}
                  role="menuitem"
                >
                  Profile
                </button>
              </Link>
              {session.user.role === "ADMIN" && (
                <Link href={'/admin/dashboard'} className="bg-zinc-800 py-2 rounded-lg hover:bg-zinc-600 transition text-center">
                <button 
                  
                  onClick={handleProfileLink}
                  role="menuitem"
                >
                  Dashboard
                </button>
              </Link>
              )}
              <button
                className="bg-zinc-800 py-2 rounded-lg hover:bg-zinc-600 transition flex items-center justify-center space-x-4"
                onClick={handleSignOut}
                role="menuitem"
              >
                <p>Logout</p>
                <LogOut/>
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          href="/login"
          className="text-white font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded"
        >
          <LogIn/>
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
