import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HighlighterDirective } from "./highlighter.directive";
import { HighlighterItemDirective } from "./highlighter-item.directive";

@NgModule({
    declarations: [HighlighterDirective, HighlighterItemDirective],
    imports: [CommonModule],
    exports: [HighlighterDirective, HighlighterItemDirective]
})
export class HighlighterDirectiveModule { }