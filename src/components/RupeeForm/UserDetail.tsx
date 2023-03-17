import InputField from "@/ui/InputField";

const UserDetail = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row gap-4">
				<InputField
					label="City"
					name="city"
					placeholder="eg. Kathmandu"
					type="text"
				/>{" "}
				<InputField
					label="Year (optional)"
					name="year"
					placeholder="eg. 2016"
					type="number"
				/>
			</div>
			<InputField
				label="Additional Comments (optional)"
				name="comments"
				placeholder="E.g. `Received at the supermarket`, `brand new`, `ATM` etc."
				type="text"
			/>
		</div>
	);
};

export default UserDetail;
