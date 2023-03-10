export const NUMBERS = [
	{ de_value: "१", de_words: "एक", name: "One", value: 1 },
	{ de_value: "२", de_words: "दुई", name: "Two", value: 2 },
	{ de_value: "३", de_words: "तीन", name: "Three", value: 3 },
	{ de_value: "४", de_words: "चार", name: "Four", value: 4 },
	{ de_value: "५", de_words: "पाँच", name: "Five", value: 5 },
	{ de_value: "६", de_words: "छ", name: "Six", value: 6 },
	{ de_value: "७", de_words: "सात", name: "Seven", value: 7 },
	{ de_value: "८", de_words: "आठ", name: "Eight", value: 8 },
	{ de_value: "९", de_words: "नौ", name: "Nine", value: 9 },
	{ de_value: "०", de_words: "शून्य", name: "Zero", value: 0 },
];

export const numberToNepali = (number: string, padding: number) => {
	return (Array(padding).fill("0").join("") + parseInt(number || "0"))
		.slice(-padding)
		.toString()
		.split("")
		.map(
			(char) =>
				NUMBERS.find((number) => number.value.toString() === char)?.de_value
		);
};
