import Link from "next/link";
import TopUsers from "./TopUsers";
import { default as LiveNote } from "./LiveNote";
import { useState } from "react";
import dayjs from "dayjs";
import { BiStats } from "react-icons/bi";
import { MdStart } from "react-icons/md";

const Banner = () => {
	const [lastUpdated, setLastUpdated] = useState<number>(0);

	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="bg-secondary p-8 md:p-12 lg:px-16 lg:py-24">
						<div className="mx-auto max-w-xl text-center">
							<h2 className="text-2xl font-bold text-white md:text-3xl devnagiri">
								Follow your Rupee in their Track
							</h2>

							<p className="hidden text-white/90 sm:mt-4 sm:block">
								Rupee Tracker (RT) is an non-profit volunteer team dedicated to
								tracking Rupee notes around the world. Each user enters the
								serial numbers and location information for each note they
								obtain into RupeeTracker.
							</p>

							<div className="flex flex-row flex-wrap justify-center mt-4 md:mt-8 gap-4">
								<Link
									href="/entry"
									className="rounded border border-white bg-white px-12 py-3 text-md font-medium text-primary transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400 flex flex-row items-center gap-2"
								>
									<MdStart className="text-xl" />
									Enter Notes
								</Link>
								<Link
									href="/stats"
									className="rounded border border-white bg-white px-12 py-3 text-md font-medium text-primary transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400 flex flex-row items-center gap-2"
								>
									<BiStats className="text-xl" />
									Search & Stats
								</Link>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
						<div className="flex flex-col gap-4">
							<h1 className="text-2xl font-bold text-primary md:text-3xl devnagiri">
								Live Enteries
							</h1>
							<LiveNote />
						</div>
						<div className="flex flex-col gap-4">
							<div
								className="tooltip hover:tooltip-open tooltip-top cursor-pointer"
								data-tip="Click here to refresh"
								onClick={async () => {
									await fetch("/api/countuser", {
										method: "GET",
									});
								}}
							>
								<h1 className="text-2xl font-bold text-primary md:text-3xl devnagiri whitespace-nowrap">
									Top Users{" "}
									{lastUpdated && (
										<span className="text-sm">
											(Updated {dayjs(lastUpdated * 1000).fromNow(true)} ago)
										</span>
									)}
								</h1>
							</div>
							<TopUsers setLastUpdated={setLastUpdated} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
