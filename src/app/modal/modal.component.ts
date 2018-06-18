import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

import { ModalAction } from './moda.interface.component';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  // tslint:disable:no-input-rename
  @Input('primary-action') primaryAction?: ModalAction;

  @Input('secondary-action') secondaryAction?: ModalAction;

  @Input('title') title: string;

  showModal = 'fade';

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
