import { ContentChild, Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core'
import { IonRippleEffect } from '@ionic/angular'

@Directive({
  selector: '[ripple-container]',
})
export class RippleContainerDirective implements OnInit
{
  @ContentChild(IonRippleEffect) public rippleEffect!: IonRippleEffect
  @ContentChild(IonRippleEffect, { read: ElementRef }) private rippleEffectRef!: ElementRef

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
  )
  { }

  public ngOnInit(): void
  {
    this._renderer.addClass(this._elementRef.nativeElement, 'ion-activatable')
    this._renderer.addClass(this._elementRef.nativeElement, 'ripple-parent')
  }

  @HostListener('click', ['$event'])
  public ripple = ({ x, y }: MouseEvent): void =>
  {
    this.rippleEffect.addRipple(x, y).then(() =>
    {
      this._removeRipple(
        this.rippleEffectRef.nativeElement
          .shadowRoot
          .querySelector('.ripple-effect')
      )
    })
  }

  private _removeRipple(ripple: HTMLElement): void
  {
    ripple.classList.add('fade-out')
    setTimeout(
      () => ripple.remove(),
      200,
    )
  }
}
