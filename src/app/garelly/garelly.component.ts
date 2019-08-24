import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import{Garelly}from "../model/garelly";


import { PaginationService } from '../model/pagination.service';

declare var $:any;

@Component({
  selector: 'app-garelly',
  templateUrl: './garelly.component.html',
  styleUrls: ['./garelly.component.css']
})
export class GarellyComponent implements OnInit {


  gare:Observable<any[]>

  garelly:Garelly[];
  prodcolection:AngularFirestoreCollection<any>=this.afs.collection("garelly",ref =>ref.orderBy('Image').limit(6));


  a:number=1;
  constructor(private afs: AngularFirestore) {
    $('#titelofF').html(' nice picture');
    $('.nav-link').removeClass('activenav');
    $('.garellyff').addClass('activenav');
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
          $(this).addClass('animate-in');
      });
  });

   
  }
  ngOnInit() {
    this.GETDATA();

    
 
   }
   GETDATA(){
     this.gare=this.prodcolection.snapshotChanges();
    this.gare.subscribe(actionArray => {
      this.garelly = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Garelly;
      })

    });

  }
  nextpage() {
    console.log(this.garelly[this.garelly.length-1].Image)
    this.a +=1;
    this.gare=this.afs.collection("garelly",ref=>ref.orderBy('Image').startAfter(this.garelly[this.garelly.length-1].Image).limit(6)).snapshotChanges();
    this.gare.subscribe(actionArray => {
      this.garelly = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Garelly;
      })
      console.log(this.garelly)
      if(this.garelly.length==0){
        this.GETDATA();
        this.a=1;
      }
  

    });
    
  }
  

 
}