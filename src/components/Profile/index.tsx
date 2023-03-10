import { db } from "@/firebase";
import { User } from "firebase/auth";
import {
	collection,
	getCountFromServer,
	query,
	where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import MyHitsTable from "./MyHits";
import MyNotesTable from "./MyNotes";

interface ProfileSectionProps {
	user: User | null | undefined;
	loading: boolean;
	error: Error | undefined;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
	const [hits, setHits] = useState<number>();
	const [showTab, setShowTab] = useState<"dashboard" | "hits" | "notes">(
		"dashboard"
	);

	useEffect(() => {
		const callThisNow = async () => {
			const snapshot = await getCountFromServer(
				query(
					collection(db, "hits"),
					where("users", "array-contains", user?.email?.split("@")[0] || "-")
				)
			);
			console.log("SNAPSHOT DATA COUNT", snapshot.data().count);
			setHits(snapshot.data().count);
		};
		callThisNow();

		return () => {
			setHits(0);
		};
	}, [user]);

	const ShowingTab = SHOW_TABS[showTab];

	return (
		<section>
			<div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
				<div className="lg:col-span-2 lg:py-8">
					<div className="w-full tabs ">
						<button
							className={`tab tab-bordered text-xl ${
								showTab === "dashboard" && "tab-active"
							}`}
							onClick={() => setShowTab("dashboard")}
						>
							Dashboard
						</button>
						<button
							className={`tab tab-bordered text-xl ${
								showTab === "notes" && "tab-active"
							}`}
							onClick={() => setShowTab("notes")}
						>
							My Notes
						</button>
						<button
							className={`tab tab-bordered text-xl ${
								showTab === "hits" && "tab-active"
							}`}
							onClick={() => setShowTab("hits")}
						>
							My Hits
						</button>
					</div>
					<div className="  px-2">
						<ShowingTab />
					</div>
				</div>
			</div>
		</section>
	);
};

const SHOW_TABS = {
	hits: MyHitsTable,
	notes: MyNotesTable,
	dashboard: Dashboard,
};

export default ProfileSection;
