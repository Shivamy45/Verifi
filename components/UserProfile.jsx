"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuShortcut,
} from "./ui/dropdown-menu";

const UserProfile = () => {
	const { user } = useAuthStore((state) => state); // Get the user state from Zustand
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await signOut(auth); // Sign out the user from Firebase
			router.push("/login"); // Redirect to login page
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
			const cmdKey = isMac ? e.metaKey : e.ctrlKey;

			if (cmdKey && e.key.toLowerCase() === "h") {
				e.preventDefault();
				router.push("/history");
			}
			if (cmdKey && e.key.toLowerCase() === "s") {
				e.preventDefault();
				router.push("/settings");
			}
			if (cmdKey && e.shiftKey && e.key.toLowerCase() === "p") {
				e.preventDefault();
				router.push("/profile");
			}
			if (cmdKey && e.shiftKey && e.key.toLowerCase() === "q") {
				e.preventDefault();
				handleLogout();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="rounded-full cursor-pointer w-10 h-10 bg-accent text-black font-bold hover:bg-accent/80 text-2xl">
					{user.displayName
						? user.displayName[0]
						: user.email.split("@")[0][0].toUpperCase()}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={`w-56 px-4 pt-2 bg-zinc-900 text-white shadow-lg z-50 mt-2 rounded-xs border-none`}>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => router.push("/profile")}
						className="cursor-pointer hover:bg-zinc-700/30">
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => router.push("/history")}
						className="cursor-pointer hover:bg-zinc-700/30">
						History
						<DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => router.push("/settings")}
						className="cursor-pointer hover:bg-zinc-700/30">
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className={"cursor-pointer hover:bg-zinc-700/30"}
					asChild>
					<a
						href="https://github.com/Shivamy45"
						target="_blank"
						n
						rel="noopener noreferrer">
						GitHub
					</a>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>API</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className={"cursor-pointer hover:bg-zinc-700/30"}>
					Logout
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfile;
