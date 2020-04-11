import { OnChanges, SimpleChange, SimpleChanges } from '@angular/core'
import ReactiveInputs from '@funk/ui/helpers/reactive-inputs'
import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'

describe('ReactiveInputs', () =>
{
  it('should emit a replay subject every time a given input changes', async (done) =>
  {
    @ReactiveInputs<ReactiveInputsTestComponent>([
      [ 'myInput', 'myStream' ],
    ])
    class ReactiveInputsTestComponent implements OnChanges {
      public myInput = 'foo'
      public myStream!: Observable<string>
      public ngOnChanges(_simpleChanges?: SimpleChanges): void { }
    }

    const component = new ReactiveInputsTestComponent()
    const component2 = new ReactiveInputsTestComponent()
    const firstChanges = {
      myInput: {
        previousValue: undefined,
        currentValue: 'foo',
        firstChange: true,
      } as SimpleChange,
    }
    component.ngOnChanges(firstChanges)
    component2.ngOnChanges(firstChanges)

    const firstValue = await component.myStream.pipe(first()).toPromise()
    expect(firstValue).toBe('foo')

    component.myInput = 'bar'
    component.ngOnChanges({
      myInput: {
        previousValue: 'foo',
        currentValue: 'bar',
        firstChange: false,
      } as SimpleChange,
    })

    const secondValue1 = await component.myStream.pipe(first()).toPromise()
    const firstValue2 = await component2.myStream.pipe(first()).toPromise()
    expect(firstValue2).toBe('foo')
    expect(secondValue1).toBe('bar')

    done()
  })
})
