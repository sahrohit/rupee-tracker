import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginSection from "./LoginSection";
import ProfileSection from "./ProfileSection";
import Link from "next/link";

const Navbar = () => {
	const [user, loading, error] = useAuthState(auth);

	if (loading) return <div>Loading...</div>;

	if (error)
		return (
			<div
				role="alert"
				className="rounded border-l-4 border-red-500 bg-red-50 p-4"
			>
				<strong className="block font-medium text-red-800">
					Something went wrong
				</strong>
			</div>
		);

	return (
		<header aria-label="Page Header">
			<div className="mx-auto max-w-screen-xl px-4 py-6 sm:py-6 sm:px-12 lg:px-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link href="/" className="text-center sm:textLeft">
						<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
							Rupee Tracker
						</h1>

						<p className="mt-1.5 text-sm text-gray-500">
							Follow your Rupee in their tracks! 💵
						</p>
					</Link>

					{user ? <ProfileSection user={user} /> : <LoginSection />}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
