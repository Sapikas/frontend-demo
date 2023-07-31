import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core'; 

@Component({
  selector: 'formly-object-type',
  template: `
  <div class="mb-3">
    <legend class="text-center" *ngIf="props.label">{{ props.label }}</legend>
    <p *ngIf="props.description">{{ props.description }}</p>
    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" 
    *ngIf="showError && formControl.errors">
      <formly-validation-message [field]="field"></formly-validation-message>
    </div>
    <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>
  </div>
  `
})
export class ObjectTypeComponent extends FieldType {}
