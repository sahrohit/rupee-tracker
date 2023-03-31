export const NOTE_PREFIX = [
	{ ro_name: "A", de_name: "अ", value: "A - अ" },
	{ ro_name: "AA", de_name: "आ", value: "AA - आ" },
	{ ro_name: "E", de_name: "इ", value: "E - इ" },
	{ ro_name: "EE", de_name: "ई", value: "EE - ई" },
	{ ro_name: "O", de_name: "उ", value: "O - उ" },
	{ ro_name: "OO", de_name: "ऊ", value: "OO - ऊ" },
	{ ro_name: "AI", de_name: "ए", value: "AI - ए" },
	{ ro_name: "AII", de_name: "ऐ", value: "AII - ऐ" },
	{ ro_name: "OH", de_name: "ओ", value: "OH - ओ" },
	{ ro_name: "AU", de_name: "औ", value: "AU - औ" },
	{ ro_name: "AM", de_name: "अं", value: "AU - अं" },
	{ ro_name: "AH", de_name: "अः", value: "AU - अः" },
	{ ro_name: "KA", de_name: "क", value: "KA - क" },
	{ ro_name: "KHA", de_name: "ख", value: "KHA - ख" },
	{ ro_name: "GA", de_name: "ग", value: "GA - ग" },
	{ ro_name: "GHA", de_name: "घ", value: "GHA - घ" },
	{ ro_name: "NGA", de_name: "ङ", value: "NGA - ङ" },
	{ ro_name: "CHA", de_name: "च", value: "CHA - च" },
	{ ro_name: "CHHA", de_name: "छ", value: "CHHA - छ" },
	{ ro_name: "JA", de_name: "ज", value: "JA - ज" },
	{ ro_name: "JHA", de_name: "झ", value: "JHA - झ" },
	{ ro_name: "YNA", de_name: "ञ", value: "YNA - ञ" },
	{ ro_name: "TAA", de_name: "ट", value: "TA - ट" },
	{ ro_name: "THAA", de_name: "ठ", value: "THA - ठ" },
	{ ro_name: "DAA", de_name: "ड", value: "DA - ड" },
	{ ro_name: "DHAA", de_name: "ढ", value: "DHA - ढ" },
	{ ro_name: "NAA", de_name: "ण", value: "DHA - ण" },
	{ ro_name: "TA", de_name: "त", value: "TA - त" },
	{ ro_name: "THA", de_name: "थ", value: "THA - थ" },
	{ ro_name: "DA", de_name: "द", value: "DA - द" },
	{ ro_name: "DHA", de_name: "ध", value: "DHA - ध" },
	{ ro_name: "NA", de_name: "न", value: "NA - न" },
	{ ro_name: "PA", de_name: "प", value: "PA - प" },
	{ ro_name: "FA", de_name: "फ", value: "FA - फ" },
	{ ro_name: "BA", de_name: "ब", value: "BA - ब" },
	{ ro_name: "BHA", de_name: "भ", value: "BHA - भ" },
	{ ro_name: "MA", de_name: "म", value: "MA - म" },
	{ ro_name: "YA", de_name: "य", value: "YA - य" },
	{ ro_name: "RA", de_name: "र", value: "RA - र" },
	{ ro_name: "LA", de_name: "ल", value: "LA - ल" },
	{ ro_name: "WA", de_name: "व", value: "WA - व" },
	{ ro_name: "SA", de_name: "श", value: "SA - श" },
	{ ro_name: "SAA", de_name: "ष", value: "SAA - ष" },
	{ ro_name: "SAAA", de_name: "स", value: "SAAA - स" },
	{ ro_name: "HA", de_name: "ह", value: "HA - ह" },
	{ ro_name: "XYA", de_name: "क्ष", value: "XYA - क्ष" },
	{ ro_name: "TRA", de_name: "त्र", value: "TRA - त्र" },
	{ ro_name: "GYA", de_name: "ज्ञ", value: "GYA - ज्ञ" },
];

export const get_de_name = (ro_name: string) => {
	const prefix = NOTE_PREFIX.find((item) => item.ro_name === ro_name);
	return prefix?.de_name;
};

export const get_ro_name = (de_name: string) => {
	const prefix = NOTE_PREFIX.find((item) => item.de_name === de_name);
	return prefix?.ro_name;
};

export const get_prefix = (value: string) => {
	const prefix = NOTE_PREFIX.find((item) => item.value === value);
	return { ro_name: prefix?.ro_name, de_name: prefix?.de_name };
};

export const convert_to_de = (value: string) => {
	const [prefix_test, prefix_number, serial_number] = value.split("-");
	const de_prefix = get_de_name(prefix_test);
	return de_prefix + "-" + prefix_number + "-" + serial_number;
};
