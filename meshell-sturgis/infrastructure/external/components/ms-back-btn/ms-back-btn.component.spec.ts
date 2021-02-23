import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { MsBackBtnComponent } from "./ms-back-btn.component"

describe("MsBackBtnComponent", () => {
  let component: MsBackBtnComponent
  let fixture: ComponentFixture<MsBackBtnComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MsBackBtnComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MsBackBtnComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should be created", () => {
    expect(component).toBeTruthy()
  })
})
