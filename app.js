(function() {

  return {
    events: {
      'app.activated':'listLinks'
    },

    requests: {
      getTicketData: function(id) {
        return {
          url: '/api/v2/tickets/' + id + '.json',
          type:'GET',
          dataType: 'json'
        };
      },

      searchForRelatedTickets: function(feildValue) {
        return {
          url: '/api/v2/search.json?query=fieldvalue:'+ feildValue +' type:ticket',
          type:'GET',
          dataType: 'json'
        };
      },
    },

    listLinks: function() {
      var linkedFeildValue = this.ticket().customField('custom_field_' + this.setting('linkedFeild') + '');
      console.log(linkedFeildValue);
      this.ajax("searchForRelatedTickets", linkedFeildValue)
      .then(function(response){
        var passedData = {linkedValue: linkedFeildValue};
        if(response.results.length >0){
          passedData.ticketList = response.results;
        }
        this.switchTo('linked-list', passedData);
      });
    }
  };

}());
