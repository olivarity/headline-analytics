$(document).ready(function() {
  $.ajax({
    method: 'GET',
    url: '/api',
    dataType: 'json',
    tryCount: 0,
    retryLimit: 3,
    success: function (data) {
      console.log(data);
      $('#button').text(data.button);
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
});
