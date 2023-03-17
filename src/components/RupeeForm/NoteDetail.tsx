import { numberToNepali } from "@/data/number";
import { NOTE_PREFIX } from "@/data/prefix";
import InputField from "@/ui/InputField";
import SelectField from "@/ui/Select";
import { FormikValues } from "formik";

const NoteDetail = ({ values }: FormikValues) => {
	return (
		<div className="flex flex-col-reverse justify-between flex-wrap sm:flex-row">
			<div className="w-full sm:w-1/2">
				<h1 className="text-3xl font-semibold sm:text-4xl devnagiri">
					Note Details
				</h1>
				<div className="flex flex-row justify-between gap-8">
					<SelectField
						label="Prefix Text"
						name="prefix_text"
						placeholder="Prefix Text"
						options={NOTE_PREFIX.map((prefix) => ({
							value: prefix.de_name,
							option: prefix.value,
						}))}
					/>
					<InputField
						label="Prefix Number"
						name="prefix_number"
						placeholder="Prefix Number"
						type="numeric"
						maxLength={2}
					/>
				</div>
				<InputField
					label="Serial Number"
					name="serial_number"
					placeholder="Serial Number"
					type="numeric"
					maxLength={6}
				/>
			</div>
			<div className="w-full sm:w-1/2 ">
				<h1 className="text-3xl font-semibold sm:text-4xl sm:text-right devnagiri">
					Note Preview
				</h1>

				<div className="p-8 px-8 sm:px-20 ">
					{/* border-2 shadow-[inset_0_0_0_1000px_#ec7a5e] */}
					<div className="flex flex-row gap-4 justify-center h-full items-center bg-wavy text-black">
						<div className="flex flex-col items-center">
							<h2 className="devnagiri text-4xl">{values.prefix_text}</h2>
							<h2 className="devnagiri text-4xl">
								{numberToNepali(values.prefix_number, 2)}
							</h2>
						</div>
						<div className="devnagiri text-7xl">
							{numberToNepali(values.serial_number, 6)}
						</div>
					</div>
					<p className="italic label-text text-center">
						Make sure the note apperarnce matches the preview here.
					</p>
				</div>
			</div>
		</div>
	);
};

export default NoteDetail;
