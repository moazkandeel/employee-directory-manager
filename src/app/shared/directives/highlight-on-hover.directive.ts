import {Directive,ElementRef,HostListener,Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHoverDirective {

  constructor(
    private elementRef: ElementRef,private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'border-color',
      '#6366f1'
    );

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'box-shadow',
      '0 12px 35px rgba(99, 102, 241, 0.18)'
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.removeStyle(
      this.elementRef.nativeElement,
      'border-color'
    );

    this.renderer.removeStyle(
      this.elementRef.nativeElement,
      'box-shadow'
    );
  }
}