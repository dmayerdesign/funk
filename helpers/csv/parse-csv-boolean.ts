export default function(booleanString?: string): boolean | undefined
{
  if (!booleanString) return undefined
  return !!booleanString?.match(/true/ig)
}
