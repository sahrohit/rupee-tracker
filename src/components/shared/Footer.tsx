import React from "react";
import Logo from "./Logo";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
	return (
		<>
			<footer className="footer p-10 mt-8">
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
						<a>
							<BsTwitter className="scale-[2]" />
						</a>
						<a>
							<BsYoutube className="scale-[2]" />
						</a>
						<a>
							<BsFacebook className="scale-[2]" />
						</a>
					</div>
				</div>
			</footer>
			<p className="text-center my-2 text-sm">
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
