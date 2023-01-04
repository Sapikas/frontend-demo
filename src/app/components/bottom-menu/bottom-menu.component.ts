import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faHouse, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomMenuComponent implements OnInit {
  public faUser = faUser;
  public faHouse = faHouse;
  public faList = faList;

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateTo(page: string) {
    this.router.navigate([page])
  }

}
