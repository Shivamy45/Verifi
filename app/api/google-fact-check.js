import { NextResponse } from "next/server";

export async function POST(req) {
	const { claim } = await req.json();
	const apiKey = process.env.GOOGLE_FACT_CHECK_API_KEY;

	if (!claim) {
		return NextResponse.json(
			{ error: "Claim is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(
			`https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(
				claim
			)}&key=${apiKey}`
		);
		const data = await response.json();

		if (data.claims && data.claims.length > 0) {
			const claims = data.claims.map((claim) => ({
				claimText: claim.text,
				verdict: claim.verdict,
				source: claim.claimant,
				url: claim.url,
			}));

			return NextResponse.json({ claims });
		} else {
			return NextResponse.json({ error: "No fact-check results found" });
		}
	} catch (error) {
		console.error("Error fetching data from Google Fact Check:", error);
		return NextResponse.json(
			{ error: "Error connecting to Google Fact Check" },
			{ status: 500 }
		);
	}
}
