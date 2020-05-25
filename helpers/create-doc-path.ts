export default function<
  DataType,
  NestedDataType1 extends DataType[keyof DataType] | never = never,
  NestedDataType2 extends
  DataType[keyof DataType][keyof DataType[keyof DataType]] | never = never,
>(
  pathSegment1: keyof DataType,
  pathSegment2?: keyof NestedDataType1 | never,
  pathSegment3?: keyof NestedDataType2 | never
): string
{
  if (pathSegment3)
  {
    return [
      pathSegment1,
      pathSegment2,
      pathSegment3,
    ]
      .join(".")
  }
  else if (pathSegment2)
  {
    return [
      pathSegment1,
      pathSegment2,
    ]
      .join(".")
  }
  return pathSegment1 as string
}
