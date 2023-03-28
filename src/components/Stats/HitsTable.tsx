import { colorFromDenomination } from "@/data/denomination";
import { cesor } from "@/utils/censor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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

export const TableRow = ({ note }: TableRowProps) => {
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
						<div className="font-bold">{`${note.prefix_ro_name}-${note.prefix_number}-${note.serial_number}`}</div>
						<div className="text-sm opacity-50">
							Rs {note.denomination_value}
						</div>
					</div>
				</div>
			</td>
			<td>
				{note.new_city}
				<div className="text-sm opacity-50">{note.last_city} (last)</div>
			</td>
			<td>
				{cesor(note.new_user)}
				<div className="text-sm opacity-50">{cesor(note.last_user)} (last)</div>
			</td>
			<td>
				{dayjs(note.new_timestamp.seconds * 1000).from(
					dayjs(note.last_timestamp.seconds * 1000)
				)}
			</td>
		</tr>
	);
};

export const SkeletonRow = () => {
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
				<p className="h-4  mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>

				<div className="text-sm opacity-50">
					{" "}
					<p className="h-4 w-4/5 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
				</div>
			</td>
			<td>
				<p className="h-4 w-4/5 mt-1 bg-gray-200 rounded-md dark:bg-gray-700"></p>
			</td>
		</tr>
	);
};

export const TableHeaderFooter = () => {
	return (
		<>
			<tr className="max-[450px]:hidden">
				<th className="sticky h-50"></th>
				<th className="sticky h-50">Hit Date & Time</th>
				<th className="sticky h-50">Note Information</th>
				<th className="sticky h-50">City</th>
				<th className="sticky h-50">User</th>
				<th className="sticky h-50">Matched</th>
			</tr>
		</>
	);
};
