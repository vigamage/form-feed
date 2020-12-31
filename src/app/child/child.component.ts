import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges {

  @Input() formDataFromParent: any;
  public dataForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this._initializeForm();
    this._setupListner();

  }

  _initializeForm() {

    this.dataForm = this._formBuilder.group({
      name: [this.formDataFromParent?.name, [Validators.required]],
      age: [this.formDataFromParent?.age, [Validators.required, Validators.min(10), Validators.max(50)]]
    });

  }

  _setupListner() {
    this.dataForm.statusChanges.pipe(filter(() => this.dataForm.valid))
      .subscribe(() => alert('Form is valid'));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formDataFromParent) {
      this._initializeForm();
      this._setupListner();
    }
  }

}
