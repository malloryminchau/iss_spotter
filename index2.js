// const { fetchMyIp } = require('./iss_promised.js');
// const { fetchCoordsByIp } = require('./iss_promised');
// const { fetchISSFlyOverTimes } = require('./iss_promised');

// fetchMyIp() 
//   .then(fetchCoordsByIp)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation();