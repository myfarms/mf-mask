import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Inject,
    Input,
    OnChanges,
    SimpleChanges,
  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IConfig, MFMASK_CONFIG } from './config';

@Directive({
selector: '[mfMask]',
providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MfMaskDirective),
    multi: true,
    },
],
})
export class MfMaskDirective implements ControlValueAccessor, OnChanges {
@Input()
public mfMask: string = '(999) 999-9999';

public onChange = (_: any) => {};
public onTouch = () => {};

public placeholderChar = '_';

private inputValue: string = '';

constructor(
    @Inject(MFMASK_CONFIG) private config: IConfig,
    private elementRef: ElementRef
) {}

public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mfMask) {
    if (changes.mfMask.currentValue in this.config.preparedMasks) {
        this.mfMask = this.config.preparedMasks[changes.mfMask.currentValue];
    }
    }
}

public ngOnInit(): void {
    this.applyMask();
}

@HostListener('input', ['$event'])
public onInput(input: InputEvent) {
    const el = input.target as HTMLInputElement;
    const oldSelectionStart = el.selectionStart;
    this.inputValue = el.value;
    this.applyMask();
    const keyPressed = input.data;
    let idx = el.value.indexOf(keyPressed, oldSelectionStart);
    if (idx < 0) {
    idx = oldSelectionStart;
    } else {
    idx++;
    }
    el.setSelectionRange(idx, idx);
}

writeValue(inputValue: string): void {
    if (!inputValue) {
    inputValue = '';
    return;
    }
    this.inputValue = inputValue;
    this.applyMask();
}
registerOnChange(fn: any): void {
    this.onChange = fn;
}
registerOnTouched(fn: any): void {
    this.onTouch = fn;
}
setDisabledState?(isDisabled: boolean): void {}

private applyMask() {
    const patterns = Object.values(this.config.patterns);
    let inputValue = '';
    let inputArray = this.inputValue.split('');
    for (let i = 0; i < inputArray.length; i++) {
    if (patterns.some((pattern) => pattern.test(inputArray[i]))) {
        inputValue += inputArray[i];
    }
    }
    inputArray = inputValue.split('');
    let maskCursor = 0;
    let newValue = '';
    for (let i = 0; i < inputArray.length; i++) {
    if (maskCursor === this.mfMask.length) {
        break;
    }
    const inputChar = inputArray[i];
    const maskPattern = this.mfMask[maskCursor];
    const patternRegex = this.config.patterns[maskPattern];
    if (patternRegex) {
        if (patternRegex.test(inputChar)) {
        newValue += inputChar;
        maskCursor++;
        } else {
        break;
        }
    } else if (inputChar === this.mfMask[maskCursor]) {
        newValue += inputChar;
        maskCursor++;
    } else {
        newValue += this.mfMask[maskCursor];
        maskCursor++;
        i--;
    }
    }
    for (let i = newValue.length - 1; i >= 0; i--) {
    const val = newValue.charAt(i);
    const maskPattern = this.mfMask[i];
    const patternRegex = this.config.patterns[maskPattern];
    if (patternRegex && patternRegex.test(val)) {
        break;
    } else {
        newValue = newValue.slice(0, newValue.length - 1);
    }
    }
    for (let i = newValue.length; i < this.mfMask.length; i++) {
    if (this.mfMask[i] === 'A' || this.mfMask[i] === '9') {
        newValue = newValue + this.placeholderChar;
    } else {
        newValue = newValue + this.mfMask[i];
    }
    }
    setTimeout(() => {
    this.onChange(newValue);
    });

    this.elementRef.nativeElement.value = newValue;
}
}
