import { useField } from "formik";
import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	placeholder?: string;
	type?: HTMLInputTypeAttribute;
	autoComplete?: string;
	className?: string;
	leftAddon?: string;
	disabled?: boolean;
	maxLength?: number;
};

const InputField = (props: InputFieldProps) => {
	const [field, { error, touched }] = useField(props);
	return (
		<div className="w-full">
			<label htmlFor={field.name} className={"label"}>
				<span className="label-text block text-sm font-medium">
					{props.label}
				</span>
				{error && touched && (
					<span className="label-text-alt text-red-600">{error}</span>
				)}
			</label>
			{props.leftAddon ? (
				<label className="input-group">
					<span>{props.leftAddon}</span>
					<input
						{...field}
						maxLength={props.maxLength}
						disabled={props.disabled}
						type={props.type}
						autoComplete={props.autoComplete}
						placeholder={props.placeholder}
						className={`input input-md input-bordered w-full ${
							error && touched && "input-error"
						} ${props.className}`}
					/>
				</label>
			) : (
				<input
					disabled={props.disabled}
					{...field}
					maxLength={props.maxLength}
					type={props.type}
					autoComplete={props.autoComplete}
					placeholder={props.placeholder}
					className={`input input-md input-bordered w-full ${
						error && touched && "input-error"
					} ${props.className}`}
				/>
			)}
		</div>
	);
};

InputField.defaultProps = {
	disabled: false,
};

export default InputField;
