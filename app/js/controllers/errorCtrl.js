let ErrorCtr = function($scope, $rootScope, $state, $stateParams) {
  var error = this;
  console.log($state, $stateParams);
  error.status  = $state.params.errorStatus;

  if($stateParams.errorObj && ($stateParams.errorObj.message || $stateParams.errorObj.data.error || $stateParams.errorObj.statusText)) {
    error.message = $stateParams.errorObj.message || $stateParams.errorObj.data.error || $stateParams.errorObj.statusText;
  }else {
    error.message = 'We can’t find page you’re looking for';
  }

  return error;
};
ErrorCtr.$inject = ['$scope', '$rootScope', '$state', '$stateParams'];
export default (ngModule) => {
  ngModule.controller('ErrorCtr', ErrorCtr);
}
