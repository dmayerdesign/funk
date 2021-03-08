import { Enterprise } from "@funk/commerce/enterprise/model/enterprise"
import { construct } from "@funk/commerce/shop/application/external/enterprise/enterprise"
import { construct as constructListenById } from "@funk/organization/application/external/behaviors/persistence/listen-by-id"
import { PRIMARY_ORGANIZATION } from "@funk/organization/model/organization"
import { when } from "jest-when"
import { of } from "rxjs"

describe("Enterprise$", () => {
  let listenById: ReturnType<typeof constructListenById>
  const ENTERPRISE = ({} as unknown) as Enterprise

  beforeEach(() => {
    listenById = jest.fn()
    when(listenById as jest.Mock)
      .calledWith(PRIMARY_ORGANIZATION)
      .mockReturnValue(of(ENTERPRISE))
  })

  it("should emit the primary enterprise", async () => {
    const enterprise = construct(listenById)
    const enterpriseObserverSpy = jest.fn()

    enterprise.subscribe(enterpriseObserverSpy)
    enterprise.subscribe(() => {
      expect(enterpriseObserverSpy).toHaveBeenCalledTimes(1)
    })
  })
})
