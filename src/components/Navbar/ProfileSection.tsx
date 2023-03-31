import { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

interface ProfileSectionProps {
	user: User;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
	return (
		<div className="flex flex-row gap-4 items-center mt-4 sm:mt-0 justify-between sm:justify-end">
			<Link
				href="/profile"
				className="flex flex-col gap-4 sm:flex-row sm:items-center tooltip tooltip-bottom hover:tooltip-open"
				data-tip="Dashboard"
			>
				<div className="flex flex-row items-center gap-x-4 ">
					<div className="avatar">
						<div className="w-12 rounded-full">
							<Image
								src={user.photoURL || "https://picsum.photos/200/300"}
								alt="profile"
								width={48}
								height={48}
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
