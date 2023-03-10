import { auth, db } from "@/firebase";
import dayjs from "dayjs";
import {
	collection,
	collectionGroup,
	getCountFromServer,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { GoVerified } from "react-icons/go";
import { toast } from "react-hot-toast";

const Dashboard = () => {
	const [user] = useAuthState(auth);
	const [hits, setHits] = useState<number>();
	const [notes, setNotes] = useState<number>();

	const [signOut, loading, error] = useSignOut(auth);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	useEffect(() => {
		const callThisNow = async () => {
			const snapshot = await getCountFromServer(
				query(
					collection(db, "hits"),
					where("users", "array-contains", user?.email?.split("@")[0] || "-")
				)
			);
			console.log("SNAPSHOT DATA COUNT", snapshot.data().count);
			const snapshot2 = await getCountFromServer(
				query(
					collectionGroup(db, "users"),
					where("user", "==", user?.email?.split("@")[0] || "-")
				)
			);
			console.log("SNAPSHOT DATA COUNT", snapshot.data().count);
			setHits(snapshot.data().count);
			setNotes(snapshot2.data().count);
		};
		callThisNow();

		return () => {
			setNotes(0);
			setHits(0);
		};
	}, [user]);

	return (
		<div className="bg-gray-100 rounded-md flex flex-col md:flex-row justify-center gap-8 p-4 pt-8 mt-8">
			<header className="flex flex-col gap-8 sm:flex-row">
				<div>
					<div className="avatar">
						<div className="w-24 rounded-xl">
							<img src={user?.photoURL || "https://picsum.photos/200/300"} />
						</div>
					</div>
					<h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
						{user?.displayName}
					</h2>

					<p className="mt-4 text-gray-500 inline-flex items-center gap-2">
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
							<div className="stat-value">{notes}</div>
							<div className="stat-desc">
								Around Rs{" "}
								{/* {value?.reduce(
                                    (accumulator, currentValue) =>
                                    accumulator + currentValue.denomination_value,
                                    0
                                )} */}
							</div>
						</div>
					</div>
					<div className="stats shadow text-center">
						<div className="stat">
							<div className="stat-title">Total Hits</div>
							<div className="stat-value">{hits}</div>
							<div className="stat-desc">21% more than last month</div>
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
