import { Component, OnInit } from '@angular/core';


declare var $: any;


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})

export class AboutusComponent implements OnInit {

  constructor() {
    $('#titelofF').html('Our information');
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
