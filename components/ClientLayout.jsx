"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Navbar from "./Navbar";
import { Separator } from "./ui/separator";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import "../app/globals.css"

export default function ClientLayout({ children }) {
	const { loading } = useAuthStore((state) => state);
	const pathname = usePathname();

	if (loading) {
		return <LoadingScreen />;
	}

	if (pathname === "/login") {
		return <>{children}</>;
	} else {
		return (
			<>
				<Navbar />
				<div className="pb-[60px] bg-background"></div>
				<Separator />
				{children}
				<Separator />
				<Footer />
			</>
		);
	}
}
