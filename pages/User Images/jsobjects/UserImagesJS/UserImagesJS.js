export default {
	currentIndex: 0,
	formatImages() {
		return Select_UserPortfolioImages1.data.map(val => {
			if(val.bucketUrls && val.bucketUrls !== undefined) 
				val.bucketUrls = val.bucketUrls?.split(",");
			return val;
		});
	},
	updateNewImage() {
		const data = 
	}
}