import { Directive, ElementRef, inject, input, OnInit, Renderer2, } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormError]',
  standalone: true
})
export class FormError implements OnInit {
  private control = inject(NgControl,{self:true});
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  messages = input<Record<string, string>>({});
  private errorDiv!: HTMLElement;
  ngOnInit() {
    this.errorDiv = this.renderer.createElement('div');
    this.renderer.setStyle(this.errorDiv, 'color', '#dc2626');
    this.renderer.setStyle(this.errorDiv, 'font-size', '13px');
    this.renderer.setStyle(this.errorDiv, 'margin-top', '4px');
    this.renderer.appendChild(
      this.el.nativeElement.parentElement,
      this.errorDiv
    );
    const ctrl = this.control.control;
    if (!ctrl) return;
    ctrl.events.subscribe(() => this.showError());
    this.showError();
  }
  private showError() {
    const ctrl = this.control.control;
      console.log('errors:', ctrl?.errors);
    if (!ctrl || !ctrl.touched || !ctrl.errors) {
      this.renderer.setProperty(this.errorDiv, 'innerText', '');
      return;
    }
    const msgs = this.messages();
    const firstError = Object.keys(ctrl.errors)[0];
    this.renderer.setProperty(
      this.errorDiv,
      'innerText',
      msgs[firstError] || 'Invalid field'
    );
   
  }
}
