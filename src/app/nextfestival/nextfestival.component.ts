import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Festival } from '../model/festival';
import { Observable } from 'rxjs';


declare var $:any;

@Component({
  selector: 'app-nextfestival',
  templateUrl: './nextfestival.component.html',
  styleUrls: ['./nextfestival.component.css']
})
export class NextfestivalComponent implements OnInit {
  festivalList: Festival[];
  nf:Observable<any[]>;


  constructor(private afs: AngularFirestore) {
    $('#titelofF').html(' Enjoy');
    $('.nav-link').removeClass('activenav');
    $('.nextfestivalff').addClass('activenav');
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
          $(this).addClass('animate-in');
      });
  });


   }

  ngOnInit() {
    this.getdata();
  }
  getdata(){
    var a= new Date();
    var month = a.getMonth()+1;
    console.log(month)
   this.nf= this.afs.collection("festival",ref =>ref.where("Month",">=",month)).snapshotChanges();
   this.nf.subscribe(actionArray => {
    this.festivalList = actionArray.map(item => {
      return {
        id: item.payload.doc.id,
        ...item.payload.doc.data()
      } as Festival;
    })
    console.log(this.festivalList)

  });


  }

}
