import { DENOMINATIONS } from "@/data/denomination";
import { NOTE_PREFIX } from "@/data/prefix";
import { auth, db } from "@/firebase";
import RadioSelectField from "@/ui/RadioSelect";
import { prefixObject } from "@/utils/prefixObject";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import { Form, Formik, FormikValues } from "formik";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import NoteDetail from "./NoteDetail";
import UserDetail from "./UserDetail";

const INITIAL_VALUES = {
	prefix_text: "क",
	prefix_number: "",
	serial_number: "",
	city: "",
	comments: "",
};

const RupeeFormSchema = Yup.object().shape({
	prefix_text: Yup.string()
		.oneOf(
			NOTE_PREFIX.map((prefix) => prefix.de_name),
			"Invalid Prefix"
		)
		.required("Required"),
	prefix_number: Yup.string()
		.max(2, "Invalid Prefix Number")
		.required("Required"),
	serial_number: Yup.string()
		.max(6, "Invalid Serial Number")
		.required("Required"),
	city: Yup.string().required("Required"),
	comments: Yup.string(),
});

const RupeeForm = () => {
	const [user] = useAuthState(auth);

	const handleSubmit = async (values: FormikValues, actions: any) => {
		const toastId = toast.loading("Submitting...");

		const prefix_data = {
			prefix_number: values.prefix_number,
			...prefixObject(
				"prefix_",
				NOTE_PREFIX.filter((prefix) => prefix.de_name === values.prefix_text)[0]
			),
		};

		const denomination_data = prefixObject(
			"denomination_",
			DENOMINATIONS.filter(
				(denomination) => denomination.label === values.denomination
			)[0]
		);

		const note_id = `${prefix_data.prefix_ro_name}-${prefix_data.prefix_number}-${values.serial_number}`;

		const data = {
			serial_number: values.serial_number,
			...prefix_data,
			...denomination_data,
		};

		const querySnapshot = await getDocs(
			query(
				collection(db, "notes", note_id, "users"),
				orderBy("timestamp", "desc"),
				limit(1)
			)
		);

		if (!querySnapshot.empty) {
			const snapData = querySnapshot.docs[0].data();
			const newData = prefixObject("last_", {
				city: snapData.city,
				comments: snapData.comments,
				timestamp: snapData.timestamp,
				user: snapData.user,
			});
			await addDoc(collection(db, "hits"), {
				...data,
				timestamp: serverTimestamp(),
				...newData,
				new_city: values.city,
				new_comment: values.comments,
				new_timestamp: serverTimestamp(),
				new_user: user?.email?.split("@")[0],
				users: [newData.last_user, user?.email?.split("@")[0]],
			});
			toast.loading("Match Found", {
				id: toastId,
			});
		} else {
			toast.loading("No Matched Found", {
				id: toastId,
			});
		}

		await setDoc(doc(db, "notes", note_id), data);

		if (user?.uid && user.email) {
			await setDoc(doc(db, "notes", note_id, "users", user.uid), {
				note: note_id,
				city: values.city,
				comments: values.comments,
				user: user.email.split("@")[0],
				...prefix_data,
				...denomination_data,
				timestamp: serverTimestamp(),
			});
		}
		actions.setSubmitting(false);
		toast.success("Successfully Added", {
			id: toastId,
		});
	};

	return (
		<Formik
			enableReinitialize
			initialValues={INITIAL_VALUES}
			validationSchema={RupeeFormSchema}
			onSubmit={handleSubmit}
		>
			{(props) => (
				<Form className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8 gap-4">
					<NoteDetail values={props.values} />
					<RadioSelectField
						label="Denomination"
						name="Denomination"
						options={DENOMINATIONS}
						placeholder="Select Denomination"
					/>
					<UserDetail />
					<div className="w-full flex flex-row justify-center gap-8 mt-4">
						<button
							className={`btn btn-wide btn-primary rounded-none ${
								props.isSubmitting && "btn-loading"
							}`}
							type="submit"
						>
							Submit
						</button>
						<button
							className="btn btn-outline btn-error rounded-none"
							type="reset"
						>
							Clear
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default RupeeForm;
