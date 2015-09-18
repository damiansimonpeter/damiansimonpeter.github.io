'use strict';

angular
  .module('mycalendarApp', ['mwl.calendar', 'ui.bootstrap', 'ngTouch', 'ngAnimate'])



  .controller('MainCtrl', function ($modal, $scope, moment) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.calendarDay = new Date();
    vm.events = [
	
	/*Service to return all events, that belongs to the logged in user
	
		and also the event that the person as accepted to invite */
		
     /* {
        title: 'Kandela test event',
		description:'type a descritpion here',
        address: 'address',
        type: 'warning',
        startsAt: moment().subtract(1, 'day').toDate().toDateString(),
        endsAt: moment().subtract(1, 'day').toDate().toDateString(),
        draggable: true,
        resizable: true
      },*/
    ];




        function showModal(action, event) {
      $modal.open({
        templateUrl: 'modalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }


    vm.eventClicked = function(event) {
      showModal('Clicked', event);

    };

    vm.eventEdited = function(event) {
      showModal('Edited', event);
    };

    vm.eventDeleted = function(event) {
      showModal('Deleted', event);
    };


    vm.eventTimesChanged = function(event) {

        alert('hello world');
      showModal('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    $scope.saveEventsData = function(index){
        var userEvents = vm.events;
        var item = userEvents[index];
        if(item === undefined)
            return;
        var userObject = {email:'sunday@bincom.net',fullName:'sunday goodman'};
        var event = new Event();
        event.setUser(userObject);
        item.startsAt = item.startsAt !== undefined ? item.startsAt.toString() : '';
        item.endsAt = item.endsAt !== undefined ? item.endsAt.toString() : '';
        var obj = {

            title: item.title,
            description:item.description,
            address: item.address,
            type: item.type,
            startsAt:item.startsAt,
            endsAt: item.endsAt

        };
       event.update(index,obj);
        console.log(obj);
    };

     $scope.getEvents = function(){
         var event = new Event();
         event.getAll('sunday@bincom.net',function(data){
             vm.events = [];
                vm.events = data.val();
                $scope.$apply();
             /*dataItems.forEach(function(item){
             });*/
             console.log(vm.events);
         });
     };

$scope.deleteEventsData = function(index){
        var userObject = {email:'sunday@bincom.net',fullName:'sunday goodman'};
        var event = new Event();
        event.setUser(userObject);
        event.delete(index);
        console.log(index);
    };
        $scope.getEvents();

  });


