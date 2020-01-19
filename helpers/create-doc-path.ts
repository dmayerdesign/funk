export default function<
    DataType,
    NestedDataType1 extends DataType[keyof DataType] | never = never,
  >(
  pathSegment1: keyof DataType,
  pathSegment2?: keyof NestedDataType1 | never,
): string
{
  if (pathSegment2)
  {
    return [
      pathSegment1,
      pathSegment2,
    ]
    .join('.')
  }
  return pathSegment1 as string
}
