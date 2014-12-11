'use strict';

angular.module('jwtPlayApp')
  .directive('validateEquals', function () {
    return {
      //ngModel needs to be a sibling directive
      require: 'ngModel',
      link:function(scope, element, attrs, ngModelCtrl){

        //initialise password_confirm as invalid
        ngModelCtrl.$setValidity('equal', false);

        function validateEqual(value){
          var valid;
          if (value===undefined){
            valid =false;
          }
          else{
            valid = (value===scope.$eval(attrs.validateEquals));
          }

          ngModelCtrl.$setValidity('equal', valid);
          return valid ? value:undefined;
        }

        //Array of functions to execute, whenever the control reads value from the DOM
        ngModelCtrl.$parsers.push(validateEqual);
        //Array of functions to execute, whenever the model value changes
        ngModelCtrl.$formatters.push(validateEqual);

        scope.$watch(attrs.validateEquals, function(){
          //$viewValue is the actual string value in the view.
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });
      }
    };
  });
