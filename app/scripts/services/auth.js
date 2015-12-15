'use strict';

app.factory('Auth', function($firebaseArray, $firebaseObject, $firebaseAuth, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    register: function(user) {
      return auth.$createUser({
        email: user.email,
        password: user.password
      });
    },
    createProfile: function(user) {
      var profile = {
        username: user.username,
      };
      var profileRef = ref.child('profile').child(user.uid);
      return profileRef.set(profile);
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
      Auth.user.profile = $firebaseObject(ref.child('profile').child(Auth.user.uid));
      console.log(Auth.user);
    } else {
      console.log("Logged out");
      if (Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();
      }
      angular.copy({}, Auth.user);
      console.log(Auth.user);
    }
  });

  return Auth;
});
