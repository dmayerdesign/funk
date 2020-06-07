import { to } from "gsap"

// https://javascript.info/js-animation
export interface AnimateOptions
{
  element: HTMLElement
  durationMs: number
  easingFunction:
  "circ.in" | "circ.out" | "circ.inOut"
  | "expo.in" | "expo.out" | "expo.inOut"
  | "power4.in" | "power4.out" | "power4.inOut"
  | "power3.in" | "power3.out" | "power3.inOut"
  | "power2.in" | "power2.out" | "power2.inOut"
  | "back.in" | "back.out" | "back.inOut"
  fromCss?: Partial<CSSStyleDeclaration>
  toCss?: Partial<CSSStyleDeclaration>
}

export class Animation
{
  private _tween?: GSAPStatic.Tween

  public constructor (
    private _animateOptions: AnimateOptions
  )
  { }

  public start(): void
  {
    const { durationMs, element, easingFunction, toCss } = this._animateOptions
    this._tween = to(element, durationMs / 1000, {
      ease: easingFunction,
      ...toCss,
    })
  }

  public stop(): void
  {
    if (this._tween)
    {
      this._tween.kill()
    }
  }
}
