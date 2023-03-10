import { auth, db } from "@/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { collectionGroup, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
dayjs.extend(relativeTime);

const MyNotesTable = () => {
	const [user] = useAuthState(auth);

	const [value, loading] = useCollectionData(
		query(
			collectionGroup(db, "users"),
			where("user", "==", user?.email?.split("@")[0] || "-")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	return (
		<div className="lg:col-span-2 lg:py-8">
			<div className="overflow-x-auto w-full">
				<table className="table w-full">
					<thead>
						<TableHeaderFooter />
					</thead>

					<tbody className="max-[450px]:border-2">
						{loading
							? Array(3)
									.fill(" ")
									.map((_value, index) => (
										<SkeletonRow key={`skeleton-${index}`} />
									))
							: value?.map((note: any) => (
									<TableRow key={`${note.note}-mynotes`} note={note} />
							  ))}
					</tbody>

					{/* 					<tfoot>
						<TableHeaderFooter />
					</tfoot> */}
				</table>
			</div>
		</div>
	);
};

interface TableRow {
	city: string;
	comments: string;
	denomination_label: string;
	denomination_value: number;
	note: string;
	prefix_de_name: string;
	prefix_number: string;
	prefix_ro_name: string;
	prefix_value: string;
	timestamp: {
		seconds: number;
		nanoseconds: number;
	};
	user: string;
}

interface TableRowProps {
	note: TableRow;
}

const TableRow = ({ note }: TableRowProps) => {
	return (
		<tr className="max-[450px]:flex max-[450px]:flex-col">
			<th></th>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src="https://picsum.photos/200/300" alt="Mockup Image" />
						</div>
					</div>
					<div>
						<div className="font-bold">{note.note}</div>
						<div className="text-sm opacity-50">
							Rs {note.denomination_value}
						</div>
					</div>
				</div>
			</td>
			<td>
				{dayjs(note.timestamp.seconds * 1000).format("MMMM D, YYYY h:mm A")}
				<br />
				<span className="badge badge-ghost badge-sm">
					{dayjs(note.timestamp.seconds * 1000).fromNow(true)}
				</span>
			</td>
			<td>{note.city}</td>
			<th>
				<button className="btn btn-ghost btn-xs">details</button>
			</th>
		</tr>
	);
};

const SkeletonRow = () => {
	return (
		<tr className="max-[450px]:flex max-[450px]:flex-col animate-pulse">
			<th></th>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="flex-shrink-0">
							<span className="mask mask-squircle w-12 h-12 block bg-gray-200 rounded-xl dark:bg-gray-700"></span>
						</div>
					</div>
					<div className="w-full">
						<h3 className="h-4 w-1/2 bg-gray-200 rounded-md dark:bg-gray-700"></h3>
						<div className="text-sm opacity-50 mt-1">
							<p className="h-4 w-1/6 bg-gray-200 rounded-md dark:bg-gray-700"></p>
						</div>
					</div>
				</div>
			</td>
			<td>
				<h3 className="h-4 w-1/2 bg-gray-200 rounded-md dark:bg-gray-700"></h3>
				<p className="h-4 w-1/6 bg-gray-200 rounded-md dark:bg-gray-700 mt-1"></p>
			</td>
			<td>
				<p className="h-4 w-1/2 bg-gray-200 rounded-md dark:bg-gray-700 mt-1"></p>
			</td>
			<th>
				<p className="h-4 w-1/2 bg-gray-200 rounded-md dark:bg-gray-700 mt-1"></p>
			</th>
		</tr>
	);
};

const TableHeaderFooter = () => {
	return (
		<tr className="max-[450px]:hidden">
			<th></th>
			<th>Note Information</th>
			<th>Entry Date</th>
			<th>City</th>
			<th></th>
		</tr>
	);
};

export default MyNotesTable;
