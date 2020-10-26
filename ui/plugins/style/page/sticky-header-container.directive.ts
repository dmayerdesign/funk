import {
  AfterContentInit,
  Directive,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from "@angular/core"

export interface StickyHeaderContainerContext {
  $implicit: (event: CustomEvent) => void
}

@Directive({
  selector: "[sticky-header-container]",
})
export class StickyHeaderContainerDirective
  implements AfterContentInit, OnInit {
  private _headerElement?: Element

  public constructor(
    private _renderer: Renderer2,
    private _templateRef: TemplateRef<StickyHeaderContainerContext>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    this._viewContainerRef.createEmbeddedView(this._templateRef, {
      $implicit: this.handleContentScroll.bind(this),
    })
  }

  public ngAfterContentInit(): void {
    this._headerElement = document?.querySelector(".sticky-header") ?? undefined

    if (!this._headerElement) {
      console.warn("[StickyHeaderContainerDirective] .sticky-header was not found.")
      return
    }

    this.handleContentScroll({
      detail: { scrollTop: 0, deltaY: 0 },
    } as CustomEvent)
  }

  public handleContentScroll({ detail }: CustomEvent): void {
    const headerElement = this._headerElement
    if (detail && headerElement) {
      if (detail.scrollTop > 0 && detail.deltaY > 0) {
        this._renderer.removeClass(headerElement, "no-box-shadow")
        this._renderer.removeClass(headerElement, "background-transparent")
      } else if (detail.scrollTop <= 0 && detail.deltaY <= 0) {
        this._renderer.addClass(headerElement, "no-box-shadow")
        this._renderer.addClass(headerElement, "background-transparent")
      }
    }
  }
}
