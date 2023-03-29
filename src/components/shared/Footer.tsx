import React from "react";
import Logo from "./Logo";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
	return (
		<>
			<footer className="footer mx-auto max-w-screen-xl px-4 py-6 sm:py-6 sm:px-12 lg:px-8">
				<div>
					<Logo />
					<p>
						Tracking Rupee since 2023.
						<br />
						Not associated with any govermental orgranizations
					</p>
				</div>
				<div>
					<span className="footer-title">Social</span>
					<div className="grid grid-flow-col gap-6">
						<a href="https://twitter.com/rupee_tracker" target="_blank">
							<BsTwitter className="scale-[2]" />
						</a>
						<a
							href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
							target="_blank"
						>
							<BsYoutube className="scale-[2]" />
						</a>
						<a href="https://www.facebook.com/" target="_blank">
							<BsFacebook className="scale-[2]" />
						</a>
					</div>
				</div>
			</footer>
			<p className="text-center my-2">
				Inspired from{" "}
				<a href="https://wheresgeorge.com/" target="_blank">
					Where`s George
				</a>{" "}
				&{" "}
				<a href="https://en.eurobilltracker.com/" target="_blank">
					Euro Bill Tracker
				</a>
			</p>
		</>
	);
};

export default Footer;
