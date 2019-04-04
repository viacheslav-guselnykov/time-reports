import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

import {LastDaySummary} from "src/models/last.day.summary";
import {MemberTotal} from "src/models/member.total";

@Component({
	selector: 'cl-member-entries-for-day',
	templateUrl: `member.entries.for.day.component.html`,
  styleUrls: ['./member.entries.for.day.component.scss']
})
export class MemberEntriesForDayComponent implements OnInit, OnDestroy {

  @Input('summary')
  daySummary$: Observable<LastDaySummary>;

  day: string;

  membersSummary: Array<MemberTotal>;

  private destroy$: Subject<void> = new Subject();

	constructor() {}

	ngOnInit() {

	  this.daySummary$
      .pipe(takeUntil(this.destroy$))
      .subscribe((summary: LastDaySummary) => {
        this.day = this.toDayString(summary.day);
        this.membersSummary = summary.membersTotal;
      });

	}

	ngOnDestroy() {
	  this.destroy$.next();
	  this.destroy$.complete();
  }

  private toDayString(day: Date): string {
    if (!day)
      return '';

    return day.toLocaleDateString('en', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

}
