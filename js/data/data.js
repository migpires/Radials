define('data', function(require) {

	var revenue = require('../js/data/revenue');
	var impressions = require('../js/data/impressions');
	var visits = require('../js/data/visits');

	const data =  {
			revenue,
			impressions,
			visits
	}

  return data
	
})
