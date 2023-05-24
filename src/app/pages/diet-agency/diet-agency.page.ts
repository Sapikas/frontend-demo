import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { MainService } from 'src/app/state/mainState/main.service';

@Component({
  selector: 'app-diet-agency',
  templateUrl: './diet-agency.page.html',
  styleUrls: ['./diet-agency.page.scss'],
})
export class DietAgencyPage implements OnInit {
  isReviewSidebar: boolean = false;

  constructor(
    private mainService: MainService, 
    private router: Router,
    private sharedSercice: SharedService) { }

  ngOnInit() {
    const url = this.router.url;
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    if (lastSegment) {
      this.mainService.getDietAgency(lastSegment).subscribe(res => {
        console.log(res);
    });
    }
  }

  openReviewSidebar() {
    this.isReviewSidebar = true;
    this.sharedSercice.isGeneralSidebarOpenSubject.next(true);
  }
}
