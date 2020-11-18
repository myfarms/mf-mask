import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MfMaskDirective } from './mf-mask.directive';
import { IConfig, initialConfig, MFMASK_CONFIG } from './config';

export { MfMaskDirective } from './mf-mask.directive';
export { IConfig } from './config';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MfMaskDirective,
  ],
  exports: [
    MfMaskDirective,
  ]
})
export class MfMaskModule {
  public static forRoot(
    config?: Partial<IConfig>
  ): ModuleWithProviders<MfMaskModule> {
    return {
      ngModule: MfMaskModule,
      providers: [
        {
          provide: MFMASK_CONFIG,
          useValue: { ...initialConfig, ...config }
        }
      ]
    };
  }
}
