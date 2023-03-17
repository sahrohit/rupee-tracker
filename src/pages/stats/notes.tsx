import Navbar from "@/components/Navbar";
import {
	NoteSkeletonRow,
	NoteTableHeaderFooter,
	NoteTableRow,
} from "@/components/Stats/NoteTable";
import Footer from "@/components/shared/Footer";
import { db } from "@/firebase";
import { collectionGroup, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const NotesPage = () => {
	const [value, loading] = useCollectionData(
		query(collectionGroup(db, "users"), orderBy("timestamp", "desc")),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	return (
		<>
			<Navbar />
			<div className="lg:col-span-2 lg:py-4">
				<div className="mx-auto max-w-lg text-center pb-4">
					<h2 className="text-3xl font-bold sm:text-4xl">Notes</h2>

					<p className="my-4">
						Every note entered here will be logged here. Keep looking out here,
						maybe you`ll see one of yours.
					</p>
				</div>

				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead className="sticky top-0">
							<NoteTableHeaderFooter />
						</thead>

						<tbody className="max-[450px]:border-2">
							{loading
								? Array(10)
										.fill(" ")
										.map((_value, index) => (
											<NoteSkeletonRow key={`skeleton-${index}-2`} />
										))
								: value?.map((note: any) => (
										<>
											<NoteTableRow key={note.timestamp.seconds} note={note} />
										</>
								  ))}
						</tbody>

						{/* <tfoot>
						<NoteTableHeaderFooter />
					</tfoot> */}
					</table>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default NotesPage;
