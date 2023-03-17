import Navbar from "@/components/Navbar";
import {
	SkeletonRow,
	TableHeaderFooter,
	TableRow,
} from "@/components/Stats/HitsTable";
import Footer from "@/components/shared/Footer";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const HitsPage = () => {
	const [value, loading] = useCollectionData(
		query(collection(db, "hits"), orderBy("timestamp", "desc")),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	return (
		<>
			<Navbar />
			<div className="lg:col-span-2 lg:py-4">
				<div className="mx-auto max-w-lg text-center pb-4">
					<h2 className="text-3xl font-bold sm:text-4xl">Hits</h2>

					<p className="my-4">
						Live list of all hits on the website. This includes all hits on the
						website, keep adding more notes to get your odds better.
					</p>
				</div>

				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead className="sticky top-0">
							<TableHeaderFooter />
						</thead>

						<tbody className="max-[450px]:border-2">
							{loading
								? Array(10)
										.fill(" ")
										.map((_value, index) => (
											<SkeletonRow key={`skeleton-${index}-2`} />
										))
								: value?.map((note: any) => (
										<>
											<TableRow key={note.timestamp.seconds} note={note} />
										</>
								  ))}
						</tbody>

						{/* <tfoot>
						<TableHeaderFooter />
					</tfoot> */}
					</table>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default HitsPage;
