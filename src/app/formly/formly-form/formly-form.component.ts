import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-form',
  templateUrl: './formly-form.component.html',
  styleUrls: ['./formly-form.component.scss'],
})
export class FormlyFormComponent implements AfterViewInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() schema: any =  {
    "type": "object", 
    "title": "Example Form",  
    "required": [ "firstName", "lastName", "email", "password"],
    "widget": { "formlyConfig": { "validators": { "validation": ["fieldMatch", "email"] } } }, 
    "properties": {
      "firstName":   { "type": "string",   "title": "First Name", "minLength": 3, "maxLength": 30 }, // "widget": { "formlyConfig": { "className": "flex flex-col w-1/2" } } 
      "lastName":    { "type": "string",   "title": "Last Name", "minLength": 3, "maxLength": 30 }, 
      "email": { "type": "string",   "title": "Email", "minLength": 3, "maxLength": 30 },
      "password": { "type": "string",   "title": "Password", "minLength": 3, "maxLength": 30 },
      "passwordConfirm": { "type": "string",   "title": "Confirm Password", "minLength": 3, "maxLength": 30 },
      // "about":       { "type": "textarea", "title": "About you", "description": "Tell us about you" },
      // "hobbies":     { "type": "array",    "title": "List of Hobbies", "items": { "type": "string" } },
      // "age":         { "type": "integer",  "title": "Age", "minimum": 1, "maximum": 120 },
      // "height":      { "type": "number",   "title": "Height (multiple of .5)", "multipleOf": 0.5 },     
      // "role":        { "type": "string",   "title": "Current Role", "enum": [ 'Admin', 'Editor', 'Finance' ] },
      // "departement": { "type": "number",   "title": "Departement", "enum": [ 1, 2, 3, 88, 90 ] }, 
      // "colors":      { "type": "array",    "title": "Colors (Multi Select)", "items": { "type": "string", "enum": [ "Red", "Green", "Blue", "Purple" ] } },
      // "birthday":    { "type": "date",     "title": "Birthday", "widget": { "formlyConfig": { "className": "flex flex-col w-1/5" } } },
      // "gender":      { "type": "string",     "title": "Gender", "enum": [ "Male", "Female", "Other" ], "widget": { "formlyConfig": { "type": "radio" } } },
      // "agreeTerms":  { "type": "string",     "title": "Agree Terms", "widget": { "formlyConfig": { "type": "checkbox" } } },
      // "checkboxes":  { "type": "checkboxes", "title": "Checkboxes", "enum": [ "Male", "Female", "Other" ], "widget": { "formlyConfig": { "type": "checkboxes" } } }
    }
  };
  @Input() model: any = {};
  @Output() submitFormEvent: EventEmitter<any> = new EventEmitter<any>(undefined)
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    public formlyJsonschema: FormlyJsonschema,
  ) {}

  ngAfterViewInit(): void {
    this.fields = [this.formlyJsonschema.toFieldConfig(this.schema)];
  }


  submit() {
    this.submitFormEvent.emit(this.model);
    // alert(JSON.stringify(this.model));
  }

}
