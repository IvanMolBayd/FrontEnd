import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../toast-service';

@Component({
    selector: 'app-toasts',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div *ngFor="let toast of toastService.toasts()" 
           class="toast show align-items-center text-white border-0 mb-2"
           [ngClass]="{
             'bg-success': toast.type === 'success',
             'bg-danger': toast.type === 'error',
             'bg-warning': toast.type === 'warning',
             'bg-info': toast.type === 'info'
           }"
           role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                  (click)="toastService.remove(toast.id)" aria-label="Close"></button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .toast-container { z-index: 1100; }
  `]
})
export class ToastComponent {
    toastService = inject(ToastService);
}
