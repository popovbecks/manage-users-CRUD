function passwordStrength() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$validators.passwordStrength = function(modelValue) {
          if (!modelValue) {
            return false;
          }

          const minLength = 8;
          const hasNumber = /\d/.test(modelValue);
          const hasLetter = /[a-zA-Z]/.test(modelValue);

          return modelValue.length >= minLength && hasNumber && hasLetter;
        };
      }
    };
  }

  export default (ngModule) => {
    ngModule.directive('passwordStrength', passwordStrength);
  };