import Link from "next/link";
import { default as LiveNote, default as StatTable } from "./LiveNote";
import LiveHits from "./LiveHits";

const Banner = () => {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="bg-primary  p-8 md:p-12 lg:px-16 lg:py-24">
						<div className="mx-auto max-w-xl text-center">
							<h2 className="text-2xl font-bold text-white md:text-3xl">
								Follow your Rupee in their Track
							</h2>

							<p className="hidden text-white/90 sm:mt-4 sm:block">
								Rupee Tracker (RT) is an non-profit volunteer team dedicated to
								tracking Rupee notes around the world. Each user enters the
								serial numbers and location information for each note they
								obtain into RupeeTracker.
							</p>

							<div className="mt-4 md:mt-8">
								<Link
									href="/entry"
									className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-primary transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
								>
									Get Started Today
								</Link>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl font-bold text-primary md:text-3xl">
								Live Enteries
							</h1>
							<LiveNote />
						</div>
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl font-bold text-primary md:text-3xl">
								Live Hits
							</h1>
							<LiveHits />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
