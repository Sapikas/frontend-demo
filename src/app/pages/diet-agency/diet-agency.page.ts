import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEnvelope, faPhone, faLocation, faStar } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/services/shared.service';
import { MainQuery } from 'src/app/state/mainState/main.query';
import { MainService } from 'src/app/state/mainState/main.service';

@Component({
  selector: 'app-diet-agency',
  templateUrl: './diet-agency.page.html',
  styleUrls: ['./diet-agency.page.scss'],
})
export class DietAgencyPage implements OnInit, OnDestroy {
  faEnvelope = faEnvelope
  faPhone = faPhone;
  faLocation = faLocation;
  faStar = faStar
  isReviewSidebar: boolean = false;

  constructor(private sharedSercice: SharedService, private mainService: MainService, private mainQuery: MainQuery) { }

  ngOnInit() {
    const productId = localStorage.getItem('productId');
    if (productId) {
      this.mainService.getDietAgency(productId).subscribe(res => {
      console.log(res);
    });
    }
  }

  openReviewSidebar() {
    this.isReviewSidebar = true;
    this.sharedSercice.isGeneralSidebarOpenSubject.next(true);
  }

  ngOnDestroy() {
    localStorage.removeItem('productId');
  }
}
