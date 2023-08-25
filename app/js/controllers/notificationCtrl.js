function Notification() {}

export default (ngModule) => {
    ngModule.component('notification', {
        template: require('../../tpl/notification.html'),
        controller: Notification,
        controllerAs: '$ctrl',
        bindings: {
            type: '<',
            message: '<'
        }
        });
    }
