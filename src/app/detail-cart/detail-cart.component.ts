import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Festival } from '../model/festival';
import { Ticket, Hotel, Tour, Total } from '../model/ticket'
import{Location} from "@angular/common"




@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.css']
})
export class DetailCartComponent implements OnInit {
  festivalList:Festival[];
  festival:Observable<any>;
  cartList:Observable<any>;
  listTicket: Ticket[];
  listHotel: Hotel[];
  listTour: Tour[];

  id;
  idC;
  type;


  constructor(    private route: ActivatedRoute,private afs: AngularFirestore,private location: Location

    ) { }

  ngOnInit() {
   
    // console.log(id);
    // console.log(idC);
    // console.log(type);
    // window.location.reload();
    this.getdataDetail();




  }

  getdataDetail(){
    console.log(window.location.href)
    var a = localStorage.getItem("IdUser");

     this.id = this.route.snapshot.paramMap.get('id');
     this.idC = this.route.snapshot.paramMap.get('idC');
    this.type = this.route.snapshot.paramMap.get('type');
    
    this.festival=this.afs.collection("festival",ref=>ref.where(firebase.firestore.FieldPath.documentId(), '==', `${this.id}`)).snapshotChanges();
    this.festival.subscribe(actionArray => {
      this.festivalList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,


          ...item.payload.doc.data()
        } as Festival;


      })
      console.log(this.festivalList)
    });
    this.cartList=this.afs.collection("Cart").doc(`${a}`).collection(`${this.type}`,ref=>ref.where(firebase.firestore.FieldPath.documentId(), '==', `${this.idC}`)).snapshotChanges();

    if(this.type=="Ticket"){
      this.cartList.subscribe(actionArray => {
      this.listTicket = actionArray.map(item => {
        return {
          id: item.payload.doc.id,


          ...item.payload.doc.data()
        } as Ticket;


      })
    });

    }else if(this.type=="Tour"){
      this.cartList.subscribe(actionArray => {
      this.listTour = actionArray.map(item => {
        return {
          id: item.payload.doc.id,


          ...item.payload.doc.data()
        } as Tour;


      })
    });

    }else{
      this.cartList.subscribe(actionArray => {
      this.listHotel = actionArray.map(item => {
        return {
          id: item.payload.doc.id,


          ...item.payload.doc.data()
        } as Hotel;


      })
    });

    }



  }
  


}
