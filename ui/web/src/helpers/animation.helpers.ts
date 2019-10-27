import { Ease, TweenLite } from 'gsap'

// https://javascript.info/js-animation
export interface AnimateOptions {
  element: HTMLElement
  durationMs: number
  gsapEasingFn: Ease
  fromCss?: Partial<CSSStyleDeclaration>
  toCss?: Partial<CSSStyleDeclaration>
}

export class Animation {
  private _tween?: TweenLite

  constructor (
    private _animateOptions: AnimateOptions
  ) { }

  public start(): void {
    const { durationMs, element, gsapEasingFn, toCss } = this._animateOptions
    this._tween = TweenLite.to(element, durationMs / 1000, {
      easing: gsapEasingFn,
      ...toCss
    })
  }

  public stop(): void {
    if (this._tween) {
      this._tween.kill()
    }
  }
}
