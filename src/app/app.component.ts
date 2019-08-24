import { Component, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User } from '../app/model/user.model'
import { NgForm } from '@angular/forms'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import{FirebaseApp}from "@angular/fire"
import * as firebase from 'firebase';
import{Total,Hotel,Ticket,Tour}from "./model/ticket"
import{HomeService}from "./model/home.service"
import { from } from 'types/rxjs';


declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'DoAnThuatToan';
  user: Observable<any>;
  cart: Observable<any>;

  userlection: AngularFirestoreCollection<any>;
  userTam: User[];
  username: String = "";
  password: String = "";
  notification: String = "";
  newpassword:string;
  confirmpassword:string;
  oldPassword:string;

  listTicket: Ticket[];
  listHotel: Hotel[];
  listTour: Tour[];
  Total: Total[];


  startAt = new Subject();
  endAt = new Subject();
  clubs;
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  su: User = new User();
  confirm: String = '';
  cc: boolean = false;
  a:string;
  constructor(private afs: AngularFirestore,private cartService:HomeService
    ) {
  


  }


  ngOnInit() {
 
    this.a = localStorage.getItem("IdUser")
   
    console.log(this.a);


    if (this.a != '') {

      this.Id(this.a);
      this.cartService.loadcart(this.a);



    }

    $(".email-signup").hide();
    $("#signup-box-link").click(function () {
      $(".email-login").fadeOut(100);
      $(".email-signup").delay(100).fadeIn(100);
      $("#login-box-link").removeClass("active");
      $("#signup-box-link").addClass("active");
    });
    $("#login-box-link").click(function () {
      $(".email-login").delay(100).fadeIn(100);
      $(".email-signup").fadeOut(100);
      $("#login-box-link").addClass("active");
      $("#signup-box-link").removeClass("active");

    });

    $('.input').keyup(function () {
      $('.wr1').html('');
      $('.wr2').html('');
      $('.wr3').html('');
      $('.wr4').html('');
      $('.wr5 ').html('');
    });

    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((clubs) => {
        this.clubs = clubs;
      })
    })
  }
 
  Id( key:string) {
  
    var user;
    var b:User;
    user = this.afs.collection("User",ref=>ref.where(firebase.firestore.FieldPath.documentId(),'==',`${key}`)).snapshotChanges();
    user.subscribe(actionArray => {
      this.userTam = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            

            ...item.payload.doc.data()
          } as User;
        
       
      })
      b=this.userTam[0];
      console.log(b);
      $('#UserLo').css('display', 'block');
      $('.user').html('Hello: ' + b.Fullname);
      $('#login').css('display', 'none');
    });
    
 




  }
  changepassword(){
if(this.oldPassword!=this.userTam[0].Password){
  this.notification="oldpassword incorrect";
}else if(this.newpassword != this.confirmpassword){
     this.notification="confir mpassword incorrect";
    }else{
      this.afs.collection("User").doc(`${this.a}`).update({
        Password:this.newpassword
        
      })
      this.notification="change password successfull";


    }

  
  }

  Email() {
    let uu: Observable<any>;
    uu = this.afs.collection("User", ref => ref.where("Email", "==", `${this.su.Email}`)).snapshotChanges();

    return uu;
  }
  Username() {
    let uu: Observable<any>;

    uu = this.afs.collection("User", ref => ref.where("Username", "==", `${this.su.Username}`)).snapshotChanges();

    return uu;
  }
  login() {
    this.user = this.afs.collection("User", ref => ref.where("Username", "==", `${this.username}`).where("Password", "==", `${this.password}`)).snapshotChanges();
    return this.user;
  }
  check() {
    this.Username().subscribe(actionArray1 => {
      var checkUserNmae: User[];
      var checkEmail: User[];
      checkUserNmae = actionArray1;



      this.Email().subscribe(actionArray2 => {
        checkEmail = actionArray2;
        console.log(checkUserNmae.length);
        console.log(checkEmail.length);

        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // let found = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;


        if (this.su.Username == '') {
          $('.wr1').html('Can not be empty!');
          return;
        }

        if (this.su.Password == '') {
          $('.wr3').html('Can not be empty!');
          return;

        }
        if (this.su.Email == '') {

          $('.wr2').html('Can not be empty!');
          return;
        }

        if (this.su.Sdt.search(/^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/) <= -1) {
          $('.wr5').html('incorrect sample!');

          return;

        }

        if (!filter.test(this.su.Email)) {
          $('.wr2').html('Invalid email!');
          return;
        }
        if (this.confirm == '') {

          $('.wr4').html('Can not be empty!');
          return;
        }


        if (checkUserNmae.length != 0) {
          $('.wr1').html('Already exist!');

          return;


        }
        if (checkEmail.length != 0) {
          $('.wr1').html('Already exist!');

          return;


        }
        if (this.su.Password == this.confirm) {
          this.afs.collection("User").add({
            Address: '',
            Avatar: '',
            Birthday: '',
            Email: this.su.Email,
            Fullname: '',
            Password: this.su.Password,
            Sdt: this.su.Sdt,
            Username: this.su.Username,
            IdCart: ''

          })
          alert('Sign Up Success');


        } else {
          $('.wr4').html('Confirm password incorrectly!');
          return;
        }


        //////////////

      });

    });

  }


  
  cheklogin() {
    this.login().subscribe(actionArray => {
      this.userTam = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as User;
      })

      if (this.userTam.length == 0) {
        this.notification = "Login unsuccssecfull"
      } else {
        this.notification = "Login succssecfull"

        localStorage.setItem('IdUser', `${this.userTam[0].id}`);
        if(this.userTam[0].IdCart==''){
          this.afs.collection("Cart").doc(`${this.userTam[0].id}`).set({
            Total:0,
          });
          
          // this.afs.collection("Cart").doc(`${this.userTam[0].id}`).collection("Ticket").add({

          // });
          // this.afs.collection("Cart").doc(`${this.userTam[0].id}`).collection("Hotel").add({

          // });
          // this.afs.collection("Cart").doc(`${this.userTam[0].id}`).collection("Tour").add({

          // });
          this.afs.collection("User").doc(`${this.userTam[0].id}`).update({
            IdCart:this.userTam[0].id
          })
         
          
        }


      }

    });



  }
  logout() {
    localStorage.setItem('IdUser', "");
  }
  search($event) {
    let q = $event.target.value;
    if (q != '') {
      $(".cardH").css('display', 'block');
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      $(".cardH").css('display', 'none');

    }
  }
  firequery(start, end) {
    return this.afs.collection('festival', ref => ref.limit(4).orderBy('Name').startAt(start).endAt(end)).valueChanges();
  }

  deleteCart(a:string,b:string,amount:number){
    this.afs.collection("Cart").doc(`${this.a}`).collection(`${a}`).doc(`${b}`).delete();
    this.afs.collection("Cart").doc(`${this.a}`).update({
      Total: this.cartService.Total[0].Total-amount
    })

  }

  test(){
  
  var a:Ticket[];
  a=this.cartService.listTicket;
  console.log(a[0]);
  }
  


}

