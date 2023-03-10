export const DENOMINATIONS = [
	{ value: 1, label: "1", color: "#818cf8", tailwind_color: "text-indigo-400" },
	{ value: 2, label: "2", color: "#9cacb3", tailwind_color: "bg-slate-400" },
	{ value: 5, label: "5", color: "#d56d78", tailwind_color: "bg-red-300" },
	{ value: 10, label: "10", color: "#ccb8b3", tailwind_color: "bg-stone-300" },
	{ value: 20, label: "20", color: "#ba5639", tailwind_color: "bg-orange-300" },
	{ value: 50, label: "50", color: "#5386b1", tailwind_color: "bg-sky-300" },
	{
		value: 100,
		label: "100",
		color: "#c5d7bd",
		tailwind_color: "bg-green-300",
	},
	{
		value: 500,
		label: "500",
		color: "#efe1d4",
		tailwind_color: "bg-stone-400",
	},
	{
		value: 1000,
		label: "1000",
		color: "#e8f6f7",
		tailwind_color: "bg-gray-100",
	},
];

export const colorFromDenomination = (denomination: number) => {
	return DENOMINATIONS.find((d) => d.value === denomination)?.tailwind_color;
};
