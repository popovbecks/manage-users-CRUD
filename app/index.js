import * as Angular from 'angular'

import 'oclazyload'
import 'angular-ui-router'
import 'angular-sanitize'
import 'angular-animate'
import 'angular-touch'
import 'angular-resource'
import 'angular-ui-bootstrap'

import './styles/css/app-user-list.css';
import './styles/css/app-widget.css';
import './styles/scss/app.scss';

const ngModule = Angular.module('appUserList',
    [
        'ui.router',
        'oc.lazyLoad',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngTouch',
        'ui.bootstrap'
    ]);

require('./js/config').default(ngModule);
require('./js/config.ui.router').default(ngModule);
require('./js/controllers/errorCtrl.js').default(ngModule);
require('./js/controllers/appCtrl').default(ngModule);
require('./js/controllers/createEditWidgetCtrl.js').default(ngModule);
require('./js/controllers/notificationCtrl.js').default(ngModule);
require('./js/controllers/userListCtrl.js').default(ngModule);
require('./js/services/apiService.service').default(ngModule);

require('./js/directives/matchPasswordDirective.js').default(ngModule);
require('./js/directives/passwordStrengthDirective.js').default(ngModule);
require('./js/directives/usernameAvailabilityDirective.js').default(ngModule);