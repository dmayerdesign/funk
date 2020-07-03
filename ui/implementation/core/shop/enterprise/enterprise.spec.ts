import { construct as constructListenById }
  from "@funk/plugins/persistence/actions/listen-by-id"
import { Enterprise } from "@funk/model/commerce/enterprise/enterprise"
import { construct } from "@funk/ui/core/shop/enterprise/enterprise"
import { when } from "jest-when"
import { of } from "rxjs"
import { ORGANIZATIONS, PRIMARY_ORGANIZATION } from "@funk/model/organization/organization"

describe("Enterprise$", () =>
{
  let listenById: ReturnType<typeof constructListenById>
  const ENTERPRISE = {} as unknown as Enterprise

  beforeEach(() =>
  {
    listenById = jest.fn()
    when(listenById as jest.Mock)
      .calledWith(ORGANIZATIONS, PRIMARY_ORGANIZATION)
      .mockReturnValue(of(ENTERPRISE))
  })

  it("should emit the primary enterprise", async () =>
  {
    const enterprise = construct(listenById)
    const enterpriseObserverSpy = jest.fn()

    enterprise.subscribe(enterpriseObserverSpy)
    enterprise.subscribe(() =>
    {
      expect(enterpriseObserverSpy).toHaveBeenCalledTimes(1)
    })
  })
})

