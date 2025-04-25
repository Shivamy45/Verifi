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
		const apiKey = process.env.GOOGLE_FACT_CHECK_API_KEY;
		const res = await fetch(
			`https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(
				claim
			)}&key=${apiKey}`
		);
		const data = await res.json();

		const results =
			data.claims?.map((claim) => ({
				claimText: claim.text,
				claimant: claim.claimant,
				review: claim.claimReview?.[0]?.text || "",
				publisher: claim.claimReview?.[0]?.publisher?.name || "",
				url: claim.claimReview?.[0]?.url || "",
				title: claim.claimReview?.[0]?.title || "",
			})) || [];

		return NextResponse.json({ results });
	} catch (error) {
		console.error("Google Fact Check API Error:", error);
		return NextResponse.json(
			{ error: "Google Fact Check API failed" },
			{ status: 500 }
		);
	}
}
