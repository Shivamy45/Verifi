"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const UserProfile = () => {
	const { user } = useAuthStore((state) => state); // Get the user state from Zustand
	const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await signOut(auth); // Sign out the user from Firebase
			router.push("/login"); // Redirect to login page
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};

	const handleToggleDropdown = () => {
		setIsOpen(!isOpen); // Toggle the dropdown
	};

	return (
		<div className="relative">
			{/* Button showing user's initials or displayName */}
			<button
				onClick={handleToggleDropdown}
				className="flex items-center space-x-2 p-2 bg-gray-800 text-white rounded-full">
				{user ? (
					<span className="font-bold">
						{user.displayName ? user.displayName[0] : "U"}
					</span>
				) : (
					<span className="font-bold">U</span>
				)}
			</button>

			{/* Dropdown menu for Settings and Logout */}
			{isOpen && user && (
				<div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
					<div className="p-2">
						<button
							onClick={() => router.push("/settings")} // Navigate to settings page
							className="w-full text-left px-4 py-2 hover:bg-gray-200">
							Settings
						</button>
						<button
							onClick={handleLogout}
							className="w-full text-left px-4 py-2 hover:bg-gray-200">
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
