/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';

import { MfMaskModule }  from '../dist';

@Component({
  selector: 'app',
  templateUrl: './app.html',
})
class AppComponent {
  public ngModel: string = '(555) 382-2396';

  constructor() {
  }
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, FormsModule, MfMaskModule.forRoot() ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
