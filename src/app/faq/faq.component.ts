import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

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
