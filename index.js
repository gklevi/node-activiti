// As activiti is a java library we depend on node-java module
var java = require("java");

// Set any VM options here, i.e.
//java.options.push("-Djava.awt.headless=true");
//java.options.push("-Xmx=2048");

// Add classpath to activiti jars
java.classpath.push(__dirname + "/libs/activiti-engine-5.14.jar");
java.classpath.push(__dirname + "/libs/activiti-spring-5.14.jar");
java.classpath.push(__dirname + "/libs/activiti-bpmn-model-5.14.jar");
java.classpath.push(__dirname + "/libs/activiti-bpmn-converter-5.14.jar");
java.classpath.push(__dirname + "/libs/h2-1.3.170.jar");
java.classpath.push(__dirname + "/libs/spring-core-3.1.2.RELEASE.jar");
java.classpath.push(__dirname + "/libs/commons-logging-1.1.1.jar");
java.classpath.push(__dirname + "/libs/commons-lang-2.4.jar");
java.classpath.push(__dirname + "/libs/commons-lang3-3.1.jar");
java.classpath.push(__dirname + "/libs/mybatis-3.2.2.jar");
java.classpath.push(__dirname + "/libs/slf4j-api-1.7.2.jar");
java.classpath.push(__dirname + "/libs/slf4j-log4j12-1.7.2.jar");
java.classpath.push(__dirname + "/libs/log4j-1.2.13.jar");
java.classpath.push(__dirname + "/libs/joda-time-2.1.jar");
java.classpath.push(__dirname + "/processes");

// Create a process configuration
var Config = java.import("org.activiti.engine.ProcessEngineConfiguration");
var processEngine = Config.createStandaloneInMemProcessEngineConfigurationSync().buildProcessEngineSync();

module.exports = {
    configure: function(options) {
	
		var config = Config.createStandaloneProcessEngineConfigurationSync();
		
		for(var prop in options){
			var propValue = options[prop];
			console.log(prop + ': ' + propValue);

			var fnName = "set" + prop[0].toUpperCase() + prop.substring(1) + "Sync";
			console.log('function name + : ' + fnName);
			
			if( typeof config[fnName] === 'function' ) {
				config[fnName](propValue);
			} else {
				console.log(prop + " does not exist! Ignored!");
			}
		}
		processEngine = config.buildProcessEngineSync();
	}, 
	engine: function() {
		return processEngine;
	},
	repositoryService: function() { 
		return processEngine.getRepositoryServiceSync(); 
	},
	runtimeService: function() {
		return processEngine.getRuntimeServiceSync();
	},
	taskService: function() {
		return processEngine.getTaskServiceSync();
	},
	historyService: function() {
		return processEngine.getHistoryServiceSync();
	},
};
