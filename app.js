(function() {

  return {

    events: {
      'app.activated':'listLinks'
    },

    requests: {
    // use zendesk api to search for the same feild value on tickets.
      searchForRelatedTickets: function(feildValue) {
        return {
          url: '/api/v2/search.json?query=fieldvalue:'+ feildValue +' type:ticket status<closed',
          type:'GET',
          dataType: 'json'
        };
      },

    },

    listLinks: function() {
      //get linked feild value from current ticket
      var linkedFeildValue = this.ticket().customField('custom_field_' + this.setting('linkedFeild') + '');
      // search for tickets with same value
      this.ajax("searchForRelatedTickets", linkedFeildValue)
      .then(function(response){
        //set up data to be passed to view
        var passedData = {linkedValue: linkedFeildValue};
        //Check that their is data/linked tests
        if(response.results.length >0){
          passedData.ticketList = response.results;
        }
        // pass data to view
        this.switchTo('linked-list', passedData);
      });
    }

  };

}());
