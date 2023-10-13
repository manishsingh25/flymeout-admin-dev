export default {
	editable: false,
	currentTab: 'Onboarding',
	enableEdit () {
		this.editable = true;
	},
		disabledEdit() {
		this.editable = false;
	},
	changeTab(value) {
		this.currentTab = value;
	},
	async uploadPortFolioImages () {
		const s3Data = await UploadPortFolioImageS3.run();
		const mapped = s3Data.signedUrls.map(val => {
			return {
				userId: getUser.data.data.id,
				bucketUrl: val.split('?')[0]
			}
		});
		await CreatePortfolioImages.run({
			userPortfolioImages: mapped
		});
		await getUser.run();
	},
	async updatePortFolioImages(id, image) {
		const s3Data = await UpdatePortFolioImageS3.run(image);
		const data =  {
			id,
			bucketUrl: s3Data.signedUrl.split('?')[0]
		};
		await UpdatePortFolioImages.run(data);
		await getUser.run();
	},
	getVibesForm(data) {
		const form = {};
		data.forEach((val) => form[val.question] = val.question);
		return form;
	},
	async updateProfilePicture() {
		const s3Data = await UploadProfileImage.run();
		console.log(s3Data, 's3Data');
		const data = {
			profilePic:  s3Data.signedUrls[0].split('?')[0]
		}
		await UpdateProfilePictureAPI.run(data);
		await getUser.run();
	},
	async getImage(image) {
		const data = await GetProfileImage.run(image);
		return data.signedUrl;
	},
	getKeyForUserTrips(type){
		switch(type){
			case 'Trip Hosted':
				return 'hosted';
			case 'Trips Applied':
				return 'applied';
			case 'Trips completed':
				return 'completed';
			case 'Trips cancelled':
				return 'cancelled';
			default:
				return 'hosted'
		}
	},
	getColorforStatus(type){
		switch(type){
			case 'DRAFT':
				return '#D8D9DA';
			case 'PENDING':
				return '#61677A';
			case 'IN_REVIEW':
				return '#FFF6E0';
			case 'COMPLETED':
			case 'APPROVED':
				return '#D5FFD0';
			case 'REJECTED':
			case 'CANCELLED':
			case 'BLOCKED':
				return '#EB6440';
			default:
				return '#D8D9DA'
		}
	},
	getData() {
		console.log('hdjkashdjksah', UserTripsTabs.selectedTab)
		if(UserTripsTabs.selectedTab === "Trip Hosted"){
			getTrips.run();
		} else if(UserTripsTabs.selectedTab === 'Trips Applied'){
			getTripsApplied.run();
		}
	},
	formatImages(data) {
		return data.map(val => {
			val.imageUrl = val?.imageUrl?.toString()?.split(',');
			return val;
		})
	},
}