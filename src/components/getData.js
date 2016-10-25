
var api = require('../library/api.js');
let crashInfo;

getAvaliableApps = function(callback){
  const appData = [];
  getAppsList((data) => {
    Object.keys(data).forEach(function(id){
      var obj = {};
      obj['id'] = id;
      obj['name'] = data[id]['appName'];
      obj['type'] = data[id]['appType'];
      appData.push(obj);
      callback(appData);
    })
  })
}

getCrashSummaries = function(callback){
  const crashData = [];
  getCrashSummaries(id, (summary) => {
    obj['crashPercent'] = summary.data['crashPercentage'];
    obj['appLoads'] = summary.data.periodicData[0]['appLoads'];
    obj['crashCount'] = summary.data.periodicData[0]['crashes'];
    crashData.push(obj);
  })
  callback(crashData);
}

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
combineCrashData = function(id, callback){
  const crashSummaryData = [];
  getCrashInfoGeneral(id, (data) => {
    let crashArray = data['data']['errors'];
    console.log(crashArray);
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
      callback(crashSummaryData);
    }
  })
}
//Fetches the MAU for the last 24 hours from the api
getMAU = function(id, callback){
  getMAUFromApi(id, (data) => {
    callback(data['data']['series']['todayValue']);
  })
}

//Returns all data avaliable for a particular crash hash
getCrashInfo = function(id, hash, callback){
  getCrashInfoDetail(id, hash, (data) => {
    crashInfo = data['data'];
    console.log(crashInfo);
    callback();
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
getStacktrace = function(callback){
  let crashByVersion = [];
  const version = crashInfo['stacktrace'];
  for(var i = 0; i < version.length; i++){
    let obj = {};
    obj['lineNumber'] = version[i]['line_number'];
    obj['trace'] = version[i]['trace'];
    crashByVersion.push(obj);
  }
  callback(crashByVersion);
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

