import createFunction from '@funk/functions/helpers/http/create-function'

export default createFunction(async () =>
{
  return new Promise((resolve) =>
  {
    const delay = Math.random() * 3000
    setTimeout(() =>
      resolve({ hello: 'world' }),
      delay)
  })
})
