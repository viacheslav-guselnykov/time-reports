import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {TotalTimePipe} from "src/pipes/total.time.pipe";

const declarations = [
  TotalTimePipe
];

const providers = [
  TotalTimePipe
];

@NgModule({
	imports: [
		CommonModule
	],
	declarations: declarations,
	exports: declarations
})
export class CustomPipes {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomPipes,
      providers: providers
    };
  }

}
