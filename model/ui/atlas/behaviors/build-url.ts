import { Atlas } from "@funk/model/ui/atlas/atlas"

export default function<AtlasType extends Atlas>(rootPath: keyof AtlasType, ...paths: string[]): string {
  const _paths = [rootPath, ...paths] as string[]
  if (_paths.length > 1) {
    return `/${_paths.join("/")}`
  }
  return `/${rootPath}`
}
