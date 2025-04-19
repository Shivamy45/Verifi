import Link from "next/link";
import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Separator } from "./ui/separator";

const Footer = () => {
	return (
		<footer className="bg-background text-white pt-10 px-40">
			<div className="flex w-full justify-between px-9">
				<div className="flex flex-col items-start justify-start">
					<div className="text-2xl font-bold text-accent">Verifi</div>
					<p className="text-muted">Truth. Verified. Instantly.</p>
				</div>
                <div className="flex gap-16">
					<div className="flex flex-col gap-2">
						<div>PRODUCT</div>
						<Link href={"/"} className="text-muted text-sm">
							Verify Now
						</Link>
						<Link href={"/"} className="text-muted text-sm">
							Pricing
						</Link>
						<Link href={"/"} className="text-muted text-sm">
							FAQs
						</Link>
					</div>
					<div className="flex flex-col gap-2">
						<div>COMMUNITY</div>
						<Link
							href="#"
							className="text-muted flex items-center gap-3 text-sm">
							<FaTwitter /> Twitter
						</Link>
						<Link
							href="#"
							className="text-muted flex items-center gap-3 text-sm">
							<FaGithub /> Github
						</Link>
						<Link
							href="#"
							className="text-muted flex items-center gap-3 text-sm">
							<FaLinkedin /> LinkedIn
						</Link>
					</div>
					<div className="flex flex-col gap-2">
						<div>LEGAL</div>
						<Link href={"/"} className="text-muted text-sm">
							Terms
						</Link>
						<Link href={"/"} className="text-muted text-sm">
							Privacy
						</Link>
					</div>
				</div>
			</div>
			<div className="text-muted flex justify-end pt-16 pb-9">
				&copy; {new Date().getFullYear()} Verifi. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
