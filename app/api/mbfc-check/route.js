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
		const res = await fetch(
			`https://mediabiasfactcheck.p.rapidapi.com/api/v1/claim?query=${encodeURIComponent(
				claim
			)}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": "mediabiasfactcheck.p.rapidapi.com",
					"x-rapidapi-key": process.env.MBFC_API_KEY,
				},
			}
		);

		const data = await res.json();

		const sources =
			data.sources?.map((source) => ({
				name: source.name,
				bias: source.bias,
				rating: source.rating,
				url: source.url,
			})) || [];

		return NextResponse.json({ sources });
	} catch (error) {
		console.error("MBFC API Error:", error);
		return NextResponse.json({ error: "MBFC API failed" }, { status: 500 });
	}
}
