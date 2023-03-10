import InputField from "@/ui/InputField";

const UserDetail = () => {
	return (
		<div className="flex flex-col gap-2">
			<InputField
				label="City"
				name="city"
				placeholder="eg. Kathmandu"
				type="text"
			/>
			<InputField
				label="Additional Comments"
				name="comments"
				placeholder="E.g. `Received at the supermarket`, `brand new`, `ATM` etc."
				type="text"
			/>
		</div>
	);
};

export default UserDetail;
