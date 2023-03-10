import { useField } from "formik";
import { InputHTMLAttributes, useId } from "react";

type RadioSelectFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	options: RadioOptionsType[] | undefined;
};

interface RadioOptionsType {
	value: number;
	label: string;
}

const RadioSelectField = (props: RadioSelectFieldProps) => {
	const [field] = useField(props);
	return (
		<div className="w-full">
			<label className="label label-text block text-sm font-medium">
				<span className="label-text">{props.label}</span>
			</label>

			<fieldset className="flex flex-wrap gap-3" {...field}>
				{props.options?.map((option: RadioOptionsType) => (
					<RadioOption
						key={option.value}
						value={option.value}
						label={option.label}
					/>
				))}
			</fieldset>
		</div>
	);
};

const RadioOption = ({ value, label }: RadioOptionsType) => {
	const id = useId();

	return (
		<div>
			<input
				type="radio"
				name="denomination"
				value={value}
				id={id}
				className="peer hidden"
			/>

			<label
				htmlFor={id}
				className="w-16 flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white rounded-none"
			>
				<p className="text-md font-medium">{label}</p>
			</label>
		</div>
	);
};

export default RadioSelectField;
