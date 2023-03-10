import Navbar from "@/components/Navbar";
import RupeeForm from "@/components/RupeeForm";
import { withProtected } from "@/utils/routes";
import React from "react";

const EntryPage = () => {
	return (
		<>
			<Navbar />
			<RupeeForm />
		</>
	);
};

export default withProtected(EntryPage);
