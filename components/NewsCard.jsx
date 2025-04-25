import Image from "next/image";
import React from "react";

const NewsCard = ({ source }) => {
	return (
		<div className="bg-gray-800 backdrop-blur-lg bg-opacity-60 w-full shadow-md z-10 text-white">
			<Image
				src={source.image || "/logo.png"}
				alt={source.title}
                width={40}
                height={50}
                className="object-cover"
			/>
			<div className="px-6 py-4">
				<h3 className="font-semibold text-xl mb-2">{source.title}</h3>
				<p className="text-gray-400 text-sm">
					{source.description || "No description available"}
				</p>
			</div>
			<div className="px-6 py-2">
				<a
					href={source.url}
					className="text-blue-400"
					target="_blank"
					rel="noopener noreferrer">
					Read More
				</a>
			</div>
		</div>
	);
};

export default NewsCard;
