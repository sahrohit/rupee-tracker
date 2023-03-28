import { colorFromDenomination } from "@/data/denomination";
import { cesor } from "@/utils/censor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
dayjs.extend(relativeTime);

interface NoteTableRow {
	city: string;
	comments?: string;
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

interface NoteTableRowProps {
	note: NoteTableRow;
}

export const NoteTableRow = ({ note }: NoteTableRowProps) => {
	return (
		<tr className="max-[450px]:flex max-[450px]:flex-col max-[450px]:border-2 max-[450px]:my-2">
			<td></td>

			<td>
				{dayjs(note.timestamp.seconds * 1000).format("MMMM D, YYYY h:mm A")}
				<br />
				<span className="badge badge-ghost badge-sm">
					{dayjs(note.timestamp.seconds * 1000).fromNow(true) + " ago"}
				</span>
			</td>
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
			<td>{note.city}</td>
			<td>{cesor(note.user)}</td>
			<td>{note.comments}</td>
			<th className="max-[450px]:text-right">
				<Link className="btn btn-ghost btn-xs" href={`/note/${note.note}`}>
					details
				</Link>
			</th>
		</tr>
	);
};

export const NoteSkeletonRow = () => {
	return (
		<tr className="max-[450px]:flex max-[450px]:flex-col animate-pulse">
			<td></td>
			<td>
				<p className="h-4 w-full bg-gray-200 rounded-md dark:bg-gray-700"></p>
				<p className="h-4 w-1/3 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
			</td>
			<td>
				<div className="flex items-center space-x-3 w-full">
					<div
						className={`bg-gray-200 dark:bg-gray-700 w-20 h-10 px-1 text-xl text-right`}
					></div>

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
				<p className="h-4 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>

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

export const NoteTableHeaderFooter = () => {
	return (
		<>
			<tr className="max-[450px]:hidden">
				<th className="sticky h-50"></th>
				<th className="sticky h-50">Entry Date & Time</th>
				<th className="sticky h-50">Note Information</th>
				<th className="sticky h-50">City</th>
				<th className="sticky h-50">User</th>
				<th className="sticky h-50">Comments</th>
				<th className="sticky h-50">Details</th>
			</tr>
		</>
	);
};
