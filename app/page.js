import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
	return (
		<main className="min-h-screen bg-background text-white">
			<section className="flex flex-col justify-center items-center gap-5 pt-16 px-52">
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
					<Link href="/login">Verify Now</Link>
				</Button>
			</section>
			<Separator className={`bg-white`} />
			<section className="flex justify-center items-center py-2">
				<Image src="/hero-magicui.png" width={873} height={523} alt="Pages" />
			</section>
		</main>
	);
}
