import { convert_to_de } from "@/data/prefix";
import { db } from "@/firebase";
import { cesor } from "@/utils/censor";
import { collectionGroup, limit, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const LiveNote = () => {
	const [value, loading] = useCollectionData(
		query(
			collectionGroup(db, "users"),
			orderBy("timestamp", "desc"),
			limit(10)
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	return (
		<table className="min-w-full divide-y-2 text-sm border-2">
			<thead>
				<tr>
					<th className="whitespace-nowrap px-4 py-2 text-left font-medium">
						User
					</th>
					<th className="whitespace-nowrap px-4 py-2 text-left font-medium">
						Note
					</th>
				</tr>
			</thead>

			<tbody className="divide-y divide-gray-200">
				{loading
					? Array(10)
							.fill(" ")
							.map((_value, index) => (
								<tr key={`$skeleton-${index}`} className="animate-pulse">
									<td className="whitespace-nowrap px-4 py-2 font-medium">
										<p className="h-4 bg-primary rounded-md"></p>
									</td>
									<td className="whitespace-nowrap px-4 py-2">
										<p className="h-4 bg-primary rounded-md"></p>
									</td>
								</tr>
							))
					: value?.map((note) => (
							<tr key={`${note.note}-${note.user}`}>
								<td className="whitespace-nowrap px-4 py-2 font-medium ">
									{cesor(note.user)}
								</td>
								<td className="whitespace-nowrap px-4 py-2">
									{convert_to_de(note.note)}
								</td>
							</tr>
					  ))}
			</tbody>
		</table>
	);
};

export default LiveNote;
