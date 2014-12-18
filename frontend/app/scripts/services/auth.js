'use strict';

angular.module('jwtPlayApp').service('auth', function ($http, authToken, $state, API_URL, $window, $q) {

  function authSuccess(res){
    authToken.setToken(res.token);
    $state.go('main');
  }

  this.login = function(email, password){
    return $http.post(API_URL+ 'login', {email:email, password:password})
      .success(authSuccess);
  };

  this.register = function(email, password){
    return $http.post(API_URL+ 'register', {email:email, password:password})
      .success(authSuccess);
  };

  var clientId = '887645893823-1iimoab8icv1o6nqlufodket0f2sv0sk.apps.googleusercontent.com';
  var redirectUri = window.location.origin;
  //https://developers.google.com/accounts/docs/OAuth2WebServer
  var googleAuthRequestBuilder =[];
  googleAuthRequestBuilder.push('response_type=code',
    'client_id=' + clientId,
    'redirect_uri=' + redirectUri,
    'scope=profile email'
  );


  this.googleAuth = function(){
    //This endpoint is the target of the initial request. It handles active session lookup,
    //authenticating the user, and user consent. The result of requests to this endpoint
    //include access tokens, refresh tokens, and authorization codes.
    var url = 'https://accounts.google.com/o/oauth2/auth?' + googleAuthRequestBuilder.join('&');

    var options = 'width=500, height=500, left='+ ($window.outerWidth-500)/2 + ',top=' + (window.outerHeight-500)/2.5;

    var deferred = $q.defer();


    var popup = $window.open(url, '', options);
    $window.focus();
    $window.addEventListener('message',function(event){
      if(event.origin === $window.location.origin){
        popup.close();
        //event.data contains the authorization code
        //we need to exchange the code (along with a client ID and client secret) for an access token
        var code = event.data;
        //post the authorization code back to our server side
        $http.post(API_URL+'auth/google',{
          code:code,
          clientId:clientId,
          redirectUri:redirectUri
        }).success(function(jwt){
          authSuccess(jwt);
          deferred.resolve(jwt);
        });
      }
    });

    return deferred.promise;
  };
});
