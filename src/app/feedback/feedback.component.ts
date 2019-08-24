import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor() {
    $('#titelofF').html('Frequently Asked Questions');
    $('.nav-link').removeClass('activenav');
    $('.contactff').addClass('activenav');
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
          $(this).addClass('animate-in');
      });
  });
   }

  ngOnInit() {
  }

}
