import { NextResponse } from "next/server";

export async function POST(req) {
	const { claim } = await req.json();

	if (!claim) {
		return NextResponse.json(
			{ error: "Claim is required" },
			{ status: 400 }
		);
	}

	try {
		const apiKey = process.env.GEMINI_API_KEY;

		const res = await fetch(
			"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-goog-api-key": apiKey,
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [
								{
									text: `Is this claim true? "${claim}" — Provide your analysis as an AI fact checker.`,
								},
							],
						},
					],
				}),
			}
		);

		const data = await res.json();
		const text =
			data?.candidates?.[0]?.content?.parts?.[0]?.text ||
			"No response from Gemini";

		return NextResponse.json({ verdict: text });
	} catch (error) {
		console.error("Gemini API Error:", error);
		return NextResponse.json(
			{ error: "Gemini API failed" },
			{ status: 500 }
		);
	}
}
