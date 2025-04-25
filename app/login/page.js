"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../globals.css";
import { useRouter } from "next/navigation";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const signupSchema = loginSchema.extend({
	name: z.string().min(3),
});

export default function FlipCardAuth() {
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const loading = useAuthStore((state) => state.loading);
	const [flipped, setFlipped] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(flipped ? signupSchema : loginSchema),
	});

	// If user is logged in, redirect them to fact-check
	useEffect(() => {
		if (!loading && user) {
			router.push("/fact-check");
		}
	}, [user, loading]);

	const createUserDocument = async (user) => {
		const userRef = doc(db, "users", user.uid);
		const snapshot = await getDoc(userRef);

		if (!snapshot.exists()) {
			await setDoc(userRef, {
				name: user.displayName || user.email.split("@")[0],
				email: user.email,
				createdAt: serverTimestamp(),
			});
		}
	};

	const handleGoogleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			setUser(user); // Set user in Zustand store
			await createUserDocument(user);
			router.push("/fact-check");
		} catch (error) {
			console.error("Google Sign-In Error:", error.message);
		}
	};

	const onSubmit = async (user) => {
		try {
			if (flipped) {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					user.email,
					user.password
				);
				await updateProfile(userCredential.user, {
					displayName: user.name,
				});
				setUser(userCredential.user); // Set user in Zustand store
				await createUserDocument(userCredential.user);
				router.push("/fact-check");
			} else {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					user.email,
					user.password
				);
				setUser(userCredential.user); // Set user in Zustand store after sign-in
				router.push("/fact-check");
			}
			reset();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-background relative">
			{!user && (
				<div className="w-[350px] h-[450px] perspective">
					<div
						className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
							flipped ? "rotate-y-180" : ""
						}`}>
						{/* FRONT: Login */}
						<div className="absolute w-full h-full backface-hidden bg-card rounded-xl p-6 shadow-lg">
							<h2 className="text-2xl font-bold text-center text-white mb-6">
								Login To Verifi
							</h2>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col gap-4 mb-4">
								<Input
									type="email"
									placeholder="Email"
									className="text-white placeholder-gray-400"
									{...register("email", {
										required: {
											value: true,
											message: "Email is required",
										},
									})}
								/>
								<p className="text-red-500 text-sm">{errors.email?.message}</p>
								<Input
									type="password"
									placeholder="Password"
									className="text-white placeholder-gray-400"
									{...register("password", {
										required: {
											value: true,
											message: "Password is required",
										},
									})}
								/>
								<p className="text-red-500 text-sm">{errors.password?.message}</p>
								<Button
									type="submit"
									className="bg-accent border-none cursor-pointer">
									Login
								</Button>
							</form>
							<Button
								onClick={handleGoogleSignIn}
								className="bg-accent w-full cursor-pointer">
								<Image
									src={"/google.svg"}
									alt="Google"
									className="mr-2"
									height={20}
									width={20}
								/>
								Sign In with Google
							</Button>
							<p className="mt-4 text-sm text-gray-400 text-center">
								Don’t have an account?{" "}
								<button
									className="text-accent hover:underline"
									onClick={() => setFlipped(true)}>
									Sign up
								</button>
							</p>
						</div>

						{/* BACK: Signup */}
						<div className="absolute w-full h-full backface-hidden bg-zinc-900 rounded-xl p-6 shadow-lg transform rotate-y-180">
							<h2 className="text-2xl font-bold text-white mb-6">
								Sign Up
							</h2>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col gap-4 mb-4">
								<Input
									type="text"
									placeholder="Name"
									className="text-white placeholder-gray-400"
									{...register("name", {
										required: {
											value: true,
											message: "Name is required",
										},
									})}
								/>
								<p className="text-red-500 text-sm">{errors.name?.message}</p>
								<Input
									type="email"
									placeholder="Email"
									className="text-white placeholder-gray-400"
									{...register("email", {
										required: {
											value: true,
											message: "Email is required",
										},
									})}
								/>
								<p className="text-red-500 text-sm">{errors.email?.message}</p>
								<Input
									type="password"
									placeholder="Password"
									className="text-white placeholder-gray-400"
									{...register("password", {
										required: {
											value: true,
											message: "Password is required",
										},
									})}
								/>
								<p className="text-red-500 text-sm">{errors.password?.message}</p>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="bg-accent border-none cursor-pointer">
									Sign up
								</Button>
							</form>
							<Button
								onClick={handleGoogleSignIn}
								className="bg-accent w-full cursor-pointer">
								<Image
									src={"/google.svg"}
									alt="Google"
									className="mr-2"
									height={20}
									width={20}
								/>
								Sign Up with Google
							</Button>
							<p className="mt-4 text-sm text-gray-400 text-center">
								Already have an account?{" "}
								<button
									className="text-accent hover:underline"
									onClick={() => setFlipped(false)}>
									Log in
								</button>
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
