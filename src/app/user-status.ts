import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appUserStatus]',
  standalone: true
})
export class UserStatusDirective implements OnChanges {

  @Input() appUserStatus: number | string = 0;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    const value = Number(this.appUserStatus);
    this.el.nativeElement.style.color = value === 1 ? 'green' : 'red';
    this.el.nativeElement.style.fontWeight = 'bold';
  }
}
