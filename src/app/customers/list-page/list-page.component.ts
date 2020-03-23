import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CustomerDataService } from '../customer-data.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  customers;

  constructor(private seo: SeoService, private db: AngularFirestore, public data: CustomerDataService) { }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Customer List',
      description: 'A list filled with customers',
      image: 'https://ecommerceinsiders.com/wp-content/uploads/2017/06/NewCustomers-blog.jpg'
    });

    this.customers = this.db.collection('customers-portobello').valueChanges({ idField: 'id' });

    this.data.subscribeToCustomers();

  }
}
