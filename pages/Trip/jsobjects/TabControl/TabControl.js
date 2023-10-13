export default {
	currentTab: '0',
	changeTab (value) {
		this.currentTab = value.toString();
			SelectTripStops.run()
			GetTripStops.run();
	},
	async addTripMate() {
		const tripMate = TripMateSelect.selectedOptionValue;
		const user = getUsers.data.data.rows.find(v => v.id == tripMate);
		const tripMateObj = {
			name: user.firstName,
			dob: user.dob,
			phoneNumber: user.phoneNumber,
			bucketUrl: user.profilePic,
			instagramHandle: user.instagramHandle
		};
		await UpdateDefaultTripMate.run(tripMateObj);
		GetTrip.run();
		}
}