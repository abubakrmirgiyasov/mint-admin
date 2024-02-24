import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { tuiIsPresent } from "@taiga-ui/cdk";

import { HighlighterDirective } from "./highlighter.directive";

@Directive({
    selector: '[highlighterItem]',
})
export class HighlighterItemDirective<T> implements OnInit, OnDestroy {
    @Input('highlighterItem')
    set itemId(value: T) {
        this._itemId = value;
    }

    get itemId(): T {
        if (!tuiIsPresent(this._itemId)) { 
            throw new Error('Не задан идентификатор текущего элемента.');
        }

        return this._itemId;
    }

    private _itemId: T | null = null;

    constructor(
        private readonly highlighter: HighlighterDirective<T>,
        readonly elementRef: ElementRef<HTMLElement>
    ) { }
    
    ngOnInit(): void {
        this.highlighter.register(this);
    }

    ngOnDestroy(): void {
        this.highlighter.unregister(this);
    }    
}