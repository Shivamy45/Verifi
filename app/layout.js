import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientAuthListener from "@/components/ClientAuthListener";
import ClientLayout from "@/components/ClientLayout";

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
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
