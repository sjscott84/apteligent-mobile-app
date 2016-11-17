
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
      ACCESS_ID = json.access_token;
      callback(json.access_token);
    })
}

//Save the access token as variable
provideAccessToken = function(token, callback){
  ACCESS_ID = token;
  callback();
};

//Handle the api calls
apiCall = function(url, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request(url, {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
      //console.log(json.data);
      callback(null, json.data);
    })
    .catch((err) => {
      callback(err);
    })
}

//Get a list of available apps
getAppsList = function(callback){
  apiCall('https://developers.crittercism.com:443/v2/apps?attributes=appName%2CappType%2CappVersions%2CiconURL', callback);
}

//Get some very basic crash information regarding specific ids
getCrashSummariesApi = function(id, callback){
  apiCall('https://developers.crittercism.com:443/v2/liveStats/'+id+'/P1D', callback);
}

//Get info from the livestats api
getLiveStateData = function(id, time, callback){
  apiCall('https://developers.crittercism.com:443/v2/liveStats/'+id+'/'+time, callback);
}

//Get a list of all crash groups for a specic app
getCrashInfoGeneral = function(id, time, version, sort, callback){
  apiCall('https://developers.crittercism.com:443/v2/crash/paginatedtable/'+id+'?appVersion='+version+'&period='+time+'&sortBy='+sort+'&sortOrder=descending', callback);
}

//Get more details regarding a specific crash
getCrashInfoDetail = function(id, hash, callback){
  apiCall('https://developers.crittercism.com:443/v2/crash/'+id+'/'+hash+'?diagnostics=false&get_other_crashes=false', callback);
}

//Get Monthly Active Users from api
getMAUFromApi = function(id, callback){
  apiCall('https://developers.crittercism.com:443/v2/trends/mau/'+id, callback);
}

//Get daily active users from api
getDAUFromApi = function(id, callback){
  apiCall('https://developers.crittercism.com:443/v2/trends/dau/'+id, callback);
}

//Get all app versions from api
getAppVersions = function(callback){
  apiCall('https://developers.crittercism.com:443/v2/apps?attributes=appVersions', callback);
}

//Get user details from the api
getUserDetailsApi = function(id, hash, callback){
  apiCall('https://developers.crittercism.com:443/v2/crash/userData/'+id+'/'+hash, callback);
}
