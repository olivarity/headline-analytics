$(document).ready(function() {
  
  $.ajax({
    method: 'GET',
    url: '/api',
    dataType: 'json',
    tryCount: 0,
    retryLimit: 3,
    success: function (data) {
      console.log(data);
      $('#button')
        .text(data.button)
        .attr('data-id', data.id);
      $('#headline').text(data.headline)
    },
    error: function(err) {
      console.log(err, this);
      this.tryCount++;
      if(this.tryCount < this.retryLimit) {
        console.log('Retry attempt no. ' + this.tryCount);
        $.ajax(this);
        return;
      }
      $('#button').text('ERROR');
      $('#headline').text('ERROR')
    }
  });

  $('#button').on('click', function () {
    const id = $(this).attr('data-id');
    if(id) {
      $.ajax({
        method: 'POST',
        url: '/api',
        dataType: 'json',
        contentType: "application/json",
        data: '{ "id": "' + id +'" }' 
      });
      $(this).attr('disabled', true).text('Clicked!');
    }
    console.log('Button ' + id + ' clicked!');
  });
});
