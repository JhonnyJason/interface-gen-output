// Generated by CoffeeScript 2.5.1
(function() {
  var log, olog, ostr, path, pathmodule, print;

  pathmodule = {
    name: "pathmodule"
  };

  //###########################################################
  //region printLogFunctions
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["pathmodule"] != null) {
      console.log("[pathmodule]: " + arg);
    }
  };

  ostr = function(obj) {
    return JSON.stringify(obj, null, 4);
  };

  olog = function(obj) {
    return log("\n" + ostr(obj));
  };

  print = function(arg) {
    return console.log(arg);
  };

  //endregion

  //###########################################################
  path = require("path");

  //###########################################################
  pathmodule.absolutePath = "";

  pathmodule.dirname = "";

  pathmodule.filename = "";

  pathmodule.basename = "";

  //###########################################################
  pathmodule.initialize = function() {
    log("pathmodule.initialize");
  };

  //###########################################################
  //region exposedStuff
  pathmodule.digestPath = function(source) {
    pathmodule.absolutePath = path.resolve(source);
    pathmodule.dirname = path.dirname(pathmodule.absolutePath);
    pathmodule.filename = path.basename(pathmodule.absolutePath);
    pathmodule.basename = pathmodule.filename.split(".")[0];
    log("- - -");
    log(pathmodule.absolutePath);
    log(pathmodule.dirname);
    log(pathmodule.filename);
    log(pathmodule.basename);
    log("= = =");
  };

  pathmodule.getFilePath = function(name) {
    return path.resolve(pathmodule.dirname, name);
  };

  //endregion
  module.exports = pathmodule;

}).call(this);
