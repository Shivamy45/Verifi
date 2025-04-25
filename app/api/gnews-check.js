import { NextResponse } from "next/server";

export async function POST(req) {
	const { claim } = await req.json();
	const apiKey = process.env.GNEWS_API_KEY;

	if (!claim) {
		return NextResponse.json(
			{ error: "Claim is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(
			`https://gnews.io/api/v4/search?q=${encodeURIComponent(
				claim
			)}&token=${apiKey}`
		);
		const data = await response.json();

		if (data.articles && data.articles.length > 0) {
			const articles = data.articles.map((article) => ({
				title: article.title,
				description: article.description,
				url: article.url,
				source: article.source.name,
				image: article.image,
			}));

			return NextResponse.json({ results: articles });
		} else {
			return NextResponse.json({ error: "No news articles found" });
		}
	} catch (error) {
		console.error("Error fetching data from GNews:", error);
		return NextResponse.json(
			{ error: "Error connecting to GNews" },
			{ status: 500 }
		);
	}
}
