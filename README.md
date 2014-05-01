Activiti 4 Node.js
==================

A very small node module that provides basic access to the activiti process engine (http://activiti.org)) using the node java bridge (see https://github.com/joeferner/node-java).

This module is a result of some experiments with the node platform.
Trying out the useful node java bridge to leverage java libraries in node. 
As a show case I have chosen the activiti process engine so that I can use executable bpmn models in node.    
(an alternative way to use activiti is by using its REST-API, however this module provides a way to use activiti embedded). 

## Installation

  npm install activiti --save

  
## Usage

In general, the first step is to configure activiti (data store, users, etc.).
For example, access to a h2 database can be configured as follows.  

```javascript
activiti.configure({
   processEngineName : "myEngine",
   jdbcUrl: "jdbc:h2:tcp://localhost/c:/myDB",
   jdbcUsername: "sa",
   jdbcPassword: "sa",
});
```

COnfiguration is useful to define a druable data store for activiti because if no configuration is provided, a h2 in memory database will be used and tables will be automatically created and dropped.  
After configuration a process engine is created and the activiti API can be used.
The following example reads the list of all process definitions. 
 
```javascript
  // access the activiti library 
  var activiti = require('activiti');
  
  // use the repository service to access process definitions
  var repository = activiti.repositoryService(),
  
  // query all deployed process defintions 
  var processes  = repository.createProcessDefinitionQuerySync().listSync();
  console.log("Deployed Processes : " + processes.sizeSync());
```
  
## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
Based on Activiti 5.14

## License

The MIT License (MIT)

Copyright (c) 2014 gklevi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.