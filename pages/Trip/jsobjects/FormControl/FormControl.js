export default {
	defautlForm: {
		"id": null,
		"tripId": null,
		"stop":"",
		"stayIncluded":false,
		"stayName":"",
		"stayURL":"",
		"stayReceiptURL":"",
		"startDate":"",
		"endDate":""
	},
	stopform: {
		"id": null,
		"tripId": null,
		"stop":"",
		"stayIncluded":false,
		"stayName":"",
		"stayURL":"",
		"stayReceiptURL":"",
		"startDate":"",
		"endDate":""
	},
	setForm (data) {
		console.log(data);
		this.stopform = data;
	},
	resetForm () {
		this.stopform = this.defautlForm;
	},
	removeTripStatus (data) {
		delete data.tripStatus;
		return data;
	}
}