import { db } from "@/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
dayjs.extend(relativeTime);

interface TopUsersProps {
	setLastUpdated: Dispatch<SetStateAction<number>>;
}

const TopUsers = ({ setLastUpdated }: TopUsersProps) => {
	const [value, loading] = useCollection(
		query(
			collection(db, "leaderboard"),
			orderBy("note_entries", "desc"),
			limit(10)
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	useEffect(() => {
		setLastUpdated(value?.docs[0]?.data().last_updated.seconds);

		return () => {
			setLastUpdated(0);
		};
	}, [setLastUpdated, value]);

	return (
		<table className="min-w-full divide-y-2 text-sm border-2">
			<thead>
				<tr>
					<th className="whitespace-nowrap px-4 py-2 text-left font-medium ">
						User
					</th>
					<th className="whitespace-nowrap px-4 py-2 text-left font-medium ">
						Value
					</th>
				</tr>
			</thead>

			<tbody className="divide-y divide-gray-200">
				{loading
					? Array(10)
							.fill(" ")
							.map((_value, index) => (
								<tr key={`$skeleton-${index}`} className="animate-pulse">
									<td className="whitespace-nowrap px-4 py-2 font-medium ">
										<p className="h-4 bg-primary rounded-md"></p>
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700">
										<p className="h-4 bg-primary rounded-md"></p>
									</td>
								</tr>
							))
					: value?.docs.map((doc, index) => (
							<tr key={doc.id}>
								<td className="whitespace-nowrap px-4 py-2 font-medium ">
									<span className={`px-1`}>{index + 1}</span>: {doc.id} (
									{doc.data().note_entries})
								</td>
								<td className="whitespace-nowrap px-4 py-2">
									Rs. {doc.data().total.toLocaleString()}
								</td>
							</tr>
					  ))}
			</tbody>
		</table>
	);
};

export default TopUsers;
