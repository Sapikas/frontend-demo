import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-general-sidebar',
  templateUrl: './general-sidebar.component.html',
  styleUrls: ['./general-sidebar.component.scss'],
})
export class GeneralSidebarComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {}

  closeSidebar() {
    this.sharedService.isGeneralSidebarOpenSubject.next(false);
  }

}
