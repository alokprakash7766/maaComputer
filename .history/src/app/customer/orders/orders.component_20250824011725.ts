import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<any[]> | undefined;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.orders$ = this.firestore.collection('orders').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;

          // Agar order me image path hai, toh storage se URL nikale
          if (data.imagePath) {
            return this.storage.ref(data.imagePath).getDownloadURL().pipe(
              map(url => ({
                id,
                ...data,
                imageUrl: url
              }))
            );
          } else {
            return new Observable<any>(observer => {
              observer.next({ id, ...data, imageUrl: null });
              observer.complete();
            });
          }
        })
      ),
      switchMap(obsArray => {
        return obsArray.length ? (obsArray as any[]).reduce((acc, curr) =>
          acc.pipe(
            switchMap(accRes =>
              curr.pipe(
                map(currRes => [...accRes, currRes])
              )
            )
          )
        , new Observable<any[]>(observer => { observer.next([]); observer.complete(); }))
        : new Observable<any[]>(observer => { observer.next([]); observer.complete(); });
      })
    );
  }
}
