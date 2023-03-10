import { InputHTMLAttributes } from "react";
import { useField } from "formik";

type SelectFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder: string;
	options: Record<string, string>[] | undefined;
};

const SelectField = (props: SelectFieldProps) => {
	const [field] = useField(props);
	return (
		<div className="w-full">
			<label className="label label-text block text-sm font-medium">
				<span className="label-text">{props.label}</span>
			</label>
			<select
				{...field}
				name={field.name}
				className="select select-bordered w-full max-w-xs"
			>
				{props.options?.map((option: Record<string, string>) => (
					<option key={option.value} value={option.value}>
						{option.option}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectField;
