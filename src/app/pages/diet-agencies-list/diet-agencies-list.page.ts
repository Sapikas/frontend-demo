import { Component, OnDestroy, OnInit } from '@angular/core';
import { DietAgency } from 'src/app/models/diet-agency';
import { MainService } from 'src/app/state/mainState/main.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-diet-agencies-list',
  templateUrl: './diet-agencies-list.page.html',
  styleUrls: ['./diet-agencies-list.page.scss']
})
export class DietAgenciesListPage implements OnInit, OnDestroy {
  dietAgencies: DietAgency[] = [];
  agencyText: string = '';
  initResults: DietAgency[] = [];
  isError: boolean = false;
  errorMessage: string = '';
  timeoutVar: any;
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
    this.initResults = this.dietAgencies;
  }

  onDietAgency(name: string) {
    this.router.navigate(['/agency', name]);
  }

  handleChange(event: any) {
    const inputText = event?.target?.value;
    console.log(inputText)
    clearTimeout(this.timeoutVar);
    this.isError = false;
    if (inputText.length === 0) {
      return;
    } else if (inputText.length >= 3) {
      this.mainService.searchDietAgencies(inputText).subscribe(res => {
        if (res.payload === 0) {
          this.errorMessage = 'Δεν υπάρχουν διαιτολογικά με αυτό το όνομα';
          this.isError = true;
          this.timeoutVar = setTimeout(() => {
            this.isError = false;
          }, 5000);
        } else {
          this.dietAgencies = res.payload;
        }
      });
    } else {
      this.dietAgencies = this.initResults;
      this.errorMessage = 'Χρειάζονται τουλάχιστον 3 γράμματα για να γίνει η αναζήτηση';
      this.isError = true;
      this.timeoutVar = setTimeout(() => {
        this.isError = false;
      }, 5000);
    }
  }

  clearSearchBar() {
    clearTimeout(this.timeoutVar);
    this.dietAgencies = this.initResults;
  }

  ngOnDestroy() {
    this.dietAgenciesSub.unsubscribe();
    clearTimeout(this.timeoutVar);
  }

}
