import { Component, OnDestroy, OnInit } from '@angular/core';
import { DietAgency } from 'src/app/models/diet-agency';
import { MainService } from 'src/app/state/mainState/main.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  dietAgencies: DietAgency[] = [];
  agencyText: string;
  dietAgenciesSub: Subscription;

  constructor(
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dietAgenciesSub = this.mainService.getDietAgencies().subscribe((res) => {
      this.dietAgencies = res.data;
    });
  }

  ionViewWillEnter() {
    if (this.dietAgencies.length !== 0) {
      this.agencyText = 'Διαιοτολογικά Γραφεία';
    } else {
      this.agencyText = 'Δεν υπάρχουν Διαιοτολογικά Γραφεία';
    }
  }

  onDietAgency(name: string) {
    this.router.navigate(['/agency', name]);
  }

  ngOnDestroy() {
    this.dietAgenciesSub.unsubscribe();
  }

}
