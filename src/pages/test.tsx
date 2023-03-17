import React, { useState } from "react";

const TestPage = () => {
	const [state, setState] = useState(6);

	return (
		<div>
			<h2 className="sr-only">Steps</h2>

			<div>
				<ol
					className={`divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 flex flex-row flex-wrap gap-4 justify-center w-full px-8`}
				>
					<li className="flex items-center justify-center gap-2 p-4 grow">
						<h2 className="text-2xl mx-2">1</h2>
						<p className="leading-none">
							<strong className="block font-medium"> Details </strong>
							<small className="mt-1"> Some info about you. </small>
						</p>
					</li>

					<li className="relative flex items-center justify-center gap-2 bg-gray-50 p-4 grow">
						<h2 className="text-2xl mx-2">2</h2>

						<p className="leading-none">
							<strong className="block font-medium"> Address </strong>
							<small className="mt-1"> Where we sending it? </small>
						</p>
					</li>

					{/* <li className="flex items-center justify-center gap-2 p-4">
						<h2 className="text-2xl mx-2">3</h2>

						<p className="leading-none">
							<strong className="block font-medium"> Payment </strong>
							<small className="mt-1"> Show us the money. </small>
						</p>
					</li> */}
					{/* <li className="flex items-center justify-center gap-2 p-4">
						<h2 className="text-2xl mx-2">4</h2>

						<p className="leading-none">
							<strong className="block font-medium"> Payment </strong>
							<small className="mt-1"> Show us the money. </small>
						</p>
					</li> */}
				</ol>
			</div>
			<button onClick={() => setState((state) => state++)}>Plus</button>
		</div>
	);
};

export default TestPage;

{
	/* <span className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-b-0 border-l-0 border-gray-100 bg-white sm:block"></span>

<span className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-b-0 border-l-0 border-gray-100 bg-gray-50 sm:block"></span> */
}
