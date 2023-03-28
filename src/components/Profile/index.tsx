import { db } from "@/firebase";
import { User } from "firebase/auth";
import {
	collection,
	getCountFromServer,
	query,
	where,
} from "firebase/firestore";
import { useRouter } from "next/router";
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
	const router = useRouter();

	const [hits, setHits] = useState<number>();
	const [showTab, setShowTab] = useState<"dashboard" | "hits" | "notes">(
		(router.query?.section as "dashboard" | "hits" | "notes") || "dashboard"
	);

	useEffect(() => {
		if (router.query?.section) {
			setShowTab(router.query?.section as "dashboard" | "hits" | "notes");
		}
	}, [router.query?.section]);

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
			<div className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8 mx-auto">
				<div className="tabs tabs-boxed max-[450px]:mb-4 sticky top-0 z-10 justify-center max-[450px]:justify-around py-4">
					<button
						type="button"
						className={`tab text-xl ${showTab === "dashboard" && "tab-active"}`}
						onClick={() => {
							setShowTab("dashboard");
							router.push("/profile?section=dashboard", undefined, {
								shallow: true,
							});
						}}
					>
						Dashboard
					</button>
					<button
						type="button"
						className={`tab text-xl ${showTab === "notes" && "tab-active"}`}
						onClick={() => {
							setShowTab("notes");
							router.push("/profile?section=notes", undefined, {
								shallow: false,
							});
						}}
					>
						My Notes
					</button>
					<button
						type="button"
						className={`tab text-xl ${showTab === "hits" && "tab-active"}`}
						onClick={() => {
							setShowTab("hits");
							router.push("/profile?section=hits", undefined, {
								shallow: true,
							});
						}}
					>
						My Hits
					</button>
				</div>
				<div className="  px-2">
					<ShowingTab />
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
