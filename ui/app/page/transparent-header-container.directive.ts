import { AfterViewInit, Directive, OnInit, Renderer2, TemplateRef,
  ViewContainerRef } from "@angular/core"

export interface TransparentHeaderContainerContext
{
  $implicit: (event: CustomEvent) => void
}

@Directive({
  selector: "[transparent-header-container]",
})
export class TransparentHeaderContainerDirective implements AfterViewInit, OnInit
{
  private _headerElement?: HTMLIonHeaderElement

  public constructor(
    private _renderer: Renderer2,
    private _templateRef: TemplateRef<TransparentHeaderContainerContext>,
    private _viewContainerRef: ViewContainerRef
  )
  { }

  public ngOnInit(): void
  {
    this._viewContainerRef.createEmbeddedView(this._templateRef, {
      $implicit: this.handleContentScroll.bind(this),
    })
  }

  public ngAfterViewInit(): void
  {
    this._headerElement = document?.querySelector("ion-header") || undefined
    this.handleContentScroll({
      detail: { scrollTop: 0, deltaY: 0 },
    } as CustomEvent)
  }

  public handleContentScroll({ detail }: CustomEvent): void
  {
    const headerElement = this._headerElement
    if (detail && headerElement)
    {
      if (detail.scrollTop > 0 && detail.deltaY > 0)
      {
        this._renderer.removeClass(headerElement, "no-box-shadow")
      }
      else if (detail.scrollTop <= 0 && detail.deltaY <= 0)
      {
        this._renderer.addClass(headerElement, "no-box-shadow")
      }
    }
  }
}
