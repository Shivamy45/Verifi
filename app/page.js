'use client'
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import {
	FaArrowRight,
	FaLock,
	FaRobot,
	FaShieldAlt,
	FaUserShield,
} from "react-icons/fa";

export default function Home() {
	const { user } = useAuthStore((state) => state);

	return (
		<main className="min-h-screen bg-background text-white">
			<section className="flex flex-col justify-center items-center gap-5 py-16 px-52">
				<Button variant="outline" className="cursor-pointer">
					<Link href="/">Introducing Verifi</Link>
					<FaArrowRight className="text-white" />
				</Button>
				<h1 className="font-extrabold text-6xl text-center mt-4">
					Expose the false. Empower the facts. Verifi detects
					misinformation before it spreads.
				</h1>
				<p className="text-lg">
					Real-time AI-powered fact-checking and content verification
					— because truth shouldn't be optional.
				</p>
				<Button
					variant="outline"
					className="bg-accent border-none cursor-pointer mt-4 text-black">
					<Link href={user ? "/fact-check" : "/login"}>Verify Now</Link>
				</Button>
			</section>
			<Separator />
			<section className="flex justify-center items-center py-16">
				<Image
					src="/hero-magicui.png"
					width={1200}
					height={523}
					alt="Pages"
				/>
			</section>
			<Separator />
			<section className="flex flex-col px-56 py-16">
				<h2 className="text-4xl font-bold text-center text-white">
					Your Trusted Source for Truth
				</h2>
				<p className="text-md text-center text-gray-300 mt-1">
					We use multiple reliable resources, cutting-edge AI, and
					expert verification methods to provide you with real-time,
					accurate information.
				</p>
				<div className="flex justify-around items-center mt-4 pt-14 gap-7">
					<div className="flex flex-col items-center border border-white p-4 rounded-3xl h-56 justify-center">
						<FaShieldAlt className="text-4xl text-accent" />
						<h3 className="text-xl font-semibold text-white mt-4">
							Verified Sources
						</h3>
						<p className="text-center text-gray-300">
							We source data from trusted global organizations to
							ensure authenticity.
						</p>
					</div>

					<div className="flex flex-col items-center border border-white p-4 rounded-3xl h-56 justify-center">
						<FaRobot className="text-4xl text-accent" />
						<h3 className="text-xl font-semibold text-white mt-4">
							AI-Powered Fact-Checking
						</h3>
						<p className="text-center text-gray-300">
							Our cutting-edge AI continuously scans and validates
							information in real-time.
						</p>
					</div>

					<div className="flex flex-col items-center border border-white p-4 rounded-3xl h-56 justify-center">
						<FaUserShield className="text-4xl text-accent" />
						<h3 className="text-xl font-semibold text-white mt-4">
							Expert Verification
						</h3>
						<p className="text-center text-gray-300">
							Verified by industry-leading experts who ensure
							accurate results.
						</p>
					</div>
				</div>
			</section>
			<Separator />
			<section className="flex flex-col py-16">
				<h3 className="text-2xl font-bold text-center text-white mb-6">
					Our Trusted Partners
				</h3>
				<div className="flex justify-center gap-12">
					<Image
						src="/partner.svg"
						alt="Partner 1"
						width={50}
						height={50}
					/>
					<Image
						src="/partner.svg"
						alt="Partner 2"
						width={50}
						height={50}
					/>
					<Image
						src="/partner.svg"
						alt="Partner 2"
						width={50}
						height={50}
					/>
					<Image
						src="/partner.svg"
						alt="Partner 2"
						width={50}
						height={50}
					/>
					<Image
						src="/partner.svg"
						alt="Partner 3"
						width={50}
						height={50}
					/>
				</div>
			</section>
			<Separator />
			<section className="py-16 flex flex-col items-center">
				<h3 className="text-4xl font-bold text-center text-white">
					Your Privacy and Security Matter to Us
				</h3>
				<p className="text-sm text-center text-gray-300 mt-4">
					We prioritize your privacy and ensure that your data is
					safe. All information is encrypted and kept confidential.
				</p>
				<div className="flex justify-center items-center mt-6">
					<FaLock className="text-accent text-2xl" />
					<span className="text-lg text-white ml-4">
						End-to-end encryption
					</span>
				</div>
				<Button
					variant="outline"
					className="bg-accent border-none cursor-pointer mt-8 text-black text-xl py-3 px-8">
					<Link href={user ? "/fact-check" : "/login"}>Start Verifying Now</Link>
				</Button>
			</section>
		</main>
	);
}
