import {Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item.service';
import {Item} from '../../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;


  constructor(private itemService: ItemService) { }

  ngOnInit() {
    console.log('ngOnInit runs!');
    this.itemService.getItems().subscribe(items => {
      // console.log(items);
      this.items = items;
    });
    this.itemService.getItems();
  }

  deleteItem(event, item) {
    // dies ist nur nötig wegen toggle, damit es keinen Fehler gibt
    this.clearState();

    this.itemService.deleteItem(item);

  }

  editItem(event, item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }

}
