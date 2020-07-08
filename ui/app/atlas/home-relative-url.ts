export function construct()
{
  return async () => "/shop/home"
}

export type HomeRelativeUrl = ReturnType<typeof construct>
