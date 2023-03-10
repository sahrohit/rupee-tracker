import { db } from "@/firebase";
import dayjs from "dayjs";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import relativeTime from "dayjs/plugin/relativeTime";
import { colorFromDenomination } from "@/data/denomination";
dayjs.extend(relativeTime);

const LiveHits = () => {
	const [value, loading] = useCollectionData(
		query(collection(db, "hits"), orderBy("timestamp", "desc"), limit(10)),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	return (
		<table className="min-w-full divide-y-2 divide-gray-200 text-sm border-2">
			<thead>
				<tr>
					<th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
						User
					</th>
					<th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
						Days
					</th>
				</tr>
			</thead>

			<tbody className="divide-y divide-gray-200">
				{loading
					? Array(10)
							.fill(" ")
							.map((_value, index) => (
								<tr key={`$skeleton-${index}`} className="animate-pulse">
									<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
										<p className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"></p>
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700">
										<p className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"></p>
									</td>
								</tr>
							))
					: value?.map((note) => (
							<tr key={`${note.denomination_label}-${note.new_user}`}>
								<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
									<span className={`${colorFromDenomination(note.denomination_value)} px-1`}>
										{note.denomination_value}
									</span>
									:{" "}
									{`${note.prefix_ro_name}-${note.prefix_number}-${note.serial_number}`}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700">
									{dayjs(note.new_timestamp.seconds * 1000).from(
										dayjs(note.last_timestamp.seconds * 1000)
									)}
								</td>
							</tr>
					  ))}
			</tbody>
		</table>
	);
};

export default LiveHits;
