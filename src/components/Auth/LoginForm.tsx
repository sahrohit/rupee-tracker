import { auth } from "@/firebase";
import InputField from "@/ui/InputField";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import LoadingSpinner from "../shared/LoadingSpinner";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid Email").required("Required"),
	password: Yup.string().required("Required"),
});

const LoginForm = () => {
	const router = useRouter();

	const [signInWithGoogle, _guser, gloading, gerror] =
		useSignInWithGoogle(auth);

	useEffect(() => {
		if (gerror) {
			toast.error(gerror.message);
		}
	}, [gerror]);

	const { redirect } = router.query;

	const [signInWithEmailAndPassword, _user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={LoginSchema}
			onSubmit={async (values) => {
				const userCredential = await signInWithEmailAndPassword(
					values.email,
					values.password
				);
				if (error) {
					toast.error(error.message);
				}
				if (userCredential) {
					toast.success(`Welcome back, ${userCredential.user.displayName}!`, {
						id: "logged-in",
					});

					if (redirect) {
						router.push(redirect as string);
					} else {
						router.push("/");
					}
				}
			}}
		>
			{({ isSubmitting }) => (
				<>
					<Form className="mt-8 grid grid-cols-6 gap-6">
						<div className="col-span-6">
							<InputField
								type="email"
								label="Email"
								name="email"
								id="email"
								autoComplete="email"
							/>
						</div>

						<div className="col-span-6">
							<InputField
								type="password"
								label="Password"
								name="password"
								id="password"
								autoComplete="current-password"
							/>
						</div>

						<div className="flex flex-row justify-between col-span-6">
							<label htmlFor="MarketingAccept" className="flex gap-4">
								<input
									type="checkbox"
									id="MarketingAccept"
									name="marketing_accept"
									className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
								/>

								<span className="text-sm text-gray-700">Remember Me</span>
							</label>

							<Link
								href="/auth/forgot-password"
								className="text-gray-700 underline"
							>
								Forgot Password?
							</Link>
						</div>

						<div className="col-span-6 sm:flex sm:items-center sm:gap-4">
							<button
								className={`btn btn-primary px-16 ${
									(isSubmitting || loading) && `btn-disabled`
								}`}
								disabled={isSubmitting || loading}
								type="submit"
							>
								Login
							</button>

							<p className="mt-4 text-sm text-gray-500 sm:mt-0">
								Dont have an account?{" "}
								<Link href="/auth/register" className="text-gray-700 underline">
									Sign Up
								</Link>
								.
							</p>
						</div>
					</Form>
					<button
						className="w-full mt-2 inline-flex items-center justify-center roundedLg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
						type="button"
						onClick={() => signInWithGoogle()}
					>
						{loading ? (
							<LoadingSpinner />
						) : (
							<FcGoogle className="mr-1.5 h-4 w-4 text-md" />
						)}
						<span className="text-sm font-medium"> Login with Google </span>
					</button>
				</>
			)}
		</Formik>
	);
};

export default LoginForm;
