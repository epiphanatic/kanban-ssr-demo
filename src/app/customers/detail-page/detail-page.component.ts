import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
// import { tap } from 'rxjs/operators';
import { SeoService } from 'src/app/services/seo.service';
import { CustomerDataService } from '../customer-data.service';
import { Observable } from 'rxjs';
import { ExternalDbSsrService } from 'src/app/services/external-db-ssr.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  customerId: string;
  // customer: Observable<any>;
  public customer: { id: string, name: string, bio: string, image: string };

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private seo: SeoService,
    public data: CustomerDataService,
    private externalTaskService: ExternalDbSsrService
  ) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.getCustomer(this.customerId);
    // this.customer = this.db
    //   .collection('customers')
    //   .doc<any>(customerId)
    //   .valueChanges()
    // this.customer = this.data.getCustomer(this.customerId)
    //   .pipe(
    //     tap(cust =>
    //       this.seo.generateTags({
    //         title: cust.name,
    //         description: cust.bio,
    //         image: cust.image,
    //       })
    //     )
    //   );
  }

  async getCustomer(id: string) {

    // const x = await this.data.getCustomer(id);
    const x = await this.externalTaskService.doTask(this.data.getCustomer(id)).toPromise();
    // const name: string = x.data().name;
    // const bio = x.data().bio;
    // const image = x.data().image;
    const cust = { id: x.id, name: x.data().name, bio: x.data().bio, image: x.data().image };
    this.customer = cust;
    this.seo.generateTags({
      title: cust.name,
      description: cust.bio,
      image: cust.image,
    });


  }
}
