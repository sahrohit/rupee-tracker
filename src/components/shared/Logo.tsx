import React from "react";
import LogoImage from "../../../public/logo.svg";
import Image from "next/image";

const Logo = () => {
	return (
		<div>
			<Image src={LogoImage} alt="logo" />
		</div>
	);
};

export default Logo;
