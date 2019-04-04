import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: 'cl-date-picker',
	templateUrl: `date.picker.component.html`
})
export class DatePickerComponent implements OnInit {

  formGroup: FormGroup = this.formBuilder.group({
    sprintStartDate: null
  });

  @Output()
  valueChange: EventEmitter<Date> = new EventEmitter<Date>();

	constructor(private formBuilder: FormBuilder) {

	}

	ngOnInit() {
    this.formGroup.get('sprintStartDate').valueChanges
      .subscribe((sprintStartDate: Date) => this.valueChange.emit(new Date(sprintStartDate)));
	}


}
