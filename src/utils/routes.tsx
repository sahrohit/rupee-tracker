import { auth } from "@/firebase";
import FullPageLoadingSpinner from "@/shared/FullPageLoadingSpinner";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export const withProtected = (Component: any) => {
	return function WithProtected(props: NextPageContext) {
		const [user, loading, error] = useAuthState(auth);

		const router = useRouter();

		if (loading) {
			return <FullPageLoadingSpinner />;
		}

		if (!user) {
			router
				.replace(
					{
						pathname: "/auth/login",
						query: {
							redirect: router.pathname,
						},
					},
					undefined,
					{
						shallow: true,
					}
				)
				.then(() => {});
			return <FullPageLoadingSpinner />;
		}

		return <Component {...props} />;
	};
};

export const withAuthPages = (Component: any) => {
	return function WithAuthPages(props: NextPageContext) {
		const [user, loading, error] = useAuthState(auth);

		const router = useRouter();
		const { redirect } = router.query;

		if (loading) {
			return <FullPageLoadingSpinner />;
		}

		if (user) {
			if (redirect) {
				router.push(redirect as string);
			} else {
				router.push("/");
			}
			return <FullPageLoadingSpinner />;
		}

		return <Component {...props} />;
	};
};
