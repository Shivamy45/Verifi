"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Make sure the auth instance is imported
import { useAuthStore } from "@/store/authStore";

export default function AuthListener() {
	const { setUser, clearUser } = useAuthStore((state) => ({
		setUser: state.setUser,
		clearUser: state.clearUser,
	}));

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			console.log("Auth state changed:", firebaseUser); // Log auth state changes
			if (firebaseUser) {
				setUser(firebaseUser); // Updates Zustand with the user and stops loading
				console.log("User set in Zustand")
			} else {
				clearUser(); // Clears user and stops loading
				console.log("User clered in Zustand")
			}
		});

		return () => unsubscribe(); // Clean up listener
	}, [setUser, clearUser]);

	return null; // No UI needed, just handles auth logic
}
