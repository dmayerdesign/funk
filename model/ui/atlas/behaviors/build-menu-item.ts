import { Atlas } from "@funk/model/ui/atlas/atlas"
import { MenuItem } from "@funk/model/ui/atlas/menu-item"

export function construct<AtlasType extends Atlas>(
  atlas: AtlasType
): BuildMenuItem<AtlasType> {
  return function (rootPath: keyof AtlasType, ...paths: string[]): MenuItem {
    const _paths = [rootPath, ...paths] as string[]
    if (_paths.length > 1) {
      let _atlas = atlas as AtlasType | Atlas | undefined
      let _node: AtlasType[keyof AtlasType] | undefined
      _paths.forEach((path) => {
        _node = _atlas?.[path] as AtlasType[keyof AtlasType]
        _atlas = _node?.__atlas__
      })
      return {
        label: _node!.label,
        url: `/${_paths.join("/")}`,
      }
    }
    const { label } = atlas[rootPath]
    return {
      label,
      url: `/${rootPath}`,
    }
  }
}

export type BuildMenuItem<AtlasType extends Atlas> = (
  rootPath: keyof AtlasType,
  ...paths: string[]
) => MenuItem
