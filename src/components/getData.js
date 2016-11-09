
var api = require('../library/api.js');
let crashInfo;

//Get a list of all apps from the api
getAvaliableApps = function(callback){
  getAppsList((data) => {
    if(data === "Error"){
      callback(data);
    }else{
      console.log(data);
      const appData = [];
      Object.keys(data).forEach(function(id){
        var obj = {};
        obj['id'] = id;
        obj['name'] = data[id]['appName'];
        obj['type'] = data[id]['appType'];
        appData.push(obj);
      })
      callback(appData);
    }
  })
}

//Get crash rate and crash count for the last 24 hours from api
getCrashSummaries = function(id, callback){
  let crashSummary = {}
  getCrashSummariesApi(id, (summary) => {
    if(summary === "Error"){
      callback(summary);
    }else{
      crashSummary['crashPercent'] = summary['data']['crashPercentage'];
      //obj['appLoads'] = summary.data.periodicData[0]['appLoads'];
      crashSummary['crashCount'] = summary['data']['periodicData'][0]['crashes'];
      callback(crashSummary);
    }
  })
}

//Get data for crash count bar chart from api
crashCountGraph = function(id, time, callback){
  let crash = {};
  getLiveStateData(id, time, (data) => {
    if(data === "Error"){
      callback(data);
    }else{
      crash['start'] = data['data']['periodicData'][0]['start'];
      crash['end'] = data['data']['periodicData'][data['data']['periodicData'].length-1]['end']
      crash['appLoadTotal'] = 0;
      crash['crashCountTotal'] = 0;
      crash['crashRateArray'] = [];
      crash['appLoadsArray'] = [];
      for(var i = 0; i < data['data']['periodicData'].length; i++){
        crash['crashRateArray'].push(data['data']['periodicData'][i]['crashes']);
        crash['crashCountTotal'] = crash['crashCountTotal'] + data['data']['periodicData'][i]['crashes'];
        crash['appLoadsArray'].push(data['data']['periodicData'][i]['appLoads']);
        crash['appLoadTotal'] = crash['appLoadTotal'] + data['data']['periodicData'][i]['appLoads']
      }
      //callback(crashRateArray, appLoadsArray, start, end, appLoadTotal, crashCountTotal);
      callback(crash);
    }
  })
}

//Get a list of all versions of an app from api
appVersions = function(id, callback){
  getAppVersions((data) => {
    console.log(data['data']);
    Object.keys(data['data']).forEach(function(key){
      if(key === id){
        callback(data['data'][key]['appVersions']);
      }
    })
  })
}

//Currently this is not in use
crashRateGraph = function(id, callback){
  const crashRate = {};
  getCrashRateGraphInfo(id, (data) => {
    crashRate['start'] = data['data']['start'];
    crashRate['end'] = data['data']['end'];
    crashRate['graph'] = data['data']['series'][0]['points'];
    callback(crashRate);
  })
}

//Gets a list of all crash groups for a specific app
combineCrashData = function(id, time, version, sort, callback){
  const crashSummaryData = [];
  getCrashInfoGeneral(id, time, version, sort, (data) => {
    if(data === "Error"){
      callback(data);
    }else{
      let crashArray = data['data']['errors'];
      //console.log(crashArray);
      for(var i = 0; i < crashArray.length; i++){
        let obj = {};
        obj['crashName'] = crashArray[i]['name'];
        obj['crashReason'] = crashArray[i]['reason'];
        obj['hash'] = crashArray[i]['hash'];
        obj['totalOccurances'] = crashArray[i]['total_occurrences'];
        obj['firstOccured'] = crashArray[i]['first_occurred_time'];
        obj['lastOccured'] = crashArray[i]['last_occurred_time'];
        obj['affectedUsers'] = crashArray[i]['num_unique_sessions'];
        obj['status'] = crashArray[i]['status'];
        obj['dailyOccurances'] = crashArray[i]['daily_occurrences'][1];
        crashSummaryData.push(obj);
      }
      callback(crashSummaryData);
    }
  })
}
//Fetches the MAU for the last 24 hours from the api
getMAU = function(id, callback){
  getMAUFromApi(id, (data) => {
    if(data === "Error"){
      callback(data);
    }else{
    callback(data['data']['series']['todayValue']);
  }
  })
}

