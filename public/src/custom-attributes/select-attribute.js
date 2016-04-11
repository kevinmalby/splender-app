import { inject } from 'aurelia-framework';

@inject(Element)
export class SelectCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  attached() {
    this.plugin = jQuery(this.element).material_select();
  }

  detached() {
    if (this.plugin)
      this.plugin.destroy();
  }
}