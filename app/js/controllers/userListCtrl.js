const MESSAGES = {
    successAdd: 'User has been successfuly added',
    successUpdate: 'User has been successfuly updated',
    successDelete: 'User has been successfuly deleted'
}
function UserListCtrl(apiService, $timeout) {
    var userListCtrl = this;
    userListCtrl.selectedUser = null;
    userListCtrl.notification = {
        isVisible: false,
        type: null,
        message: ''
    };
    userListCtrl.$onInit = () => userListCtrl.getUsersFromApi();

    userListCtrl.getUsersFromApi = ()=> apiService.getAccounts()
        .then(({data}) => userListCtrl.users = data);

    userListCtrl.isWidgetVisible = false;
    userListCtrl.showNotification = (type, message, timeout) => {
        userListCtrl.notification.type = type;
        userListCtrl.notification.message = message;
        userListCtrl.notification.isVisible = true;
        $timeout(()=> {
            userListCtrl.notification.isVisible = false;
            userListCtrl.notificationmessage = '';
            userListCtrl.notification.type = null
        }, timeout)
    }
    userListCtrl.openWidget = ()=> userListCtrl.isWidgetVisible = true;
    userListCtrl.closeWidget = ()=> {
        userListCtrl.isWidgetVisible = false;
        userListCtrl.selectedUser = null;
        userListCtrl.resetSelectedUser();
    };
    userListCtrl.resetSelectedUser = ()=> userListCtrl.users.forEach(user => user.isSelected = false);
    userListCtrl.updateUserList = ({dataFromChild : data}) => {
        if (data.id) {
            return apiService.changeUser(data.id, data)
                .then(({data})=> {
                    userListCtrl.users = userListCtrl.users.map((user)=> {
                        userListCtrl.resetSelectedUser();
                        userListCtrl.selectedUser = null;
                        return user.id === data.id ? data : user;
                    });
                    userListCtrl.showNotification('success', MESSAGES.successUpdate, 5000);
                })
                .catch(error => userListCtrl.showNotification('error', error.message, 5000));
        }
        return apiService.addUser(data)
            .then(({data})=> {
                userListCtrl.selectedUser = null;
                userListCtrl.users.push(data);
                userListCtrl.closeWidget();
                userListCtrl.showNotification('success', MESSAGES.successAdd, 5000);
            })
            .catch(error => userListCtrl.showNotification('error', error.message, 5000));
    }
    userListCtrl.deleteUser = ({dataFromChild : id}) => {
       return apiService.deleteUser(id)
        .then(()=> {
            userListCtrl.users = userListCtrl.users.filter((user)=> user.id !== id);
            userListCtrl.closeWidget();
            userListCtrl.showNotification('success', MESSAGES.successDelete, 5000);
        })
        .catch(error => userListCtrl.showNotification('error', error.message, 5000));
    }
    userListCtrl.selectUser = (user) => {
        userListCtrl.selectedUser = user;
        userListCtrl.resetSelectedUser();
        user.isSelected = true;
        userListCtrl.isWidgetVisible = true;
    };

}

UserListCtrl.$inject = ['apiService', '$timeout'];
export default (ngModule) => {
    ngModule.controller('UserListCtrl', UserListCtrl);
}