import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Item} from '../models/item';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // for add items, and get id from collection with snapshotChanges
  itemsCollection: AngularFirestoreCollection<Item>;
  // for get items
  items: Observable<Item[]>;
  // for delete items
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) {

    // add item
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc'));

    // get documents with no id
    // this.items = this.afs.collection('items').valueChanges();

    // get documents with id
    // this.items = this.afs.collection('items').snapshotChanges().pipe(map(changes => {
    this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}

