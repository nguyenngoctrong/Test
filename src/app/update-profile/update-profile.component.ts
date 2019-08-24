import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { User } from '../model/user.model';
import { Observable, Subject, combineLatest } from "rxjs";
import * as firebase from 'firebase';


declare var $: any;


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  user: Observable<any>;
  userTam: User[];
  USER:User;
  a:string;
  n:string="";




  constructor(private afs: AngularFirestore) { 
    $('#titelofF').html('Your information');
    $('.nav-link').removeClass('activenav');
    $('.userff').addClass('activenav');

    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
          $(this).addClass('animate-in');
      });
  });

  }

  ngOnInit() {
    this.a = localStorage.getItem("IdUser");
    this.Id(this.a);

  }

  Id( key:string) {
  
  
    this.user = this.afs.collection("User",ref=>ref.where(firebase.firestore.FieldPath.documentId(),'==',`${key}`)).snapshotChanges();
    this.user.subscribe(actionArray => {
      this.userTam = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            

            ...item.payload.doc.data()
          } as User;
        
       
      })
      
    });
    
 




  }
  mychange($event){
    let a= $event.target.value;
    var filename=a.split('\\').pop();
   this.userTam[0].Avatar='assets/images/Avatar/'+filename;
  }
  update(){
this.afs.collection("User").doc(`${this.a}`).update({
  Address:this.userTam[0].Address,
  Avatar:this.userTam[0].Avatar,
  Birthday:this.userTam[0].Birthday,
  Fullname:this.userTam[0].Fullname,
  Sdt:this.userTam[0].Sdt,

})
alert("update susscessful");
  }
}
