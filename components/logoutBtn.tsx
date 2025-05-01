"use client";

import React, { useState } from "react";
import { useGlobalState } from "@/globalStore";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { setLoggedInUser, setAuthToken } = useGlobalState();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear Zustand state
      setLoggedInUser(null);
      setAuthToken(null);

      // Delete session cookie on client-side (precaution)
      document.cookie = "session=; Max-Age=0; path=/";

      // Hit the backend API to clear the session server-side
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        // credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Logout failed");
      }
      toast.success("Logout successful!");
      // Redirect to home or login
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => setShowModal(true)}
      >
        Logout
      </button>

      {showModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
              <p className="mb-6 text-sm text-gray-600">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default LogoutButton;
