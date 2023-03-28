import { auth, db } from "@/firebase";
import dayjs from "dayjs";
import {
	collection,
	doc,
	getCountFromServer,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";
import { GoVerified } from "react-icons/go";
import Image from "next/image";

const Dashboard = () => {
	const [user] = useAuthState(auth);
	const [hits, setHits] = useState<number>();
	const [fetchLoading, setFetchLoading] = useState<boolean>(true);

	const [signOut, _loading, error] = useSignOut(auth);

	const [data, _dloading, derror] = useDocumentData(
		doc(db, "leaderboard", user?.email?.split("@")[0] || "-"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
		if (derror) {
			toast.error(derror.message);
		}
	}, [error, derror]);

	useEffect(() => {
		const callThisNow = async () => {
			const snapshot = await getCountFromServer(
				query(
					collection(db, "hits"),
					where("users", "array-contains", user?.email?.split("@")[0] || "-")
				)
			);
			setHits(snapshot.data().count);
			setFetchLoading(false);
		};
		callThisNow();

		return () => {
			setHits(0);
			setFetchLoading(true);
		};
	}, [user]);

	return (
		<div className="rounded-md flex flex-col md:flex-row justify-center gap-8 p-4 pt-8 mt-8">
			<header className="flex flex-col gap-8 sm:flex-row">
				<div>
					<div className="avatar">
						<div className="w-24 rounded-xl">
							<Image
								src={user?.photoURL || "https://picsum.photos/200/300"}
								alt="profile"
								width={96}
								height={96}
							/>
						</div>
					</div>
					<h2 className="text-xl font-bold sm:text-3xl">{user?.displayName}</h2>

					<p className="mt-4 inline-flex items-center gap-2">
						{user?.email}

						{!user?.emailVerified && <GoVerified className="text-green-500" />}
					</p>
					<br />
					<p className="mt-4 text-gray-500 inline-flex items-center gap-2">
						Joined on {dayjs(user?.metadata.creationTime).format("MMMM, YYYY")}
					</p>
				</div>
				<div className="flex flex-col  sm:flex-row gap-4 my-4">
					<div className="stats shadow">
						<div className="stat text-center">
							<div className="stat-title">Total Note Entered</div>
							<div className="stat-value text-center">
								{fetchLoading && !data ? `...` : data?.note_entries}
							</div>
							<div className="stat-desc">
								Around Rs{" "}
								<strong>{fetchLoading && !data ? `...` : data?.total}</strong>
							</div>
						</div>
					</div>
					<div className="stats shadow text-center">
						<div className="stat">
							<div className="stat-title">Total Hits</div>
							<div className="stat-value">{fetchLoading ? `...` : hits}</div>
							<div className="stat-desc">More Notes, More Hits</div>
						</div>
					</div>
				</div>
			</header>
			<button
				className="btn btn-error btn-outline btn-wide my-4"
				onClick={() => signOut()}
			>
				Logout
			</button>
		</div>
	);
};

export default Dashboard;
