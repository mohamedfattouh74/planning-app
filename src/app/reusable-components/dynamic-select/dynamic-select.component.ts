import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrl: './dynamic-select.component.scss',
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DynamicSelectComponent,
      multi: true,
    },
  ],
})
export class DynamicSelectComponent implements ControlValueAccessor { 

  constructor(private cdr: ChangeDetectorRef) {}

  @Input({ required: true }) options: string[] = [];
  @Input({required:true}) labelText: string = '';
  @Input({required:true}) labelFor: string= ''
  @Output() selectedChange = new EventEmitter<string>();

  selectedValue: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string | null): void {
    this.selectedValue = value ?? '';
    this.cdr.markForCheck();
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void { 
    this.onTouched = fn;
  }
  
  onValueChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    this.onChange(this.selectedValue);
    this.selectedChange.emit(this.selectedValue);
  }
}
