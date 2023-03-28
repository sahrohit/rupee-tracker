import { auth } from "@/firebase";
import Link from "next/link";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import LoadingSpinner from "../shared/LoadingSpinner";

const LoginSection = () => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	return (
		<div className="mt-4 flex flex-col gap-4 sm:mt-0 md:flex-row sm:items-center">
			<button
				className="btn btn-wide btn-primary rounded-none"
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

			<Link href="auth/login" passHref>
				<button className="btn bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring btn-wide">
					Continue with Email
				</button>
			</Link>
		</div>
	);
};

export default LoginSection;
