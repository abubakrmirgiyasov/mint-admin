import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { getJwtUser } from "@core/helpers";

@Directive({
    selector: '[roles]',
})
export class PermittedRoleDirective implements OnInit {
    @Input()
    roles: string[] = [];

    @Output()
    showElem: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit(): void {
        const userRoles = getJwtUser().role.split(',');
        const hasCommonRole = this.roles.some((role) => userRoles.includes(role));

        this.showElem.emit(hasCommonRole);
    }
}