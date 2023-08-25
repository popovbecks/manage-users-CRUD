function apiService($http) {
    this.getAccounts = function () {
        return $http.get('http://localhost:3000/users');
    }
    this.addUser = function (data) {
        return $http.post('http://localhost:3000/users/', data);
    }
    this.changeUser = function (id, data) {
        return $http.put(`http://localhost:3000/users/${id}`, data)
    }

    this.deleteUser = function (id) {
        return $http.delete(`http://localhost:3000/users/${id}`);
    }
}
apiService.$inject = ['$http'];
export default (ngModule) => {
    ngModule.service('apiService', apiService);
}