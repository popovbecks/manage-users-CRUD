function usernameAvailability($http, $q) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$asyncValidators.usernameAvailability = function(modelValue) {
        if (!modelValue) {
          return $q.resolve(); // Resolve immediately for empty input
        }

        return $http.get('http://localhost:3000/users', { params: { username: modelValue } })
          .then(function(response) {
            if (response.data.length) {
              return $q.reject('notUnique');
            } else {
              return $q.resolve();
            }
          })
          .catch(function() {
            return $q.reject();
          });
      };
    }
  };
}

usernameAvailability.$inject = ['$http', '$q'];

export default (ngModule) => {
  ngModule.directive('usernameAvailability', usernameAvailability);
};
