import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
@Directive({
    selector: '.data-bold'
})
export class BoldDirective {
    constructor(private eleRef: ElementRef) { 

    eleRef.nativeElement.style.fontWeight = 'bold';
    
    } 
}