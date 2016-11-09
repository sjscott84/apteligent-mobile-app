
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
      callback(json.data);
    })
    .catch((err) => {
      callback("Error");
      console.log(err);
    })
}

//Get some very basic crash information regarding specific ids
getCrashSummariesApi = function(id, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/liveStats/'+id+'/P1D', {
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
      callback(json);
    })
    .catch((err) => {
      callback("Error");
      console.log(err)
    })
}

//Get info from the livestats api
getLiveStateData = function(id, time, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/liveStats/'+id+'/'+time, {
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
      callback(json);
    })
    .catch((err) => {
      callback("Error");
      console.log(err)
    })
}

/*getCrashRateGraphInfo = function(id, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/errorMonitoring/graph?appId='+id+'&graph=crashPercent&duration=41760', {
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
      callback(json);
    })
}*/

//Get a list of all crash groups for a specic app
getCrashInfoGeneral = function(id, time, version, sort, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/crash/paginatedtable/'+id+'?appVersion='+version+'&period='+time+'&sortBy='+sort+'&sortOrder=descending', {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        //callback("Error");
        console.log('error');
      }
    })
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      callback("Error");
      console.log(err);
    })
}

//Get more details regarding a specific crash
getCrashInfoDetail = function(id, hash, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/crash/'+id+'/'+hash+'?diagnostics=false&get_other_crashes=false', {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        console.log('error');
      }
    })
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      callback("Error");
      console.log(err);
    })
}

//Get Monthly Active Users from api
getMAUFromApi = function(id, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/trends/mau/'+id, {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        console.log('error');
      }
    })
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      console.log(err);
      callback("Error");
    })
}

//Get daily active users from api
getDAUFromApi = function(id, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/trends/dau/'+id, {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        console.log('error');
      }
    })
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      callback("Error");
      console.log(err);
    })
}

//Get all app versions from api
getAppVersions = function(callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/apps?attributes=appVersions', {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        console.log('error');
      }
    })
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      console.log(err);
    })
}

//Get user details from the api
getUserDetailsApi = function(id, hash, callback){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/crash/userData/'+id+'/'+hash, {
    method: 'GET',
    headers: myHeaders
  })
  fetch(request)
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        console.log('error');
      }
    })
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      callback("Error");
      console.log(err);
    })
}
