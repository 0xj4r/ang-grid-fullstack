'use strict';
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
      
    $scope.proConList = [
        {
            solution: "Current", 
            pros: [
                "Already implemented", 
                "Technology has been around for a long time"
            ], 
            cons: [
                "No design patterns and therefore is difficult to make improvements", 
                // "Bad design strategies", 
                "Requires Farpoint licensing", 
                // "Poor Performance",  show actual performance metrics
                "Difficult to make improvements", 
                "Does not have code deployment", 
                "Does not have documentation of how the current system works", 
                "Is not extensible", 
                "Project is not organized logically", 
                "Does not easily integrate with other existing modules and technologies",  
                "Has not been built to be tested", 
                "Does not have test integration"
            ]
            
        }, 
        {
            solution: "ISA", 
            pros: [
                "Uses in house developed framework that the org has already invested in", 
                "Centralized solution", 
                "Technology has been around for a long time"
            ], 
            cons: [
                "Took 35 hours to create a barely working demo",
                "Lives on client machine", 
                "Slow Development", 
                "Requires infragistics licensing", 
                "Requires completed replication of existing application code to add new applications", 
                "Code and applications are not well documented", 
                "Has not been built to be tested", 
                "Does not have test integration", 
                "Many of the original developers have moved to different groups and there is a lack of knowledge of how the framework should be used",
                "Built with core classes and framework that are difficult to extend", 
                "Clunky to navigate", 
                "Each client must update their application", 
                "Technology has become stale"
            ]
        }, 
        {
            solution: "Node and Angular", 
            pros: [
                "Took only 16 hours to implement better working demo", 
                "Helps developers stay engaged while remaining marketable", 
                "Modular ecosystem allowing for easy reuse of components", 
                "Integrated Testing Framework", 
                "Real-time application performance", 
                "Uses javascript throughout the full stack allowing easy transition from front end to back end", 
                "Prebuilt modules for all steps of project management and development", 
                "Easily scales for all solution sizes", 
                "Attract fresh developers eager to use the technology", 
                "Live debugging, deployment and editing"
            ], 
            cons: [ 
                "Our org has less experience with the  technology"
            ]
        }
    ]
    
  });


