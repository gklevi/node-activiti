var activiti = require("./index");
var fs = require('fs');


activiti.configure({
   processEngineName : "myEngine",
   jdbcUrl: "jdbc:h2:tcp://localhost/d:/Development/myDB",
   jdbcUsername: "sa",
   jdbcPassword: "sa",
   databaseTablePrefix: "C_"
});

var engine = activiti.engine();
console.log("Engine Name: " + engine.getNameSync());

var repository = activiti.repositoryService();
var runtime = engine.getRuntimeServiceSync();
var taskService = engine.getTaskServiceSync();

var processes = repository.createProcessDefinitionQuerySync().listSync();
console.log("Count Processes: " + processes.sizeSync());

