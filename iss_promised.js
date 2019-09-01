const request = require('request-promise-native');

const urlIP = 'https://api.ipify.org?format=json';

const fetchMyIp = function() {
  return request(urlIP);
}
// module.exports = { fetchMyIp };

const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip
  return request(`https://ipvigilante.com/json/${ip}`);
}

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = function() {
  fetchMyIp() 
  .then(fetchCoordsByIp)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));
}
// module.exports = { fetchMyIp, fetchCoordsByIp, fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };