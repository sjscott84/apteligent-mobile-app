
var api = require('../library/api.js');
//Makes the api call to get a list of all apps as well as some basic crash info regarding each app
combineData = function(callback){
  const appData = [];
  getAppsList((data) => {
    Object.keys(data).forEach(function(id){
      var obj = {};
      obj['id'] = id;
      obj['name'] = data[id]['appName'];
      obj['type'] = data[id]['appType'];

      getCrashSummaries(id, (summary) => {
        obj['crashPercent'] = summary.data['crashPercentage'];
        obj['appLoads'] = summary.data.periodicData[0]['appLoads'];
        obj['crashCount'] = summary.data.periodicData[0]['crashes'];
        appData.push(obj);
        callback(appData);
      })
    })
  })
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
    for(var i = 0; i < crashArray.length; i++){
      let obj = {};
      obj['crashName'] = crashArray[i]['name'];
      obj['crashReason'] = crashArray[i]['reason'];
      obj['hash'] = crashArray[i]['hash'];
      obj['totalOccurances'] = crashArray[i]['total_occurrences'];
      obj['firstOccured'] = crashArray[i]['first_occurred_time'];
      obj['lastOccured'] = crashArray[i]['last_occurred_time'];
      obj['affectedUsers'] = crashArray[i]['num_unique_sessions'];
      crashSummaryData.push(obj);
      callback(crashSummaryData);
    }
  })
}
