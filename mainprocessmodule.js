// Generated by CoffeeScript 2.5.1
(function() {
  var cfg, log, mainprocessmodule, olog, ostr, print;

  mainprocessmodule = {
    name: "mainprocessmodule"
  };

  //region logPrintFunctions
  //#############################################################################
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["mainprocessmodule"] != null) {
      console.log("[mainprocessmodule]: " + arg);
    }
  };

  olog = function(o) {
    return log("\n" + ostr(o));
  };

  ostr = function(o) {
    return JSON.stringify(o, null, 4);
  };

  print = function(arg) {
    return console.log(arg);
  };

  //endregion

  //#############################################################################
  //region modulesFromEnvironment
  cfg = null;

  //endregion

  //#############################################################################
  mainprocessmodule.initialize = function() {
    log("mainprocessmodule.initialize");
    cfg = allModules.configmodule;
  };

  
  //#############################################################################
  //region internalFunctions
  //endregion

  //#############################################################################
  //region exposedFunctions
  mainprocessmodule.execute = function(e) {
    var src;
    log("mainprocessmodule.execute");
    src = e.source;
    log(src);
  };

  //endregion
  module.exports = mainprocessmodule;

}).call(this);
