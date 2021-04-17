import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.css']
})
export class HobbyComponent implements OnInit {

  hobbyFormGroup: FormGroup;
  @Input()hobby: any;
  @Output()onChange = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) {
  }

  setValue() {
    this.hobby = this.hobbyFormGroup.get('name').value;
    console.log(this.hobbyFormGroup.get('name').value);
    this.onChange.emit(this.hobby);
    console.log(this.hobby);
  }

  deleteValue(e: string) {
    this.hobbyFormGroup.get(e).reset();
  }

  ngOnInit(): void {
    this.hobbyFormGroup = this._formBuilder.group({
      name:  [this.hobby, [Validators.required]],
    });
  }

}
