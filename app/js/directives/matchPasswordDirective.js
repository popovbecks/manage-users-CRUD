function matchPassword() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$validators.matchPassword = function(modelValue) {
          return modelValue === scope.ctrl.data.password;
        };

        scope.$watch('ctrl.data.password', function() {
          ngModelCtrl.$validate();
        });
      }
    };
  }

  export default (ngModule) => {
    ngModule.directive('matchPassword', matchPassword);
  };
