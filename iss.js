/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const urlIP = 'https://api.ipify.org?format=json';

const fetchMyIP = function(callback) {
  request(urlIP, function(error, response, body) {
    if(error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);
    // if (error) {
    //   callback(error, null);
    // } else {
    //   callback(null, ip);
    // }
  });
}

const fetchCoordsByIP = function (ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode != 200) {
      callback(Error(`Status Code ${response.statusCode} when fetchint Coordinates for IP: ${body}`), null);
      return; 
    }

    const { latitude, longitude } = JSON.parse(body).data;
    // const coords = { latitude, longitude };
    callback(null, { latitude, longitude });
  });
}



const fetchISSFlyOverTimes = function (coords, callback) {

  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  })
};




 const request = require('request');


const nextIssTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if(error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if(error) {
          return callback(error, null);
        }
        callback(null, passTimes);
      })
    })
  })
}

module.exports = { nextIssTimesForMyLocation };



 // const apiKey = 'at_v9JzWl7KfKlxZ7ELzzXJCoaJmbVJQ'
// const ipAddress = '66.207.199.230'




// const fetchMyIP = function(callback) {
//   // use request to fetch IP address from JSON AP
//   request(urlIP, function(error, response, body) {
    
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }

//     const data = JSON.parse(body);
//     const ip = data.ip;
//     if (error) {
//       callback(error, null);
//     } else {
//       callback(null, ip);
//     }

//   });
// };


// const fetchCoordsByIP = function (ip, callback) {
//   request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     if (response.statusCode != 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetchint Coordinates for IP: ${body}`), null);
//       return; 
//     }

//     const { latitude, longitude } = JSON.parse(body).data;
//     callback(null, { latitude, longitude });
//   });
  
// };

// const coords = { latitude: '43.63830', longitude: '-79.43010' };

// // module.exports = { fetchMyIP };
// // module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };