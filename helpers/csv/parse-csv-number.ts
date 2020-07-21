export default function(numberString?: string): number | undefined
{
  if (!numberString) return undefined
  return parseFloat(numberString)
}
