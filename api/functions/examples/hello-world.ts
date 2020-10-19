import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"

export default createRpcFunction(
  async () =>
    new Promise((resolve) => {
      const delay = Math.random() * 3000
      setTimeout(() => resolve({ hello: "world" }), delay)
    })
)
