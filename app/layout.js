import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import ClientAuthListener from "@/components/ClientAuthListener";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Verifi - Truth. Verified.",
	description: "An AI-Powered Fact-Checking Tool",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ClientAuthListener />
				<Navbar />
				<Separator />
				{children}
				<Separator />
				<Footer />
			</body>
		</html>
	);
}
