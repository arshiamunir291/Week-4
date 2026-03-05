import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [CommonModule],
  templateUrl: './form-error.html',
  styleUrl: './form-error.css',
})
export class FormError {
  control = input<AbstractControl | null>(null);
  messages = input<Record<string, string>>({});
  get error(): string | null {
    const ctrl = this.control();
    const msgs = this.messages();

    if (!ctrl || !(ctrl.touched || ctrl.dirty) || !ctrl.errors) {
      return null;
    }

    for (const Key of Object.keys(ctrl.errors)) {
      if (msgs[Key]) {
        return msgs[Key];
      }
    }

    return null;
  }
}
