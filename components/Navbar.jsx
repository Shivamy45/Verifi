import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../app/globals.css";
import { Button } from "./ui/button";

const Navbar = () => {
	return (
		<nav className="bg-background backdrop-blur-lg bg-opacity-60 w-full shadow-md flex justify-between items-center px-25 py-3">
			<Image src="/logo.png" alt="Logo" width={70} height={30} />
			<div className="flex justify-center items-center gap-10 text-foreground">
				<Link href="/">Home</Link>
				<Link href="#about">About</Link>
				<Link href="#faqs">FAQs</Link>
			</div>
			<Button
				variant="outline"
				className="bg-accent border-none cursor-pointer">
				<Link href="/login">Get Started</Link>
			</Button>
		</nav>
	);
};

export default Navbar;
