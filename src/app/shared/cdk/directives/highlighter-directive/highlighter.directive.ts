import { Directive, Input } from '@angular/core';
import { tuiIsPresent } from '@taiga-ui/cdk';

import { HighlighterItemDirective } from './highlighter-item.directive';

@Directive({
  selector: '[highlighter]',
})
export class HighlighterDirective<T> {
  @Input('highlighterClass')
  class: string = 'highlighted';

  @Input('highlighterDuration')
  duration: number = 500;

  protected readonly items: HighlighterItemDirective<T>[] = [];

  register(item: HighlighterItemDirective<T>): void {
    if (!this.items.includes(item)) {
      this.items.push(item);
    }
  }

  unregister(item: HighlighterItemDirective<T>): void {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  highlight(value: T | null): void {
    const instance = this.items.find((x) => x.itemId == value);

    this.items.forEach((item) => {
      item.elementRef.nativeElement.classList.toggle(this.class, item == instance);
    });

    if (tuiIsPresent(instance)) {
      this.scrollTo(instance);
    }
  }

  private scrollTo(item: HighlighterItemDirective<T>): void {
    const target = item.elementRef.nativeElement;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    target.focus();
  }
}
