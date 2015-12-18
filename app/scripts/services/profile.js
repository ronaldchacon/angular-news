'use strict';

app.factory('Profile', function($window, FIREBASE_URL, $firebaseArray, $firebaseObject, Post, $q) {
  var ref = new $window.Firebase(FIREBASE_URL);

  var profile = {
    get: function(userId) {
      return $firebaseObject(ref.child('profile').child(userId));
    },
    getPosts: function(userId) {
      var defer = $q.defer();

      $firebaseArray(ref.child('user_posts').child(userId))
      .$loaded()
      .then(function(data) {
        var posts = {};
        for (var i = 0; i < data.length; i++) {
          var value = data[i].$value;
          posts[value] = Post.get(value);
        }
        defer.resolve(posts);
      });
      return defer.promise;
    }
  };

  return profile;
});
