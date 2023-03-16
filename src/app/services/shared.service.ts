import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SharedService {
  public isSidebarOpenSubject = new Subject<boolean>();
  public isLoginModalOpenSubject = new Subject<boolean>();
  public isGeneralSidebarOpenSubject = new Subject<boolean>();

  constructor() {}

}