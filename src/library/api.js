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
getAppsList = function(){
  const myHeaders = new Headers({
    "Authorization": 'Bearer '+ACCESS_ID
  });
  var request = new Request('https://developers.crittercism.com:443/v2/apps?attributes=appName%2CappType%2CcrashPercent%2CiconURL', {
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
      //return res.json();
    })
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err);
    })
    //.then((json) => {
      //console.log(json);
    //})
}
