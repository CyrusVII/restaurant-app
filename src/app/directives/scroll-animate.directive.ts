import { Directive, ElementRef, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit {
  @HostBinding('class.animate-in') animateIn = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        this.animateIn = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    observer.observe(this.el.nativeElement);
  }
}