import { User } from "firebase/auth";
import Link from "next/link";

interface ProfileSectionProps {
	user: User;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
	return (
		<div className="flex flex-row gap-4 items-center mt-4 sm:mt-0">
			<Link
				href="/profile"
				className="flex flex-col gap-4 sm:flex-row sm:items-center"
			>
				<div className="flex flex-row items-center gap-x-4">
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
			</Link>
			<Link href="/entry">
				<button className="btn btn-primary" type="button">
					New Note
				</button>
			</Link>
		</div>
	);
};

export default ProfileSection;
