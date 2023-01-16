import { DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './feature/app-component/app.component';

// Fixes ivy aot compilation: https://github.com/angular/angular/issues/37102
const downgradedAppComponents: any[] = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    UpgradeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: []
})
export class AppModule implements DoBootstrap {
  static components = [...downgradedAppComponents];

  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['app-module'], { strictDi: true });
  }
}
