import { colorFromDenominationRadio } from "@/data/denomination";
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
				className={`w-16 flex cursor-pointer items-center justify-center border border-gray-100 py-2 px-3 hover:border-gray-200 ${colorFromDenominationRadio(
					value
				)} peer-checked:bg-blue-500 peer-checked:text-white rounded-none`}
			>
				<p className="text-md font-medium">{label}</p>
			</label>
			{value === 25 && (
				<div className="relative -top-14">
					<svg
						className="w-6 h-6 absolute"
						version="1.1"
						id="Layer_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 92.27 122.88"
						xmlSpace="preserve"
					>
						<g>
							<path
								className="st0"
								d="M18.61,54.89C15.7,28.8,30.94,10.45,59.52,0C42.02,22.71,74.44,47.31,76.23,70.89 c4.19-7.15,6.57-16.69,7.04-29.45c21.43,33.62,3.66,88.57-43.5,80.67c-4.33-0.72-8.5-2.09-12.3-4.13C10.27,108.8,0,88.79,0,69.68 C0,57.5,5.21,46.63,11.95,37.99C12.85,46.45,14.77,52.76,18.61,54.89L18.61,54.89z"
							/>
							<path
								className="st1"
								d="M33.87,92.58c-4.86-12.55-4.19-32.82,9.42-39.93c0.1,23.3,23.05,26.27,18.8,51.14 c3.92-4.44,5.9-11.54,6.25-17.15c6.22,14.24,1.34,25.63-7.53,31.43c-26.97,17.64-50.19-18.12-34.75-37.72 C26.53,84.73,31.89,91.49,33.87,92.58L33.87,92.58z"
							/>
						</g>
					</svg>
				</div>
			)}
			{value === 250 && (
				<div className="relative -top-16 animate-[wave_5s_ease-in-out_2] text-2xl select-none">
					👑
				</div>
			)}
		</div>
	);
};

export default RadioSelectField;
