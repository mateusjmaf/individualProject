import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

import { ModalAction } from './moda.interface.component';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  // @ViewChild('modal-ontent', { read: ElementRef }) modalContent: ElementRef;
  
  @Input('primary-action') primaryAction?: ModalAction;
  
  @Input('secondary-action') secondaryAction?: ModalAction;
  
  @Input('title') title: string;

  showModal: string = "fade";

  // closeModal(): void {
  //   this.showModal = 'fade';
  // }

  // openModal(): void {
  //   this.showModal = 'show';
  // }
  
  // @Output() open: EventEmitter<any> = new EventEmitter<any>();

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    // this.open.emit(this.visible);
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

  // onPrimaryAction() {
  //   this.primaryAction.action();

  //   this.hide();
  // }

}
