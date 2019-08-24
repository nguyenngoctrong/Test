import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subject, combineLatest } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Festival } from '../model/festival';
import { ActivatedRoute } from '@angular/router';
import { Identifiers } from '@angular/compiler';
import { Ticket, Hotel, Tour, Total } from '../model/ticket'
import {HomeService} from "../model/home.service"


declare var $: any;

@Component({
  selector: 'app-detail-festival',
  templateUrl: './detail-festival.component.html',
  styleUrls: ['./detail-festival.component.css']
})
export class DetailFestivalComponent implements OnInit {
  festivalList: Festival[];
  user: Observable<any>;
  a: string;
  listTicket: Ticket[];
  listHotel: Hotel[];
  listTour: Tour[];
  totalTicket: number;
  totalTour:number;
  totalHotel:number;
  typeroom:string="";
  startday:string;
  endday:string;
  Total: Total[];



  constructor(private afs: AngularFirestore,
    private route: ActivatedRoute,
    private cartService:HomeService
  ) {
    $('#titelofF').html(' explore festival');
    $('.nav-link').removeClass('activenav');
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
        $(this).addClass('animate-in');
      });
    });


  }

  ngOnInit() {

    
    this.a = localStorage.getItem("IdUser");
    this.cartService.loadcart(this.a);

    // this.totalHotel.Typeroom='Single room';

    this.Id();
  }
  Id() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.afs.collection("festival", ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', `${id}`)).snapshotChanges();
    this.user.subscribe(actionArray => {
      this.festivalList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,


          ...item.payload.doc.data()
        } as Festival;


      })
      console.log(this.festivalList)
    });






  }

  addTicket() {
    var Tam=0;
    for (let t of this.cartService.listTicket) {
      if (t.IdFestival == this.festivalList[0].id) {
        this.afs.collection("Cart").doc(`${this.a}`).collection("Ticket").doc(`${t.id}`).update({
          Amount: this.totalTicket + t.Amount

        })
        Tam=1;
        break;

      }

    }
    if(Tam==0){
      this.afs.collection("Cart").doc(`${this.a}`).collection("Ticket").add({
        Amount: this.totalTicket,
        IdFestival:this.festivalList[0].id,
        Money: 20,
        NameFestival:this.festivalList[0].Name
      })

    }

    this.afs.collection("Cart").doc(`${this.a}`).update({
      Total: this.cartService.Total[0].Total + this.totalTicket
    })
    alert("add successfull!");


  }

  addTour() {
    var Tam=0;
    for (let t of this.cartService.listTour) {
      if (t.IdFestival == this.festivalList[0].id) {
        this.afs.collection("Cart").doc(`${this.a}`).collection("Tour").doc(`${t.id}`).update({
          Amount: this.totalTour + t.Amount

        })
        Tam=1;
        break;

      }

    }
    if(Tam==0){
      this.afs.collection("Cart").doc(`${this.a}`).collection("Tour").add({
        Amount: this.totalTour,
        IdFestival:this.festivalList[0].id,
        Money: 20,
        NameFestival:this.festivalList[0].Name
      })

    }

    // this.afs.collection("Cart").doc(`${this.a}`).update({
    //   Total: this.cartService.Total[0].Total + this.totalTour
    // })
    alert("add successfull!");


  }
  addHotel() {
    var Tam=0;
    for (let t of this.cartService.listHotel) {
      if (t.IdFestival == this.festivalList[0].id) {
        this.afs.collection("Cart").doc(`${this.a}`).collection("Hotel").doc(`${t.id}`).update({
          Amount: this.totalHotel ,
          Typeroom:this.typeroom,
          Endday:this.endday,
          Startday:this.startday

        })
        this.afs.collection("Cart").doc(`${this.a}`).update({
          Total: this.cartService.Total[0].Total-t.Amount + this.totalHotel
        })
        Tam=1;
        break;

      }

    }
    if(Tam==0){
      this.afs.collection("Cart").doc(`${this.a}`).collection("Hotel").add({
        IdFestival:this.festivalList[0].id,

        NameFestival:this.festivalList[0].Name,

        Amount: this.totalHotel ,
        Typeroom:this.typeroom,
        Endday:this.endday,
        Startday:this.startday
      })
      this.afs.collection("Cart").doc(`${this.a}`).update({
        Total: this.cartService.Total[0].Total + this.totalHotel
      })
      alert("add successfull!");


    }

    


  }
  onChange($event){
     this.typeroom = $event.target.options[$event.target.options.selectedIndex].text;
    }
  

}
