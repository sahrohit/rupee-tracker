import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PageNotFound = () => {
	const router = useRouter();

	return (
		<main className="h-screen w-full flex flex-col justify-center items-center">
			<h1 className="text-9xl font-extrabold tracking-widest">404</h1>
			<div className="bg-[#FF6A3D] px-3 text-sm rounded rotate-12 absolute">
				Page Not Found
			</div>
			<div className="flex flex-row flex-wrap gap-2 justify-center">
				<button
					onClick={() => {
						router.back();
					}}
					className="btn btn-wide btn-primary mt-8"
				>
					Go Back
				</button>
				<Link className="btn btn-wide btn-primary mt-8" href="/" passHref>
					Go Home
				</Link>
			</div>
		</main>
	);
};

export default PageNotFound;
