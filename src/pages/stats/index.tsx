import Navbar from "@/components/Navbar";
import { NOTE_PREFIX, get_de_name, get_prefix } from "@/data/prefix";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";

const StatsPage = () => {
	const router = useRouter();
	return (
		<>
			<Navbar />
			<div className="grid place-items-center h-[70vh]">
				<Formik
					initialValues={{
						prefix: "क",
						prefix_number: "",
						serial_number: "",
					}}
					onSubmit={(values) => {
						router.push(
							`/note/${values.prefix}-${values.prefix_number}-${values.serial_number}`
						);
					}}
				>
					<Form>
						<h1 className="text-4xl font-semibold devnagiri mx-2 md:mx-0">
							Search
						</h1>
						<Field
							as="select"
							name="prefix"
							className="select select-bordered mx-2 md:mx-0"
						>
							{NOTE_PREFIX?.map((option: Record<string, string>) => (
								<option key={option.ro_name} value={option.ro_name}>
									{option.value}
								</option>
							))}
						</Field>
						<Field
							name="prefix_number"
							className="input input-bordered w- md:w-auto mx-2 md:mx-0"
							placeholder="Prefix Number"
						/>
						<Field
							name="serial_number"
							className="input input-bordered w-[90%] m-2 md:mx-0 md:w-96"
							placeholder="Serial Number"
						/>
						<button
							className="btn gap-2 btn-wide text-center mx-2 md:mx-0"
							type="submit"
						>
							<AiOutlineSearch className="scale-150" />
							Search
						</button>
					</Form>
				</Formik>
				<div>
					<h1 className="text-4xl font-semibold devnagiri mx-2 md:mx-0">
						Stats
					</h1>
					<div className="grid grid-cols-2 gap-8">
						<Link
							href="/stats/notes"
							className="bg-base-100 drop-shadow-md p-3 md:p-8 rounded-md flex flex-col gap-4 m-2 md:mx-0"
						>
							<h1 className="text-2xl md:text-4xl font-semibold">Notes</h1>
							<p>All entered notes are logged here.</p>
						</Link>
						<Link
							href="/stats/hits"
							className="bg-base-100 drop-shadow-md p-3 md:p-8 rounded-md flex flex-col gap-4 m-2 md:mx-0"
						>
							<h1 className="text-2xl md:text-4xl font-semibold">Hits</h1>
							<p>List of the all the hits are available here.</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default StatsPage;
