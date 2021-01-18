import { Atlas } from "@funk/model/ui/atlas/atlas"
import buildUrl from "@funk/model/ui/atlas/behaviors/build-url"
import { MenuItem } from "@funk/model/ui/atlas/menu-item"

export function construct<AtlasType extends Atlas>(
  atlas: AtlasType,
): BuildMenuItem<AtlasType> {
  return function (rootPath: keyof AtlasType, ...paths: string[]): MenuItem {
    const _paths = [rootPath, ...paths] as string[]
    const url = buildUrl(rootPath, ...paths)
    if (_paths.length > 1) {
      let _atlas = atlas as AtlasType | Atlas | undefined
      let _node: AtlasType[keyof AtlasType] | undefined
      _paths.forEach((path) => {
        _node = _atlas?.[path] as AtlasType[keyof AtlasType]
        _atlas = _node?.__atlas__
      })
      return {
        label: _node!.label,
        url,
      }
    }
    const { label } = atlas[rootPath]
    return {
      label,
      url,
    }
  }
}

export type BuildMenuItem<AtlasType extends Atlas> = (
  rootPath: keyof AtlasType,
  ...paths: string[]
) => MenuItem
