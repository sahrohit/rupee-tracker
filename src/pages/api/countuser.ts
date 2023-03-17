// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { initializeApp, cert, getApps } = require("firebase-admin/app");

const { getFirestore, Timestamp } = require("firebase-admin/firestore");

if (!getApps().length) {
	initializeApp({
		credential: cert({
			type: process.env.FIREBASE_ADMIN_TYPE,
			project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
			private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
			private_key: JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY)
				.private_key,
			client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
			client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
			auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
			token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
			auth_provider_x509_cert_url:
				process.env.FIREBASE_ADMIN_AUTH_PROVIDER_x509_CERT_URL,
			client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_x509_CERT_URL,
		}),
	});
}

const db = getFirestore();

type Data = {
	dbRes: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const data: any = [];
	const querySnapshot = await db.collectionGroup("users").get();
	querySnapshot.forEach((doc: any) => {
		data.push(doc.data());
	});

	console.log(data);

	//Count the number of users from the data array who has the same username

	const count = data.reduce((acc: any, obj: any) => {
		const key = obj.user;
		if (!acc[key]) {
			acc[key] = 0;
		}
		acc[key]++;
		return acc;
	}, {});

	let dbRes;

	for (const [key, value] of Object.entries(count)) {
		dbRes = await db
			.collection("leaderboard")
			.doc(key)
			.set(
				{
					total: data
						.filter((item: any) => item.user === key)
						.map((item: any) => item.denomination_value)
						.reduce((a: any, b: any) => a + b, 0),
					note_entries: value,
					last_updated: Timestamp.now(),
				},
				{ merge: true }
			);
	}

	res.status(200).json({ ...dbRes });
}
