'use strict';

app.factory('Auth', function($firebaseAuth, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    register: function(user) {
      return auth.$createUser({
        email: user.email,
        password: user.password
      });
    },
    login: function(user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },
    logout: function() {
      auth.$unauth();
    },
    resolveUser: function() {
      return auth.$getAuth();
    },
    signedIn: function() {
      return !!Auth.user.provider;
    },
    user: {}
  };

  auth.$onAuth(function(user) {
    if (user) {
      console.log("Logged in as:", user.password.email);
      angular.copy(user, Auth.user);
    } else {
      console.log("Logged out");
      angular.copy({}, Auth.user);
    }
  });

  return Auth;
});
