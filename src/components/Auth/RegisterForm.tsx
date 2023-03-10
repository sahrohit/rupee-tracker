import { auth } from "@/firebase";
import InputField from "@/ui/InputField";
import { updateProfile } from "firebase/auth";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
	first_name: Yup.string().required("Required"),
	last_name: Yup.string().required("Required"),
	email: Yup.string().email("Invalid Email").required("Required"),
	password: Yup.string()
		.min(6, "Too Short")
		.max(30, "Too Long")
		.required("Required"),
	confirm_password: Yup.string().oneOf(
		[Yup.ref("password")],
		"Passwords must match"
	),
});

const RegisterForm = () => {
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	return (
		<Formik
			initialValues={{
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				confirm_password: "",
			}}
			validationSchema={RegisterSchema}
			onSubmit={async (values) => {
				const userCredential = await createUserWithEmailAndPassword(
					values.email,
					values.password
				);
				if (error) {
					toast.error(error.message);
				}
				if (userCredential) {
					updateProfile(userCredential.user, {
						displayName: `${values.first_name} ${values.last_name}`,
					})
						.then(() => {})
						.catch((error) => {
							toast.error(error.message);
						});
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className="mt-8 grid grid-cols-6 gap-6 w-full">
					<div className="col-span-6 sm:col-span-3">
						<InputField
							type="text"
							label="First Name"
							name="first_name"
							id="first_name"
							autoComplete="first_name"
						/>
					</div>

					<div className="col-span-6 sm:col-span-3">
						<InputField
							type="text"
							label="Last Name"
							name="last_name"
							id="last_name"
							autoComplete="last_name"
						/>
					</div>

					<div className="col-span-6">
						<InputField
							type="email"
							label="Email"
							name="email"
							id="email"
							autoComplete="email"
						/>
					</div>

					<div className="col-span-6 sm:col-span-3">
						<InputField
							type="password"
							label="Password"
							name="password"
							id="password"
							autoComplete="new-password"
						/>
					</div>

					<div className="col-span-6 sm:col-span-3">
						<InputField
							type="password"
							label="Confirm Password"
							name="confirm_password"
							id="confirm_password"
							autoComplete="new-password"
						/>
					</div>

					<div className="col-span-6">
						<label htmlFor="MarketingAccept" className="flex gap-4">
							<input
								type="checkbox"
								id="MarketingAccept"
								name="marketing_accept"
								className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
							/>

							<span className="text-sm text-gray-700">
								I want to receive emails about events, product updates and
								company announcements.
							</span>
						</label>
					</div>

					<div className="col-span-6">
						<p className="text-sm text-gray-500">
							By creating an account, you agree to submit correct details.
						</p>
					</div>

					<div className="col-span-6 sm:flex sm:items-center sm:gap-4">
						<button
							className={`btn btn-primary px-16 ${
								(isSubmitting || loading) && `btn-disabled`
							}`}
							disabled={isSubmitting || loading}
						>
							Create an account
						</button>

						<p className="mt-4 text-sm text-gray-500 sm:mt-0">
							Already have an account?{" "}
							<Link href="/auth/login" className="text-gray-700 underline">
								Log in
							</Link>
							.
						</p>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
