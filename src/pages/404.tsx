import Link from "next/link";
import React from "react";

const PageNotFound = () => {
	return (
		<main className="h-screen w-full flex flex-col justify-center items-center">
			<h1 className="text-9xl font-extrabold tracking-widest">404</h1>
			<div className="bg-[#FF6A3D] px-3 text-sm rounded rotate-12 absolute">
				Page Not Found
			</div>
			<Link className="btn btn-wide btn-primary mt-8" href="/" passHref>
				Go Home
			</Link>
		</main>
	);
};

export default PageNotFound;
