import { downgradeToAJSComponent } from '../../../ajs/upgrade-utilities/angularjs-utils';
import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-cli-dual-boot-upgrade';
}


downgradeToAJSComponent(
  'appAngularComponent',
  {
    component: AppComponent
  },
  'components-module'
)
