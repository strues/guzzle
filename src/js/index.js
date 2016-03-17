//import { select, text } from './helpers/dom';
//select('.default_content')::text(`It works &#92;o/ !`);

/* global $: true */

class FormToggle {
  constructor(container) {
    this.$container = container;
    this.$toggleContainer = this.$container.find('.checkbox-container');
    this.$toggle = this.$container.find('.speedCheckout');
    this.$form = this.$container.find('.speedCheckout-form');

    this.tick = false;

    this.$toggle.on('click', () => {
      this.ticker();
    });
  }

  ticker() {
    this.tick ? this.closeForm() : this.openForm();
  }

  closeForm() {
    this.$form.slideUp();
    this.$toggleContainer.removeClass('wantForm');
    this.tick = false;
  }

  openForm() {
    this.$form.slideDown();
    this.$toggleContainer.addClass('wantForm');
    this.tick = true;
  }
}

$(() => {

  new FormToggle($('.speedCheckout-container'));

});
