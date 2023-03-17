import Navbar from "@/components/Navbar";
import ProfileSection from "@/components/Profile";
import Footer from "@/components/shared/Footer";
import { auth } from "@/firebase";
import { withProtected } from "@/utils/routes";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfilePage = () => {
	const [user, loading, error] = useAuthState(auth);

	return (
		<>
			<Navbar />
			<ProfileSection user={user} loading={loading} error={error} />
			<Footer />
		</>
	);
};

export default withProtected(ProfilePage);
