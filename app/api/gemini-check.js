
import { NextResponse } from "next/server";

export async function POST(req) {
	const { claim } = await req.json();
	const apiKey = process.env.GEMINI_API_KEY;

	if (!claim) {
		return NextResponse.json(
			{ error: "Claim is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch("https://gemini-api-url.com/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ claim }),
		});

		const geminiData = await response.json();

		if (geminiData && geminiData.verdict) {
			return NextResponse.json({
				verdict: geminiData.verdict,
				sources: geminiData.sources,
			});
		} else {
			return NextResponse.json({ error: "No Gemini response" });
		}
	} catch (error) {
		console.error("Error fetching data from Gemini AI:", error);
		return NextResponse.json(
			{ error: "Error connecting to Gemini AI" },
			{ status: 500 }
		);
	}
}