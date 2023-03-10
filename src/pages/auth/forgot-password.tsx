import { auth } from "@/firebase";
import InputField from "@/ui/InputField";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { BsCheck } from "react-icons/bs";

const ForgotPasswordPage = () => {
	const [emailSent, setEmailSent] = useState(false);
	const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

	return (
		<Formik
			initialValues={{ email: "" }}
			onSubmit={async (values) => {
				setEmailSent(true);
				toast.promise(sendPasswordResetEmail(values.email), {
					loading: "Sending...",
					success: "Email Sent",
					error: "An Error Occured",
				});
			}}
		>
			{({ isSubmitting }) => (
				<Form className="h-screen w-full grid place-items-center">
					<div className="w-full flex flex-col gap-2 max-w-sm">
						<div>
							<h1 className="text-3xl font-bold py-1 ">
								Reset your password here
							</h1>
						</div>
						<InputField
							name="email"
							label="Email"
							placeholder="Email"
							type="email"
							autoComplete="email"
						/>

						<button
							className={`btn btn-primary w-full gap-2 rounded-md ${
								isSubmitting && "loading"
							} ${emailSent && "btn-disabled text-green-700"} `}
							type="submit"
						>
							{emailSent && <BsCheck transform="scale(2)" fill="green" />}
							{isSubmitting
								? "Loading"
								: !emailSent
								? "Send Verification Link"
								: "Verification Link Sent"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ForgotPasswordPage;
