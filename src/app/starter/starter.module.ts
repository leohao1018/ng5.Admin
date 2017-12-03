import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StarterComponent} from './starter.component';
import {StarterHeaderComponent} from './starter-header/starter-header.component';
import {StarterLeftSideComponent} from './starter-left-side/starter-left-side.component';
import {StarterContentComponent} from './starter-content/starter-content.component';
import {StarterFooterComponent} from './starter-footer/starter-footer.component';
import {StarterControlSidebarComponent} from './starter-control-sidebar/starter-control-sidebar.component';

import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';

import {StarterRoutingModule} from './starter-routing/starter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StarterRoutingModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rotatingPlane,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#74f3ff',
      secondaryColour: '#b58dff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,

    })
  ],
  declarations: [
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
  ],
  exports: [StarterComponent]
})
export class StarterModule {
}
