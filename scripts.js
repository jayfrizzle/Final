    // Testing variables.
var interval
  , variance
  , count
  , current  = 0
  
    // Monitoring variable.
  , stats = []
  
    // jQuery elements.
  , feed
  , post
 
  , loop = function () {
      stats.push([-1, Date.now() / 1000 | 0])

      feed.prepend(
        post.clone().attr({
          src: 'images/cat.jpg',
          //src: 'images/' + current + '.jpg',
          alt: 'Post #' + current + '!'
        })
      )
      
      current++
     
      if (current == count)
        return;

      // Work out actual variance
      var delta = (Math.random() * 2 - 1) * variance
      setTimeout(loop, interval + delta)
    }

$(function () {
  feed = $('#update-feed')
  post = $('<img>').addClass('update')
})

$.getJSON('http://127.0.0.1:3030', function (data) {
  count    = data.count
  interval = data.interval
  variance = data.variance
  
  $(loop)
})

// ---- Usage monitoring.

stats.push([1, Date.now() / 1000 | 0])

onfocus = function () { stats.push([1, Date.now() / 1000 | 0]) }
onblur  = function () { stats.push([0, Date.now() / 1000 | 0]) }

$(window).bind('beforeunload', function () {
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3030',
    data: { stats: JSON.stringify(stats) },
    async: false,
    traditional: true
  })
})
