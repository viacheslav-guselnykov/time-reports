import { Injectable } from '@angular/core';
import {Observable, of, ReplaySubject} from "rxjs";

@Injectable()
export class GoogleChartService {

  private readonly libraryPath = 'https://www.gstatic.com/charts/loader.js';

  private libraryLoaded$: ReplaySubject<void> = new ReplaySubject();

	constructor() {}

	init(): Observable<void> {

	  if (!this.checkIfLibraryAlreadyLoaded()) {
      this.loadLibrary();
    }

	  return this.libraryLoaded$.asObservable();

  }

  private loadLibrary(): void {
    const headElem = document.getElementsByTagName('head')[0];

    const libraryScript = document.createElement('script');
    libraryScript.type = 'text/javascript';
    libraryScript.src = this.libraryPath;
    libraryScript.onload = () => {
      this.libraryLoaded$.next();
      this.libraryLoaded$.complete();
    };

    headElem.appendChild(libraryScript);
  }

  private checkIfLibraryAlreadyLoaded(): boolean {
    const libraryScriptElem = document.head.querySelector(`script[src='${this.libraryPath}']`);
    return !!libraryScriptElem;
  }

}
