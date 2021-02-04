import { Atlas } from "@funk/ui/atlas/model/atlas"

export default function <AtlasType extends Atlas>(
  rootPath: keyof AtlasType,
  ...paths: string[]
): string {
  const _paths = [rootPath, ...paths] as string[]
  if (_paths.length > 1) {
    return `/${_paths.join("/")}`.replace(/(\/){2,3}/, "/")
  }
  return `/${rootPath}`.replace(/(\/){2,3}/, "/")
}
