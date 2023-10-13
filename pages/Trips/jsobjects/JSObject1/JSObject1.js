export default {
	myVar1: [],
	myVar2: {},
	myFun1 () {
		//	write code here
		//	this.myVar1 = [1,2,3]
	},
	async myFun2 () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	},
	formatTripsData(data = TripList.data.records) {
		const filter = data.map(val => {
			const data = {
				id: val.id,
				user: UsersList.data.records.find(user => val.User.indexOf(user.id) > -1),
				"Trip Destination": val["Trip Destination"],
				"Trip start date": val["Trip start date"],
				"Trip end date": val["Trip start date"],
				// "Gender RL": val["Gender RL"],
				// "Flight Booking Status": val["Flight Booking Status"],
				Status: val["Status"],
				"Trip Duration": val["Trip Duration"],
				"Number of People": val["Number of People"]
			};
			return data;
		});
		return filter;
	},
	downloadUsers() {
		const data = AllTrips.data;
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
		download(url, `trips_{moment().format("DD_MM_YY")}`, "text/csv");
	},
	notifyUser(id, startDate, endDate) {
		const tripStartDate = moment(startDate);
		const tripEndDate = moment(endDate);

		// Get the current date
		const currentDate = moment();

		// Calculate the difference in days
		const daysUntilTripStart = tripStartDate.diff(currentDate, 'days');
		const daysUntilTripEnd = tripEndDate.diff(currentDate, 'days');

		// Define notification conditions
		// Define notification conditions
		if (daysUntilTripStart > 7) {
			NotficationTrip.run({ id, reminderType: 'BEFORE_THE_TRIP'});
		} else if (daysUntilTripStart <= 7 && daysUntilTripStart > 2) {
			NotficationTrip.run({ id, reminderType: 'BEFORE_THE_TRIP'});
		} else if (daysUntilTripStart <= 2 && daysUntilTripEnd >= 0) {
			NotficationTrip.run({ id, reminderType: 'DURING_THE_TRIP'});
		} else if (daysUntilTripEnd < 0) {
			NotficationTrip.run({ id, reminderType: 'AFTER_THE_TRIP'});
		}
	},
	shouldNotifyBeVisible(currentRow) {
		const tripStartDate = moment(currentRow.startDate);
		const tripEndDate = moment(currentRow.endDate);

		// Get the current date
		const currentDate = moment();

		// Calculate the difference in days
		const daysUntilTripStart = tripStartDate.diff(currentDate, 'days');
		const daysUntilTripEnd = tripEndDate.diff(currentDate, 'days');

		// Define notification conditions
		// Define notification conditions
		if (daysUntilTripStart == 7) {
			return true;
		} else if (daysUntilTripStart == 2) {
			return true;
		} else if (daysUntilTripStart <= 0 && daysUntilTripEnd >= 0) {
			return true;
		} else if (daysUntilTripEnd < 0) {
			return true;
		} else {
			return false;
		}
	}
}