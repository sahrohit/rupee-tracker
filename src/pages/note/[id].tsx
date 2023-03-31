/* eslint-disable @next/next/no-img-element */
import { YEARS, noteFromDenomination } from "@/data/notedata";
import { numberToNepali } from "@/data/number";
import { db } from "@/firebase";
import FullPageLoadingSpinner from "@/shared/FullPageLoadingSpinner";
import dayjs from "dayjs";
import { collectionGroup, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Note = () => {
	const router = useRouter();
	const { id } = router.query;

	const [value, loading, error] = useCollectionData(
		query(
			collectionGroup(db, "users"),
			where("note", "==", id || "-"),
			orderBy("timestamp", "desc")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	console.log(YEARS);

	const notedetails = value?.[0];
	const users: UserDetailsProps[] | undefined = value?.map((user) => {
		return {
			name: user.user,
			timestamp: user.timestamp,
			city: user.city,
			comments: user.comments,
		};
	});

	if (loading) return <FullPageLoadingSpinner />;

	if (error) return <h1>Error: {error.message}</h1>;

	if (!loading && !error && value?.length == 0)
		return (
			<div className="flex flex-col h-screen bg-white">
				<img
					src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
					alt=""
					className="object-cover w-full h-64"
				/>

				<div className="flex items-center justify-center flex-1">
					<div className="max-w-xl px-4 py-8 mx-auto text-center">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							We can`t find that note.
						</h1>

						<p className="mt-4 text-gray-500">
							Try searching again, or return home to start from the beginning.
						</p>

						<div className="flex flex-row flex-wrap gap-2 justify-center">
							<button
								onClick={() => {
									router.back();
								}}
								className="btn btn-wide btn-primary mt-8"
							>
								Go Back
							</button>
							<Link className="btn btn-wide btn-primary mt-8" href="/" passHref>
								Go Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		);

	const noteData = noteFromDenomination(notedetails?.denomination_value);

	return (
		<div className="p-4">
			<h2 className="text-3xl font-bold sm:text-5xl devnagiri text-center py-4">
				{id}
			</h2>

			<div className="w-full flex flex-row flex-wrap sm:p-8 text-left gap-8 justify-around">
				<div className="sm:basis-1/2">
					<p className="whitespace-pre-line">
						The obeverse part of the note has{" "}
						<strong>{noteData?.description_obverse}</strong>.
						<br />
						<br />
						The back of the note has{" "}
						<strong>{noteData?.description_reverse}</strong>
						<br />
						<br />
						Note contains <strong>{noteData?.main_color}</strong> color.
					</p>
				</div>
				<div className="text-center pb-4">
					<div className="flex flex-row gap-4 justify-center h-full items-center bg-wavy ">
						<div className="flex flex-col items-center">
							<h2 className="devnagiri text-4xl">
								{notedetails?.prefix_de_name}
							</h2>
							<h2 className="devnagiri text-4xl">
								{numberToNepali(notedetails?.prefix_number, 2)}
							</h2>
						</div>
						<div className="devnagiri text-7xl">
							{numberToNepali(notedetails?.note.slice(-6), 6)}
						</div>
					</div>
					<p className="italic label-text text-center">
						Released in <strong>{noteData?.year}</strong> among the{" "}
						{noteData?.header}
					</p>
				</div>
			</div>
			{users != undefined && <UserDetails users={users} />}
		</div>
	);
};

export default Note;

interface UserDetailsProps {
	name: string;
	timestamp: {
		seconds: number;
		nanoseconds: number;
	};
	city: string;
	comments: string;
}

const UserDetails = ({ users }: any) => {
	return (
		<div className="py-8">
			<ol
				className={`rounded-lg border border-gray-100 text-sm text-gray-500 flex lg:flex-row flex-col-reverse flex-wrap gap-4 justify-center w-full`}
			>
				{users.map((user: UserDetailsProps, index: number) => (
					<li
						key={user.name}
						className={`relative flex items-center justify-center gap-2 p-4 grow ${
							index == users.length - 1 && `bg-gray-50`
						}`}
					>
						{index == users.length - 1 && (
							<span className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-b-0 border-l-0 border-gray-100 bg-white sm:block"></span>
						)}
						{index == 0 && (
							<span className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-b-0 border-l-0 border-gray-100 bg-gray-50 sm:block"></span>
						)}

						<h2 className="text-6xl mx-2 strokeme">{index + 1}</h2>

						<p className="leading-none">
							<strong className="block font-medium text-xl">
								{user.name}
								{index == users.length - 1 && `(current holder)`}
							</strong>
							<p className="mt-1 text-lg">
								{dayjs(user.timestamp.seconds * 1000).format(
									"MMMM D, YYYY h:mm A"
								)}{" "}
								in {user.city}
							</p>
							<p className="mt-1 text-md">{user.comments}</p>
						</p>
					</li>
				))}
			</ol>
		</div>
	);
};
