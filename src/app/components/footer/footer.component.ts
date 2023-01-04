import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  public faFacebook = faFacebookF;
  public faInstagram = faInstagram;
  constructor() { }

  ngOnInit() { }

}
