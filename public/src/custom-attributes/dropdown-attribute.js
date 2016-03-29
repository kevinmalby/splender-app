import { inject } from 'aurelia-framework';

@inject(Element)
export class DropdownCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  attached() {
    this.plugin = jQuery(this.element).dropdown({
      inDuration: 300,
      outDuration: 225,
      hover: true, // Activate on hover
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right' // Displays dropdown with edge aligned to the left of button
    });
  }

  detached() {
    this.plugin.destroy();
  }
}