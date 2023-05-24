import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { removeSidebar } from 'src/app/shared/general.utils';

@Component({
  selector: 'app-general-sidebar',
  templateUrl: './general-sidebar.component.html',
  styleUrls: ['./general-sidebar.component.scss'],
})
export class GeneralSidebarComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {}

  closeSidebar() {
    const element = removeSidebar();
    element?.addEventListener('animationend', () => {
      this.sharedService.isGeneralSidebarOpenSubject.next(false);
    });
  }

}
