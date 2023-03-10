import { db } from "@/firebase";
import { collectionGroup, limit, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const TestPage = () => {
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

	console.log("Loading", loading);
	console.log(value);

	return (
		<div>
			<button className="btn btn-primary">Action</button>

			<pre>{JSON.stringify({ test: "test", ...value }, null, 2)}</pre>
		</div>
	);
};

export default TestPage;
