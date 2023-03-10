export const prefixObject = (
	prefix: any,
	object: Record<string, string | number>
) => {
	return Object.keys(object).reduce(
		(a, c) => ((a[`${prefix}${c}`] = (object as any)[c]), a),
		{} as any
	);
};
