
describe("Viktor test aggregates", function () {
it("window+histogram", function () {
	this.timeout(10000); 

	// import the qm module
	var qm = require('qminer');
 
	var store = undefined

	// create a base with a simple store
	// the store records results of throwing a dice
	// Since changes for each nomber are 1/6, the expacted values have uniform distribution
	// Field Observed records the actual values
	var base = new qm.Base({
		mode: "createClean",
		schema: [
		{
			name: "Dice",
			fields: [
				{ name: "Expected", type: "float" },
				{ name: "Observed", type: "float" },
				{ name: "Time", type: "datetime" }
			]
		}]
	});

	store = base.store('Dice');

	// create a new time series stream aggregator for the 'Dice' store, that takes the expected values of throwing a dice
	// and the timestamp from the 'Time' field. The size of the window is 1 day.
	var timeser = {
		name: 'TimeSeries1',
		type: 'timeSeriesWinBuf',
		store: 'Dice',
		timestamp: 'Time',
		value: 'Expected',
		winsize: 2 * 60 * 60 * 1000 // 2 hours
	};

	var timeSeries1 = base.store("Dice").addStreamAggr(timeser);

	// // create a new time series stream aggregator for the 'Dice' store, that takes the actual values of throwing a dice
	// // and the timestamp from the 'Time' field. The size of the window is 1 day.
	// timeser = {
		// name: 'TimeSeries2',
		// type: 'timeSeriesWinBuf',
		// store: 'Dice',
		// timestamp: 'Time',
		// value: 'Observed',
		// winsize: 86400000 // one day in miliseconds
	// };

	// var timeSeries2 = base.store("Dice").addStreamAggr(timeser);

	// add a histogram aggregator, that is connected with the 'TimeSeries1' aggregator
	var aggrJson = {
		name: 'Histogram1',
		type: 'onlineHistogram',
		store: 'Dice',
		inAggr: 'TimeSeries1',
		lowerBound: 0,
		upperBound: 6,
		bins: 6,
		addNegInf: false,
		addPosInf: false
	};

	var hist1 = base.store("Dice").addStreamAggr(aggrJson);

	// // add a histogram aggregator, that is connected with the 'TimeSeries2' aggregator
	// var aggrJson = {
		// name: 'Histogram2',
		// type: 'onlineHistogram',
		// store: 'Dice',
		// inAggr: 'TimeSeries2',
		// lowerBound: 1,
		// upperBound: 6,
		// bins: 6,
		// addNegInf: false,
		// addPosInf: false
	// };

	// var hist2 = base.store("Dice").addStreamAggr(aggrJson);

	// // add ChiSquare aggregator that connects with Histogram1 with expected values and Histogram2 with actual values
	// aggr = {
		// name: 'ChiAggr',
		// type: 'chiSquare',
		// storeX: 'Dice',
		// storeY: 'Dice',
		// inAggrX: 'Histogram1',
		// inAggrY: 'Histogram2',
		// degreesOfFreedom: 2
	// };

	// var chi = store.addStreamAggr(aggr);

	// add some values
	// simulating throwing a dice
	store.push({ Time: '2015-06-10T14:13:30.0', Expected: 0, Observed: 1 });
	store.push({ Time: '2015-06-10T14:13:31.0', Expected: 0, Observed: 2 });
	store.push({ Time: '2015-06-10T14:13:32.0', Expected: 1, Observed: 3 });
	store.push({ Time: '2015-06-10T14:13:33.0', Expected: 1, Observed: 4 });
	store.push({ Time: '2015-06-10T14:13:34.0', Expected: 2, Observed: 5 });
	store.push({ Time: '2015-06-10T14:13:35.0', Expected: 3, Observed: 5 });

	var tmp1 = hist1.saveJson();
	console.log(JSON.stringify(tmp1));
	
	store.push({ Time: '2015-06-10T14:13:41.0', Expected: 3, Observed: 5 });
	store.push({ Time: '2015-06-10T14:13:41.0', Expected: 3, Observed: 5 });
	store.push({ Time: '2015-06-10T14:13:42.0', Expected: 4, Observed: 5 });
	store.push({ Time: '2015-06-10T14:13:43.0', Expected: 4, Observed: 5 });
	store.push({ Time: '2015-06-10T14:13:44.0', Expected: 5, Observed: 6 });
	store.push({ Time: '2015-06-10T14:13:45.0', Expected: 1, Observed: 6 });

	var tmp2 = hist1.saveJson();
	console.log(JSON.stringify(tmp2));

	store.push({ Time: '2015-06-10T17:13:50.0', Expected: 1, Observed: 6 });
	store.push({ Time: '2015-06-10T17:13:51.0', Expected: 2, Observed: 6 });
	store.push({ Time: '2015-06-10T17:13:52.0', Expected: 3, Observed: 6 });
	store.push({ Time: '2015-06-10T17:13:53.0', Expected: 4, Observed: 6 });
	store.push({ Time: '2015-06-10T17:13:54.0', Expected: 5, Observed: 6 });
	store.push({ Time: '2015-06-10T17:13:55.0', Expected: 6, Observed: 6 });

	var tmp3 = hist1.saveJson();
	console.log(JSON.stringify(tmp3));

	// show distribution for expected values
	console.log(hist1);

	// // show distribution for observed values
	// console.log(hist2);

	// // show the P-value. A small P value is evidence that the data are not sampled from the distribution you expected.
	// // If P-value is smaller than some expected value (e.g. 0.005), then the null null hypothesis fails.
	// console.log("P = " + chi.getFloat());

	// // print out the aggregator
	// console.log(chi);

	base.close();
});
});