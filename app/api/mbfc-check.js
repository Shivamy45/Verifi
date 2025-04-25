import { NextResponse } from "next/server";

export async function POST(req) {
	const { claim } = await req.json();
	const apiKey = process.env.MBFC_API_KEY;

	if (!claim) {
		return NextResponse.json(
			{ error: "Claim is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(
			`https://mediabiasfactcheck.p.rapidapi.com/api/v1/claim?query=${encodeURIComponent(
				claim
			)}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-key": apiKey,
					"x-rapidapi-host": "mediabiasfactcheck.p.rapidapi.com",
				},
			}
		);

		const data = await response.json();

		if (data && data.sources && data.sources.length > 0) {
			const sources = data.sources.map((source) => ({
				name: source.name,
				rating: source.rating,
				bias: source.bias,
				url: source.url,
			}));

			return NextResponse.json({ sources });
		} else {
			return NextResponse.json({
				error: "No sources found for this claim",
			});
		}
	} catch (error) {
		console.error("Error fetching data from MBFC:", error);
		return NextResponse.json(
			{ error: "Error connecting to MBFC" },
			{ status: 500 }
		);
	}
}
