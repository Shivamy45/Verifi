import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const claim = searchParams.get("claim");

	if (!claim) {
		return NextResponse.json(
			{ error: "Claim is required" },
			{ status: 400 }
		);
	}

	try {
		const apiKey = process.env.GNEWS_API_KEY;
		const res = await fetch(
			`https://gnews.io/api/v4/search?q=${encodeURIComponent(
				claim
			)}&token=${apiKey}`
		);
		const data = await res.json();

		const articles =
			data.articles?.map((article) => ({
				title: article.title,
				description: article.description,
				url: article.url,
				image: article.image,
				source: article.source?.name || "",
			})) || [];

		return NextResponse.json({ results: articles });
	} catch (error) {
		console.error("GNews API Error:", error);
		return NextResponse.json(
			{ error: "GNews API failed" },
			{ status: 500 }
		);
	}
}
