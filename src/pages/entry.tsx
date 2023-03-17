import Navbar from "@/components/Navbar";
import RupeeForm from "@/components/RupeeForm";
import Footer from "@/components/shared/Footer";
import { withProtected } from "@/utils/routes";
import React from "react";

const EntryPage = () => {
	return (
		<>
			<Navbar />
			<RupeeForm />
			<Footer />
		</>
	);
};

export default withProtected(EntryPage);
