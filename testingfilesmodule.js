// Generated by CoffeeScript 2.5.1
(function() {
  var M, deployRequestTemplate, fs, getDeployRequestsFileName, getLocalRequestsFileName, localRequestTemplate, log, olog, ostr, p, print, testingfilesmodule, writeDeployRequestsFile, writeLocalRequestsFile;

  testingfilesmodule = {
    name: "testingfilesmodule"
  };

  //###########################################################
  //region printLogFunctions
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["testingfilesmodule"] != null) {
      console.log("[testingfilesmodule]: " + arg);
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
  fs = require("fs");

  M = require("mustache");

  //###########################################################
  p = null;

  //###########################################################
  //region templates
  localRequestTemplate = `{{=<% %>=}}
<% #routes %>
### 
POST {{local}}/<%{route}%>
content-type: application/json

{
<%{requestBlock}%>
}
<% /routes %>
<%={{ }}=%>`;

  //###########################################################
  deployRequestTemplate = `{{=<% %>=}}
<% #routes %>
### 
POST {{deploy}}/<%{route}%>
content-type: application/json

{
<%{requestBlock}%>
}
<% /routes %>
<%={{{ }}}=%>`;

  //endregion

  //###########################################################
  testingfilesmodule.initialize = function() {
    log("testingfilesmodule.initialize");
    p = allModules.pathmodule;
  };

  //###########################################################
  //region internalFunctions
  getLocalRequestsFileName = function(name) {
    var l;
    name = name.toLowerCase();
    l = "interface".length; // get rid of "interface" postfix
    if (name.indexOf("interface") > 0) {
      name = name.slice(0, name.length - l);
    }
    if (name.indexOf("local") < 0) {
      name = name + "local";
    }
    return name;
  };

  //###########################################################
  getDeployRequestsFileName = function(name) {
    var l;
    name = name.toLowerCase();
    l = "interface".length; // get rid of "interface" postfix
    if (name.indexOf("interface") > 0) {
      name = name.slice(0, name.length - l);
    }
    if (name.indexOf("deploy") < 0) {
      name = name + "deploy";
    }
    return name;
  };

  //###########################################################
  writeLocalRequestsFile = function(interfaceObject, name) {
    var file, fileName, filePath;
    fileName = getLocalRequestsFileName(name);
    file = M.render(localRequestTemplate, interfaceObject);
    filePath = p.getFilePath(fileName + ".http");
    fs.writeFileSync(filePath, file);
  };

  writeDeployRequestsFile = function(interfaceObject, name) {
    var file, fileName, filePath;
    fileName = getDeployRequestsFileName(name);
    file = M.render(deployRequestTemplate, interfaceObject);
    filePath = p.getFilePath(fileName + ".http");
    fs.writeFileSync(filePath, file);
  };

  //endregion

  //###########################################################
  testingfilesmodule.writeFiles = function(interfaceObject, name) {
    log("testingfilesmodule.writeFiles");
    writeLocalRequestsFile(interfaceObject, name);
    writeDeployRequestsFile(interfaceObject, name);
  };

  module.exports = testingfilesmodule;

}).call(this);
