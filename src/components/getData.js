
var api = require('../library/api.js');

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
        appData.push(obj);
        callback(appData);
      })
    })
  })
}