"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../globals.css";
import NewsCard from "@/components/NewsCard"; // Adjust the path as needed

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const page = () => {
	const [isChecking, setIsChecking] = useState(null);
	const [googleFactCheck, setGoogleFactCheck] = useState(null);
	const [gnewsResults, setGnewsResults] = useState(null);
	const [mbfcResults, setMbfcResults] = useState(null);
	const [geminiResult, setGeminiResult] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		reset,
	} = useForm();

	const onSubmit = async (data) => {
		setIsChecking("Checking Fact...");
		setGoogleFactCheck(null);
		setGnewsResults(null);
		setMbfcResults(null);
		setGeminiResult(null);

		try {
			const [googleRes, gnewsRes, mbfcRes] = await Promise.all([
				fetch(
					`${BASE_URL}/api/google-fact-check?claim=${encodeURIComponent(
						data.claim
					)}`
				),
				fetch(
					`${BASE_URL}/api/gnews-check?claim=${encodeURIComponent(
						data.claim
					)}`
				),
				fetch(`${BASE_URL}/api/mbfc-check`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ claim: data.claim }),
				}),
			]);

			const googleData = await googleRes.json();
			const gnewsData = await gnewsRes.json();
			const mbfcData = await mbfcRes.json();

			setGoogleFactCheck(googleData?.results || []);
			setGnewsResults(gnewsData?.results || []);
			setMbfcResults(mbfcData?.sources || []);
		} catch (error) {
			console.error("Error during verification:", error);
		}

		setIsChecking(null);
	};

	const handleGeminiAnalysis = async () => {
		onSubmit();
		setIsChecking("Analyzing with Gemini...");
		try {
			const res = await fetch(`${BASE_URL}/api/gemini-check`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ claim: watch("claim") }),
			});
			const data = await res.json();
			setGeminiResult(data?.verdict || "No verdict from Gemini.");
		} catch (error) {
			console.error("Gemini error:", error);
			setGeminiResult("Gemini analysis failed.");
		}
		setIsChecking(null);
	};

	return (
		<div className="flex justify-center min-h-screen bg-background text-white">
			<div className="flex flex-col justify-center px-80 py-40 h-fit w-full space-y-9">
				{/* Input box area */}
				<h1 className="text-2xl text-center">
					Ask me anything you'd like to verify.
				</h1>
				<form
					className="flex flex-col bg-gray-800/80 w-full p-2 pb-3 rounded-xl gap-4"
					onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Type your claim or drop a file..."
						className="flex-1 bg-none p-2 border-none text-white focus:bg-none focus:text-white placeholder-text-muted focus:outline-none w-full"
						{...register("claim", {
							required: {
								value: true,
								message: "Claim is required",
							},
						})}
						autoComplete="off"
					/>
					<p className="text-red-500 text-sm">
						{errors.claim?.message}
					</p>
					<div className="flex justify-between px-2">
						<div className="flex gap-4">
							<Button className="px-4 py-2 bg-transparent border rounded-xl hover:bg-gray-600/95 transition cursor-pointer text-muted">
								Photo
							</Button>
							<Button className="px-4 py-2 bg-transparent border rounded-xl hover:bg-gray-600/95 transition cursor-pointer text-muted">
								Video
							</Button>
						</div>
						<div className="flex gap-4">
							<Button
								className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
								type="submit"
								disabled={isSubmitting}>
								Verify
							</Button>
							<Button
								className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition cursor-pointer"
								type="button"
								onClick={handleGeminiAnalysis}>
								AI Analysis
							</Button>
						</div>
					</div>
				</form>
				{isSubmitting && (
					<div className="text-muted px-4 py-2">{isChecking}</div>
				)}
				{googleFactCheck && (
					<div>
						<h3>Google Fact Check:</h3>
						<div className="gflex flex-col space-y-4">
							{googleFactCheck.map((source, index) => (
								<NewsCard key={index} source={source} />
							))}
						</div>
					</div>
				)}
				{gnewsResults && (
					<div>
						<h3>GNews Results:</h3>
						<div className="flex flex-col space-y-4">
							{gnewsResults.map((source, index) => (
								<NewsCard key={index} source={source} />
							))}
						</div>
					</div>
				)}
				{mbfcResults && (
					<div>
						<h3>MBFC Ratings:</h3>
						<div className="flex flex-col space-y-4">
							{mbfcResults.map((source, index) => (
								<NewsCard key={index} source={source} />
							))}
						</div>
					</div>
				)}
				{geminiResult && (
					<div>
						<h3>Gemini Verdict:</h3>
						<p>{geminiResult}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default page;
