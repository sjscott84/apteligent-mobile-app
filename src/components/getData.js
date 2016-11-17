
var api = require('../library/api.js');
let crashInfo;

//Get a list of all apps from the api
getAvaliableApps = function(callback){
  getAppsList((error, data) => {
    if(error){
      callback(error);
    }else{
      console.log(data);
      const appData = [];
      Object.keys(data).forEach(function(id){
        var obj = {};
        obj['id'] = id;
        obj['name'] = data[id]['appName'];
        obj['type'] = data[id]['appType'];
        obj['icon'] = data[id]['iconURL'];
        appData.push(obj);
      })
      callback(null, appData);
    }
  })
}

//Get crash rate and crash count for the last 24 hours from api
getCrashSummaries = function(id, callback){
  getCrashSummariesApi(id, (error, data) => {
    let crashSummary = {}
    if(error){
      callback(error);
    }else{
      crashSummary['crashPercent'] = data['crashPercentage'];
      crashSummary['crashCount'] = data['periodicData'][0]['crashes'];
      crashSummary['appLoads'] = data['periodicData'][0]['appLoads'];
      callback(null, crashSummary);
    }
  })
}

//Get data for crash count bar chart from api
crashCountGraph = function(id, time, callback){
  let crash = {};
  getLiveStateData(id, time, (error, data) => {
    if(error){
      callback(error);
    }else{
      crash['start'] = data['periodicData'][0]['start'];
      crash['end'] = data['periodicData'][data['periodicData'].length-1]['end']
      crash['appLoadTotal'] = 0;
      crash['crashCountTotal'] = 0;
      crash['crashRateArray'] = [];
      crash['appLoadsArray'] = [];
      for(var i = 0; i < data['periodicData'].length; i++){
        crash['crashRateArray'].push(data['periodicData'][i]['crashes']);
        crash['crashCountTotal'] = crash['crashCountTotal'] + data['periodicData'][i]['crashes'];
        crash['appLoadsArray'].push(data['periodicData'][i]['appLoads']);
        crash['appLoadTotal'] = crash['appLoadTotal'] + data['periodicData'][i]['appLoads']
      }
      //callback(crashRateArray, appLoadsArray, start, end, appLoadTotal, crashCountTotal);
      callback(null, crash);
    }
  })
}

//Get a list of all versions of an app from api
appVersions = function(id, callback){
  getAppVersions((error, data) => {
    //console.log(data['data']);
    Object.keys(data).forEach(function(key){
      if(key === id){
        callback(data[key]['appVersions']);
      }
    })
  })
}

//Currently this is not in use
crashRateGraph = function(id, callback){
  const crashRate = {};
  getCrashRateGraphInfo(id, (error, data) => {
    crashRate['start'] = data['start'];
    crashRate['end'] = data['end'];
    crashRate['graph'] = data['series'][0]['points'];
    callback(crashRate);
  })
}

//Gets a list of all crash groups for a specific app
combineCrashData = function(id, time, version, sort, callback){
  const crashSummaryData = [];
  getCrashInfoGeneral(id, time, version, sort, (error, data) => {
    if(error){
      callback(error);
    }else{
      let crashArray = data['errors'];
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
      callback(null, crashSummaryData);
    }
  })
}
//Fetches the MAU for the last 24 hours from the api
getMAU = function(id, callback){
  getMAUFromApi(id, (error, data) => {
    if(error){
      callback(error);
    }else{
    callback(null, data['series']['todayValue']);
  }
  })
}

//Fetches the MAU for the last 24 hours from the api
getDAU = function(id, callback){
  getDAUFromApi(id, (error, data) => {
    if(error){
      callback(error);
    }else{
      callback(null, data['series']['todayValue']);
    }
  })
}

//Returns all data avaliable for a particular crash hash
getCrashInfo = function(id, hash, callback){
  getCrashInfoDetail(id, hash, (error, data) => {
    if(error){
      callback(error);
    }else{
      crashInfo = data;
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
  getCrashInfoDetail(id, hash, (error, data) => {
    const version = data['stacktrace'];
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
  getUserDetailsApi(id, hash, (error, data) => {
    if(error){
      callback(error);
    }else{
      let obj = {};
      for(var i = 0; i < data.length; i++){
        if(data[i]['username'] === user){
          obj['appVersion'] = data[i]['app_version'];
          obj['system'] = data[i]['system'];
          obj['locale'] = data[i]['locale'];
          obj['device'] = data[i]['model'];
          obj['carrier'] = data[i]['carrier'];
          obj['lastLogIn'] = data[i]['last_login_time_iso'];
          obj['lastCrash'] = data[i]['crash_last_occurred_iso'];
        }
      }
      callback(null, obj);
    }
  })
}

