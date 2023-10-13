export default {
	downloadUsers() {
		const data = AllUsers.data;
		const csv = Papa.unparse(data, {
			quotes: false, //or array of booleans
			quoteChar: '"',
			escapeChar: '"',
			delimiter: ",",
			header: true,
			newline: "\r\n",
			skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
			columns: null //or array of strings
		});
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		download(url, `users_${moment().format("DD_MM_YY")}`, "text/csv");
	}
}