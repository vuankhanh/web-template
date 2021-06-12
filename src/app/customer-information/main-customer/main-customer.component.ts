import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CustomerMenu, Menu } from 'src/app/mock-data/menu';

//Service
import { UrlChangeService } from 'src/app/services/url-change.service';

@Component({
  selector: 'app-main-customer',
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.scss']
})
export class MainCustomerComponent implements OnInit, OnDestroy {
  customerMenu: Array<Menu>;
  activeLink: string;
  currentUrl: string;

  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private urlChangeService: UrlChangeService
  ) {
    this.customerMenu = CustomerMenu;
    this.activeLink = this.router.url;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.urlChangeService.urlChange().subscribe((event: Event)=>{
        if(event instanceof NavigationStart) {
          this.activeLink = event.url;
        }
      })
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
