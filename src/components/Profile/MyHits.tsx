import { auth, db } from "@/firebase";
import dayjs from "dayjs";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const MyHitsTable = () => {
	const [user] = useAuthState(auth);

	const [value, loading] = useCollectionData(
		query(
			collection(db, "hits"),
			where("users", "array-contains", user?.email?.split("@")[0] || "-")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true, },
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
										<SkeletonRow key={`skeleton-${index}-2`} />
									))
							: value?.map((note: any) => (
									<TableRow key={note.timestamp.seconds} note={note} />
							  ))}
					</tbody>

					{/* <tfoot>
						<TableHeaderFooter />
					</tfoot> */}
				</table>
			</div>
		</div>
	);
};

interface TableRow {
	denomination_label: string;
	denomination_value: number;
	last_city: string;
	last_comments: string;
	last_timestamp: {
		seconds: number;
		nanoseconds: number;
	};
	last_user: string;
	new_city: string;
	new_comment: string;
	new_timestamp: {
		seconds: number;
		nanoseconds: number;
	};
	new_user: string;
	prefix_de_name: string;
	prefix_number: string;
	prefix_ro_name: string;
	prefix_value: string;
	serial_number: string;
	timestamp: {
		seconds: number;
		nanoseconds: number;
	};
}

interface TableRowProps {
	note: TableRow;
}

const TableRow = ({ note }: TableRowProps) => {
	return (
		<tr className="max-[450px]:flex max-[450px]:flex-col">
			<td></td>

			<td>
				{dayjs(note.timestamp.seconds * 1000).format("MMMM D, YYYY h:mm A")}
				<br />
				<span className="badge badge-ghost badge-sm">
					{dayjs(note.timestamp.seconds * 1000).fromNow(true)}
				</span>
			</td>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src="https://picsum.photos/200/300" alt="Mockup Image" />
						</div>
					</div>
					<div>
						<div className="font-bold">{`${note.prefix_ro_name}-${note.prefix_number}-${note.serial_number}`}</div>
						<div className="text-sm opacity-50">
							Rs {note.denomination_value}
						</div>
					</div>
				</div>
			</td>
			<td>
				{note.new_city}
				<div className="text-sm opacity-50">{note.last_city}</div>
			</td>
			<td>
				{note.new_user}
				<div className="text-sm opacity-50">{note.last_user}</div>
			</td>
			<td>
				{dayjs(note.new_timestamp.seconds * 1000).from(
					dayjs(note.last_timestamp.seconds * 1000)
				)}
			</td>
			<th>
				<button className="btn btn-ghost btn-xs">details</button>
			</th>
		</tr>
	);
};

const SkeletonRow = () => {
	return (
		<tr className="max-[450px]:flex max-[450px]:flex-col animate-pulse">
			<td></td>
			<td>
				<p className="h-4 w-full bg-gray-200 rounded-md dark:bg-gray-700"></p>
				<p className="h-4 w-1/3 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
			</td>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="flex-shrink-0">
							<span className="mask mask-squircle w-12 h-12 block bg-gray-200 rounded-xl dark:bg-gray-700"></span>
						</div>
					</div>
					<div className="w-full">
						<h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"></h3>

						<p className="h-4 w-1/5 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
					</div>
				</div>
			</td>
			<td>
				<p className="h-4  mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>

				<div className="text-sm opacity-50">
					{" "}
					<p className="h-4 w-4/5 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
				</div>
			</td>
			<td>
				<p className="h-4  mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>

				<div className="text-sm opacity-50">
					{" "}
					<p className="h-4 w-4/5 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
				</div>
			</td>
			<td>
				<p className="h-4 w-4/5 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
			</td>
			<th>
				<p className="h-4 w-4/5 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
			</th>
		</tr>
	);
};

const TableHeaderFooter = () => {
	return (
		<>
			<tr className="max-[450px]:hidden">
				<th></th>
				<th>Hit Date & Time</th>
				<th>Note Information</th>
				<th>City</th>
				<th>User</th>
				<th>Matched</th>
				<th></th>
			</tr>
		</>
	);
};

export default MyHitsTable;
