import { Component, OnInit } from '@angular/core';
import { Festival } from '../model/festival';
import { HomeService } from '../model/home.service';
import { element } from '@angular/core/src/render3';
import { ToastrService } from "ngx-toastr"
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  festivalList: Festival[];
  a:number=1;
  constructor(private homeService: HomeService, private tostr: ToastrService,private afs:AngularFirestore) {
    $('#titelofF').html(' Explore Festivals');
    $('.nav-link').removeClass('activenav');
    $('.homeff').addClass('activenav');

    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
          $(this).addClass('animate-in');
      });
  });
 
        $(this).removeClass('animate-in');
  


  }


  ngOnInit() {
   this.GETDATA();


  }
  GETDATA(){
    this.homeService.getData().subscribe(actionArray => {
      this.festivalList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Festival;
      })
      console.log(this.festivalList)

    });

  }
  nextpage() {
    this.a +=1;
    this.homeService.nextData(this.festivalList[5].Name).subscribe(actionArray => {
      this.festivalList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Festival;
      })
      console.log(this.festivalList)
      if(this.festivalList.length==0){
        this.GETDATA();
        this.a=1;
      }
  

    });
    
  }

}
