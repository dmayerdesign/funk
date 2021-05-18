import gsap, { TweenMax } from "gsap"

// https://javascript.info/js-animation
export interface AnimateOptions {
  element: HTMLElement
  durationMs: number
  easingFunction:
    | "circ.in"
    | "circ.out"
    | "circ.inOut"
    | "expo.in"
    | "expo.out"
    | "expo.inOut"
    | "power4.in"
    | "power4.out"
    | "power4.inOut"
    | "power3.in"
    | "power3.out"
    | "power3.inOut"
    | "power2.in"
    | "power2.out"
    | "power2.inOut"
    | "back.in"
    | "back.out"
    | "back.inOut"
  fromCss?: Partial<CSSStyleDeclaration>
  toCss?: Partial<CSSStyleDeclaration>
}

export class Animation {
  private _tween?: TweenMax

  public constructor(private _animateOptions: AnimateOptions) {}

  public start(): void {
    const { durationMs, element, easingFunction, toCss } = this._animateOptions
    this._tween = gsap.to(element, {
      ease: easingFunction,
      duration: durationMs / 1000,
      ...toCss,
    })
  }

  public stop(): void {
    this._tween?.kill()
  }
}
