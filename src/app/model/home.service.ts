import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { stringify } from '@angular/core/src/util';
import {Festival}from "../model/festival"
import { Ticket, Hotel, Tour, Total } from '../model/ticket'
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  festival:Observable<any[]>
  cart: Observable<any>;
  listTicket: Ticket[];
  listHotel: Hotel[];
  listTour: Tour[];
  Total: Total[];
  a:string;

  
  

  constructor(private afs:AngularFirestore) { }
  
  
  prodcolection:AngularFirestoreCollection<any>=this.afs.collection("festival",ref =>ref.orderBy('Name').limit(6));

 

  getData(){
    this.festival=this.prodcolection.snapshotChanges();
    console.log( 1);
    return this.festival;
  }
  nextData( ff:String){
  
    this.festival=this.afs.collection("festival",ref=>ref.orderBy('Name').startAfter(ff).limit(6)).snapshotChanges();
    return this.festival;
  
  }
  loadcart(a:string) {
    this.cart = this.afs.collection("Cart").doc(`${a}`).collection('Ticket').snapshotChanges();
    this.cart.subscribe(actionArray => {
      this.listTicket = actionArray.map(item => {
        return {
          id: item.payload.doc.id,


          ...item.payload.doc.data()
        } as Ticket;
      })
      console.log(this.listTicket);

    });

    this.cart = this.afs.collection("Cart").doc(`${a}`).collection('Hotel').snapshotChanges();
    this.cart.subscribe(actionArray => {
      this.listHotel = actionArray.map(item => {
        return {
          id: item.payload.doc.id,


          ...item.payload.doc.data()
        } as Hotel;
      })
      console.log(this.listHotel);
    });
    this.cart = this.afs.collection("Cart").doc(`${a}`).collection('Tour').snapshotChanges();
    this.cart.subscribe(actionArray => {
      this.listTour = actionArray.map(item => {
        return {
          id: item.payload.doc.id,


          ...item.payload.doc.data()
        } as Tour;
      })
      console.log(this.listTour);

    });
    var n: Observable<any>;
    n = this.afs.collection('Cart', ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', `${a}`)).snapshotChanges();
    n.subscribe(actionArray => {
      this.Total = actionArray.map(item => {
        return {
          ...item.payload.doc.data()
        } as Total;


      })
      console.log(this.Total);

    });


  }
  
}
