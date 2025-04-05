import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'input-reusable',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: `./input-reusable.component.html`,
  styleUrl: './input-reusable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor{

  @Input() inputType:string ='text';
  @Input() placeholder:string ='Enter value for field';
  @Input({required:true}) labelText: string = '';
  @Input({required:true}) labelFor: string= ''

  constructor(private cdr: ChangeDetectorRef) {}

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

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
  }

  registerOnTouched(fn: () => void): void { 
    this.onTouched = fn;
  }
}
