import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import{HomeService}from "../model/home.service"
import{Total,Hotel,Ticket,Tour}from "../model/ticket"


declare var $ :any;

@Component({
  selector: 'app-manager-cart',
  templateUrl: './manager-cart.component.html',
  styleUrls: ['./manager-cart.component.css']
})
export class ManagerCartComponent implements OnInit {

  a:string;
  
  listTicket: Ticket[];
  listHotel: Hotel[];
  listTour: Tour[];
  totalTicket:number
  totalTour:number
  totalHotel:number
  typeroom:string;

 

  constructor(private afs: AngularFirestore,private cartService:HomeService) { 
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
          $(this).addClass('animate-in');
      });
  });
  }

  ngOnInit() {
    this.a = localStorage.getItem("IdUser");
    this.listTicket=this.cartService.listTicket
    this.listTour=this.cartService.listTour
    this.listHotel=this.cartService.listHotel



  }
  deleteCart(a:string,b:string,amount:number){
    this.afs.collection("Cart").doc(`${this.a}`).collection(`${a}`).doc(`${b}`).delete();
    this.afs.collection("Cart").doc(`${this.a}`).update({
      Total: this.cartService.Total[0].Total-amount
    })

  }
  totalcart() :number{
    var tam:number=0;
    for(let t of this.cartService.listTicket){
      tam += t.Amount

    }
    for(let t of this.cartService.listTour){
      tam += t.Amount


    }
    for(let t of this.cartService.listHotel){
      tam += t.Amount


    }

    return tam;


  }

  updateTicket(id:string) {    
    for (let t of this.cartService.listTicket) {
      if (id == t.id) {
        this.afs.collection("Cart").doc(`${this.a}`).collection("Ticket").doc(`${t.id}`).update({
          Amount: t.Amount

        })
        break;

      }

    }
    this.afs.collection("Cart").doc(`${this.a}`).update({
      Total: this.totalcart()
    })
    alert("add successfull!");


  }
  updateTour(id:string) {    
    for (let t of this.cartService.listTour) {
      if (id == t.id) {
        this.afs.collection("Cart").doc(`${this.a}`).collection("Tour").doc(`${t.id}`).update({
          Amount: t.Amount

        })
        break;

      }

    }
    this.afs.collection("Cart").doc(`${this.a}`).update({
      Total: this.totalcart()
    })
    alert("add successfull!");


  }
  updateHotel(id:string) {    
    for (let t of this.cartService.listHotel) {
      if (id == t.id) {
        if(this.typeroom==""){
          this.typeroom=t.Typeroom;
        }
        this.afs.collection("Cart").doc(`${this.a}`).collection("Hotel").doc(`${t.id}`).update({
          Amount: t.Amount,
          Typeroom:this.typeroom,
          Startday:t.Startday,
          Endday:t.Endday


        })
        break;

      }

    }
    this.afs.collection("Cart").doc(`${this.a}`).update({
      Total: this.totalcart()
    })
    alert("add successfull!");


  }
  onChange($event){
    this.typeroom = $event.target.options[$event.target.options.selectedIndex].text;
   }


}
