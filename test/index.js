var should = require('chai').should(),
    activiti = require('../index'),
	fs = require('fs');

describe('engine', function() {
  
  it('get engine name', function() {
    engine = activiti.engine();
    engine.getNameSync().should.equal('default');
  });

  it('deploy process', function() {
	var repository = activiti.repositoryService();	
	var processes = repository.createProcessDefinitionQuerySync().listSync();
	console.log("Count Processes Before Deployment: " + processes.sizeSync());
	processes.sizeSync().should.equal(0);

	var data = fs.readFileSync('./test/processes/UserTaskTest.bpmn','utf-8');
	data.should.be.a('string');
	
	var deployment = repository.createDeploymentSync().addStringSync("UserTaskTest.bpmn",data).deploySync();

	console.log("Deploying 'UserTaskTest': " + deployment.getIdSync());
	deployment.getIdSync().should.be.above(0);

	var processes = repository.createProcessDefinitionQuerySync().listSync();
	console.log("Count Processes After Deployment: " + processes.sizeSync());
	processes.sizeSync().should.equal(1);
	
	var processDef = processes.getSync(0);
	processDef.should.not.to.be.null;
	console.log("Process Definition: " + processDef.toString());	
	
	var processDefId = processDef.getIdSync();
	console.log("Process Definition ID: " + processDefId);	
	processDefId.should.not.to.be.null;
	processDefId.should.be.a('string');
  });
  
  it('start process', function() {
	var repository = activiti.repositoryService();	
	var runtime = activiti.runtimeService();	
  
	var processes = repository.createProcessDefinitionQuerySync().listSync();
	processes.sizeSync().should.be.above(0);
	
	var processDef = processes.getSync(0);
	console.log("Process Definition: " + processDef.toString());	
	processDef.should.not.to.be.null;

	var processDefId = processDef.getIdSync();
	console.log("Process Definition ID: " + processDefId);	
	processDefId.should.not.to.be.null;
	processDefId.should.be.a('string');

	var processInst = runtime.startProcessInstanceByIdSync(processDefId.toString());
	console.log("Start Process Instance: " + processInst.getIdSync());  
	processInst.should.not.to.be.null;
	processInst.getIdSync().should.be.a('string');
  });
  
});

