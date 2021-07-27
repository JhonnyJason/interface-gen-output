// Generated by CoffeeScript 2.5.1
(function() {
  var M, fs, getHandlersName, getMissingRoutes, getRoutesName, handlerFunctionSignatureTemplate, handlersTemplate, log, olog, ostr, p, print, routesTemplate, scifilesmodule, writeHandlersFile, writeRoutesFile;

  scifilesmodule = {
    name: "scifilesmodule"
  };

  //###########################################################
  //region printLogFunctions
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["scifilesmodule"] != null) {
      console.log("[scifilesmodule]: " + arg);
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
  routesTemplate = `{{#routes}}
############################################################
sciroutes.{{route}} = (req, res) ->
    try
        response = await h.{{route}}({{argsBlock}})
        res.send(response)
    catch err then res.send({error: err.stack})
    return

{{/routes}}`;

  handlersTemplate = `{{#routes}}
############################################################
scihandlers.{{route}} = ({{args}}) ->
    result = {}
    ###
    {{{response}}}
    ###
    return result


{{/routes}}`;

  handlerFunctionSignatureTemplate = "scihandlers.{{route}} = ({{args}}) ->";

  //endregion

  //###########################################################
  scifilesmodule.initialize = function() {
    log("scifilesmodule.initialize");
    p = allModules.pathmodule;
  };

  
  //###########################################################
  //region internalFunctions
  getRoutesName = function(name) {
    var l;
    name = name.toLowerCase();
    l = "interface".length; // get rid of "interface" postfix
    if (name.indexOf("interface") > 0) {
      name = name.slice(0, name.length - l);
    }
    if (name.indexOf("routes") < 0) {
      name = name + "routes";
    }
    return name;
  };

  getHandlersName = function(name) {
    var l;
    name = name.toLowerCase();
    l = "interface".length; // get rid of "interface" postfix
    if (name.indexOf("interface") > 0) {
      name = name.slice(0, name.length - l);
    }
    if (name.indexOf("handlers") < 0) {
      name = name + "handlers";
    }
    return name;
  };

  //###########################################################
  writeRoutesFile = function(interfaceObject, name) {
    var routesFile, routesFilePath, routesName;
    routesName = getRoutesName(name);
    routesFile = M.render(routesTemplate, interfaceObject);
    routesFilePath = p.getFilePath(routesName + ".coffee");
    fs.writeFileSync(routesFilePath, routesFile);
  };

  writeHandlersFile = function(interfaceObject, name) {
    var err, handlersFile, handlersFilePath, handlersName, newInterfaceObject, oldFile, routes;
    handlersName = getHandlersName(name);
    handlersFilePath = p.getFilePath(handlersName + ".coffee");
    newInterfaceObject = null;
    try {
      oldFile = fs.readFileSync(handlersFilePath, "utf8");
      routes = getMissingRoutes(interfaceObject.routes, oldFile);
      newInterfaceObject = {routes};
      handlersFile = oldFile + M.render(handlersTemplate, newInterfaceObject);
    } catch (error) {
      err = error;
      handlersFile = M.render(handlersTemplate, interfaceObject);
    }
    fs.writeFileSync(handlersFilePath, handlersFile);
  };

  //###########################################################
  getMissingRoutes = function(routes, file) {
    var funSignature, i, len, missing, route;
    missing = [];
    for (i = 0, len = routes.length; i < len; i++) {
      route = routes[i];
      funSignature = M.render(handlerFunctionSignatureTemplate, route);
      if (file.indexOf(funSignature) < 0) {
        missing.push(route);
      }
    }
    return missing;
  };

  //endregion

  //###########################################################
  scifilesmodule.writeFiles = function(interfaceObject, name) {
    log("scifilesmodule.writeFiles");
    writeRoutesFile(interfaceObject, name);
    writeHandlersFile(interfaceObject, name);
  };

  module.exports = scifilesmodule;

}).call(this);