//Fetches the MAU for the last 24 hours from the api
getDAU = function(id, callback){
  getDAUFromApi(id, (data) => {
    if(data === "Error"){
      callback(data);
    }else{
      callback(data['data']['series']['todayValue']);
    }
  })
}

//Returns all data avaliable for a particular crash hash
getCrashInfo = function(id, hash, callback){
  getCrashInfoDetail(id, hash, (data) => {
    if(data === "Error"){
      callback("Error");
    }else{
      crashInfo = data['data'];
      callback();
    }
  })
}

//Gets the crash info (received by getCrashInfo) by version
getCrashByAppVersion = function(callback){
  let crashByVersion = [];
    const version = crashInfo['diagnostics']['discrete_diagnostic_data']['app_version'];
    let length = version.length
    for(var i = 0; i < version.length; i++){
      let obj = {};
      obj['label'] = version[i][0];
      obj['value'] = version[i][1];
      crashByVersion.push(obj);
    }
    let sortedArray = crashByVersion.sort(function(a, b){return b.value - a.value});
    callback(sortedArray);
}

//Gets the crash info (received by getCrashInfo) by operating system
getCrashByOsVersion = function(callback){
  let crashByVersion = [];
  const version = crashInfo['diagnostics']['discrete_diagnostic_data']['system_version'];
  for(var i = 0; i < version.length; i++){
    let obj = {};
    obj['label'] = version[i][0];
    obj['value'] = version[i][1];
    crashByVersion.push(obj);
  }
  let sortedArray = crashByVersion.sort(function(a, b){return b.value - a.value});
  callback(sortedArray);
}

//Gets the crash info (received by getCrashInfo) by device
getCrashByDevice = function(callback){
  let crashByVersion = [];
  const version = crashInfo['diagnostics']['discrete_diagnostic_data']['model'];
  for(var i = 0; i < version.length; i++){
    let obj = {};
    obj['label'] = version[i][0];
    obj['value'] = version[i][1];
    crashByVersion.push(obj);
  }
  let sortedArray = crashByVersion.sort(function(a, b){return b.value - a.value});
  callback(sortedArray);
};

//Gets the crash info (received by getCrashInfo) stacktrace
getStacktrace = function(id, hash, callback){
  let crashByVersion = [];
  getCrashInfoDetail(id, hash, (data) => {
    const version = data['data']['stacktrace'];
      for(var i = 0; i < version.length; i++){
      let obj = {};
      obj['lineNumber'] = version[i]['line_number'];
      obj['trace'] = version[i]['trace'];
      crashByVersion.push(obj);
    }
    callback(crashByVersion);
  })
}

//Gets the crash info (received by getCrashInfo) breadcrumbs
getBreadcrumbs = function(callback){
  let crashByVersion = [];
  const version = crashInfo['breadcrumbTraces'];
  for(var i = 0; i < version.length; i++){
    let obj = {};
    obj['username'] = version[i]['username'];
    obj['appVersion'] = version[i]['appVersion'];
    obj['dateAndTime'] = version[i]['traceTs'];
    obj['noOfBreadcrumbs'] = version[i]['parsedBreadcrumbs'].length;
    obj['breadcrumbs'] = version[i]['parsedBreadcrumbs'];
    obj['device'] = version[i]['device'];
    obj['os'] = version[i]['os'];
    crashByVersion.push(obj);
  }
  callback(crashByVersion);
}

//get available data for user
getUserDetails = function(id, hash, user, callback){
  getUserDetailsApi(id, hash, (data) => {
    if(data === "Error"){
      callback(data);
    }else{
      let obj = {};
      for(var i = 0; i < data['data'].length; i++){
        if(data['data'][i]['username'] === user){
          obj['appVersion'] = data['data'][i]['app_version'];
          obj['system'] = data['data'][i]['system'];
          obj['locale'] = data['data'][i]['locale'];
          obj['device'] = data['data'][i]['model'];
          obj['carrier'] = data['data'][i]['carrier'];
          obj['lastLogIn'] = data['data'][i]['last_login_time_iso'];
          obj['lastCrash'] = data['data'][i]['crash_last_occurred_iso'];
        }
      }
      callback(obj);
    }
  })
}

