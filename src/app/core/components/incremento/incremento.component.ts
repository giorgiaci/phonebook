import { Component, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-incremento',
  templateUrl: './incremento.component.html',
  styleUrls: ['./incremento.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: IncrementoComponent
    }
  ]
})
export class IncrementoComponent implements ControlValueAccessor {
  onChange:any;
  onTouched:any;
  disabled = false;

  writeValue(obj: any): void {
    this.quantity=obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  quantity = 0;
 
  onAdd() {
    this.quantity ++;
    this.onChange(this.quantity)
  }

  onRemove() {
    this.quantity --;
    this.onChange(this.quantity)
  }
}
