//'use strict'

let ACCESS_ID = null;

//Get access token
getAccessToken = function(password, username, clientId, grantType, callback){
  //Content-Type and Authorization must be passed through as headers
  const myHeaders = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": 'Basic '+clientId
  });

  var request = new Request('https://developers.crittercism.com/v2/token', {
        method: 'POST',
        credentials: "same-origin",
        mode: 'cors',
        headers: myHeaders,
        body: 'grant_type='+grantType+'&username='+username+'&password='+password
      })

  fetch(request)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json.access_token);
      ACCESS_ID = json.access_token;
      callback();
    })
}

//Get a list of available apps
getAppsList = function(callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/apps?attributes=appName%2CappType%2CappVersions%2CiconURL', {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
      if(res.ok){
        return res.json();
      }else{
        console.log('Error')
      }
    })
    .then((json) => {
      console.log(json.data);
      callback(json.data);
    })
    .catch((err) => {
      console.log(err);
    })
}

getCrashSummaries = function(){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/liveStats/519d53101386202089000007/P1D', {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
    .then((json) => {
      console.log(json);
    })
}