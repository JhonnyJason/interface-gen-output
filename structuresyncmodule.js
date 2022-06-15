// Generated by CoffeeScript 2.6.1
//###########################################################
//region debug
var log, mapRoutesByName, olog, parsedDocumentation, parsedHandlers, parsedInterface, routesMap, syncIntersectCutMode, syncIntersectIgnoreMode, syncUnionMode;

import {
  createLogFunctions
} from "thingy-debug";

({log, olog} = createLogFunctions("structuresyncmodule"));

import * as filesParser from "./filesparsermodule.js";

//###########################################################
parsedDocumentation = null;

parsedInterface = null;

parsedHandlers = null;

//###########################################################
routesMap = {};

//###########################################################
mapRoutesByName = function() {
  var i, id, j, k, len, len1, len2, ref, ref1, ref2, routeObj;
  log("mapRoutesByName");
  if ((parsedDocumentation != null) && (parsedDocumentation.routeObjects != null)) {
    ref = parsedDocumentation.routeObjects;
    for (i = 0, len = ref.length; i < len; i++) {
      routeObj = ref[i];
      id = routeObj.routeName;
      if (routesMap[id] == null) {
        routesMap[id] = {};
      }
      routesMap[id].documentation = routeObj;
    }
  }
  if ((parsedInterface != null) && (parsedInterface.routeObjects != null)) {
    ref1 = parsedInterface.routeObjects;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      routeObj = ref1[j];
      id = routeObj.routeName;
      if (routesMap[id] == null) {
        routesMap[id] = {};
      }
      routesMap.interface = routeObj;
    }
  }
  if ((parsedHandlers != null) && (parsedHandlers.routeObjects != null)) {
    ref2 = parsedHandlers.routeObjects;
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      routeObj = ref2[k];
      id = routeObj.routeName;
      if (routesMap[id] == null) {
        routesMap[id] = {};
      }
      routesMap.handler = routeObj;
    }
  }
};

//###########################################################
//region syncFunctions
syncUnionMode = function() {
  var name, route;
  log("syncUnionMode");
  for (name in routesMap) {
    route = routesMap[name];
    log(name);
    log(Object.keys(route));
  }
  log("not implemented yet!");
};

syncIntersectIgnoreMode = function() {
  var name, route;
  log("syncIntersectIgnoreMode");
  for (name in routesMap) {
    route = routesMap[name];
    log(name);
    log(Object.keys(route));
  }
  log("not implemented yet!");
};

syncIntersectCutMode = function() {
  var name, route;
  log("syncIntersectCutMode");
  for (name in routesMap) {
    route = routesMap[name];
    log(name);
    log(Object.keys(route));
  }
  log("not implemented yet!");
};

//endregion

//###########################################################
export var syncStructures = function(mode) {
  log("syncStructure");
  parsedDocumentation = filesParser.getParsedDocumentation();
  parsedInterface = filesParser.getParsedInterface();
  parsedHandlers = filesParser.getParsedHandlers();
  mapRoutesByName();
  switch (mode) {
    case "union":
      syncUnionMode();
      break;
    case "intersect-ignore":
      syncIntersectIgnoreMode();
      break;
    case "intersect-cut":
      syncIntersectCutMode();
      break;
    default:
      throw new Error("Unknown Sync Mode: " + mode);
  }
};
