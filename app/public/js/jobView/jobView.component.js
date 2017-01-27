(function() {
  'use strict';


  angular.module('app')
    .component('jobView', {
      controller: JobViewController,
      templateUrl: '/js/jobView/jobView.template.html'
    });

    JobViewController.$inject = ['$http', '$state', '$stateParams', 'userService']

    function JobViewController($http, $state, $stateParams, userService){
      const vm = this;

      vm.skills= $stateParams.skills;

      vm.$onInit = function() {
        console.log("loading jobView comp");
        console.log($stateParams, "stateParams");

        $http({
          method:'GET',
          url: '/indeedSingleJob',
          params: {
            url: $stateParams.jobLink
          }
        })
        .then((response) => {
          console.log("jobView:html? ", response);
          return vm.jobData = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      }

      vm.isUser = function() {
        return userService.id ? true : false;
      }

      vm.saveSkills = function() {
        vm.userid = '58862bb83c085df2aaf099cc';
        var request = {
          skillSet: vm.skills
        }
        console.log(request);
        $http.post(`/skillsets/${vm.userid}`, request).then((data) => {
          //TODO: make a toast/popup letting the user know their skills have been saved
          console.log(data);
          return;
        })
      }
    }

}());
