import { User } from "firebase/auth";
import Link from "next/link";

interface ProfileSectionProps {
	user: User;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
	return (
		<Link
			href="/profile"
			className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center"
		>
			<div className="flex flex-row items-center gap-4">
				<div className="flex flex-row items-center gap-4">
					<div className="avatar">
						<div className="w-12 rounded-full">
							<img
								src={user.photoURL || "https://picsum.photos/200/300"}
								alt="profile"
							/>
						</div>
					</div>
					<p className="text-lg">{user?.displayName}</p>
				</div>
			</div>
			<Link href="/entry">
				<button
					className="block roundedLg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
					type="button"
				>
					New Note
				</button>
			</Link>
		</Link>
	);
};

export default ProfileSection;
