import { colorFromDenomination } from "@/data/denomination";
import { auth, db } from "@/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { collectionGroup, query, where } from "firebase/firestore";
import Link from "next/link";
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

					<tbody className="gap-2">
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
		<tr className="max-[450px]:flex max-[450px]:flex-col max-[450px]:border-2 max-[450px]:my-2">
			<td>
				<div className="flex items-center space-x-3">
					<div
						className={`${colorFromDenomination(
							note.denomination_value
						)} w-20 h-10 px-1 text-xl text-right font-semibold`}
					>
						{note.denomination_value}
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
					{dayjs(note.timestamp.seconds * 1000).fromNow(true)} ago
				</span>
			</td>
			<td>{note.city}</td>
			<th className="max-[450px]:text-right">
				<Link className="btn btn-ghost btn-xs" href={`/note/${note.note}`}>
					details
				</Link>
			</th>
		</tr>
	);
};

const SkeletonRow = () => {
	return (
		<tr className="max-[450px]:flex max-[450px]:flex-col animate-pulse">
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
			<th>Note Information</th>
			<th>Entry Date</th>
			<th>City</th>
			<th></th>
		</tr>
	);
};

export default MyNotesTable;
