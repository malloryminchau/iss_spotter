// index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('66.207.199.230', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned Coords:", coords);
// })

// const coords = { latitude: '43.63830', longitude: '-79.43010' };
// fetchISSFlyOverTimes({ latitude: '43.63830', longitude: '-79.43010' }, (error, times) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned Time:", times);
// })




// nextIssTimesForMyLocation((error, times) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }

//   console.log(times);
// });

// const printPassTimes = function(times) {
//   for (const pass of times) {
//     const datetime = new Date(0);
//     datetime.setUTCSeconds(pass.risetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//   }
// };

//my try 

const { nextIssTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for(const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
};
nextIssTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});