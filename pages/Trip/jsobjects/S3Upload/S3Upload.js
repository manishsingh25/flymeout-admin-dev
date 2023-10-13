export default {
	tripImages: [],

	async uploadTripImages() {
		const images = await UploadMultipleImages.run();
		this.tripImages = images.signedUrls.map(val => {
			return {bucketUrl: val.split('?')[0]}
		});
		await UploadTripImages.run();
		GetTrip.run();
		
	}
}