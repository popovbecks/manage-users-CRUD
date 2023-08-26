function CreateEditWidgetCtrl($scope) {
 var ctrl = this;
 ctrl.typeList = ['Admin', 'Driver'];
 ctrl.emptyUserData = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    type: null,
    password: null,
    repeatPassword: null
 }
 ctrl.data = ctrl.user || ctrl.emptyUserData;
 ctrl.close = ()=> ctrl.onClose();
 ctrl.delete = ({id}) => ctrl.onDelete(id);
 ctrl.saveUser = (userForm) => {
    if (!userForm.$valid) return;
    delete ctrl.data.repeatPassword;
    ctrl.onUpdate({dataFromChild: ctrl.data});
    ctrl.close();
 }
 ctrl.deleteUser = ()=> {
    ctrl.onDelete({dataFromChild: ctrl.data.id});
 }
 $scope.$watch("ctrl.user", function () {
     ctrl.data = ctrl.user ? {
      ...ctrl.user,
      repeatPassword: ctrl.user.password
   } : ctrl.emptyUserData;
  });
}

CreateEditWidgetCtrl.$inject = ['$scope'];
export default (ngModule) => {
    ngModule.component('createEditWidget', {
        template: require('../../tpl/createEditWidget.html'),
        controller: CreateEditWidgetCtrl,
        controllerAs: 'ctrl',
        bindings: {
            user: '<',
            onUpdate: '&',
            onDelete: '&',
            onClose: '&'
        }
        });
    }
