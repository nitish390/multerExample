var app=angular.module('myapp',['ngRoute']);


app.run(function($rootScope){
	console.log('Hello run');
});



app.config(function($routeProvider,$locationProvider){
	$routeProvider.when('/',{
		templateUrl:'view/a.html',
		controller:'Actrl'
	});
	$routeProvider.when('/b',{
		templateUrl:'view/b.html',
		controller:'Bctrl'
	});
	$routeProvider.when('/c',{
		templateUrl:'view/c.html',
		controller:'Cctrl'
	});
	$routeProvider.when('/upload',{
		templateUrl:'view/upload.html',
		controller:'UploadController'
	});
	
	$locationProvider.html5Mode(true);
	
	
	//localhost:8080/#!/product/760
	$routeProvider.when('/product/:product_id',{
		templateUrl:'view/product.html',
		controller:'productctrl'
	});
	$routeProvider.otherwise({
		redirectTo:'/'
	});
});

// sudo apt-get install npm
// sudo apt-get install nodejs-legacy
//sudo npm install --global http-server

//file:///G:/Angularjs/PIET-01/8%20July/index.html#!/


app.controller('Actrl',function($scope){
	console.log('A controller called');
});
app.controller('Bctrl',function($scope){
	console.log('B controller called');
});
app.controller('Cctrl',function($scope){
	console.log('C controller called');
});
app.controller('productctrl',function($routeParams,$scope,$location){
	console.log($routeParams.product_id)
	if(/^\d+$/.test($routeParams.product_id)){
		$scope.product_id=$routeParams.product_id;
		$scope.performOperation=function(){
			console.log('operations performed');
			
			
			$location.path('/b');
			
		}
	}else{
		$location.path('/');
	}
	
});

app.controller('UploadController',function($scope,$http){
	$scope.submitForm=function(){
		console.log($scope.f);
		var obj=new FormData();
		obj.append('myfile',$scope.f);
		obj.append('x',100);
		$http({
			url:'uploadfile',
			method:'POST',
			data:obj,
			headers:{
				'content-type':undefined
			}
		}).then(function(response){
			console.log(response)
		},function(response){
			console.log(response);
		});
	}
});

app.directive('fileModel',  function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         });