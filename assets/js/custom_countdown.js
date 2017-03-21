/*------------------------------------------------------------------
Project:        Paperclip
Author:         Simpleqode.com
URL:            http://simpleqode.com/
                https://twitter.com/YevSim
                https://www.facebook.com/simpleqode
Version:        1.3.3
Created:        11/03/2014
Last change:    05/02/2016
-------------------------------------------------------------------*/

/**
 * Coming soon
 */

/* Initialize countdown */

$(function () {
  var austDay = new Date();
  austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
  $('#countdown').countdown({until: austDay});
  $('#year').text(austDay.getFullYear());
});