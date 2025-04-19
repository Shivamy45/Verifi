"use client";

import { useAuthStore } from "@/store/authStore";
import AuthListener from "@/components/AuthListener";
import LoadingScreen from "./LoadingScreen";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import { Separator } from "./ui/separator";
import Footer from "./Footer";

export default function ClientLayout({ children }) {
	const { loading, user } = useAuthStore((state) => ({
		loading: state.loading,
		user: state.user,
	}));
	const router = useRouter();

	const isLandingPage = router.pathname === "/";

	console.log("Zustand loading state:", loading); // Log the loading state

	if (loading) {
		return <LoadingScreen />;
	}

	console.log("User is", user);

	return (
		<>
			{!isLandingPage && <AuthListener />}
			<Navbar />
			<div className="pb-[60px] bg-background"></div>
			<Separator />
			{children}
			<Separator />
			<Footer />
		</>
	);
}
