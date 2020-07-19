import { statSync, readdirSync, rmdirSync } from "fs-extra"
import { join } from "path"

/** https://gist.github.com/jakub-g/5903dc7e4028133704a4 */
export default function cleanEmptyFoldersRecursively(folder: string)
{
  const isDir = statSync(folder).isDirectory()
  if (!isDir)
  {
    return
  }
  let files = readdirSync(folder)
  if (files.length > 0)
  {
    files.forEach(function(file)
    {
      const fullPath = join(folder, file)
      cleanEmptyFoldersRecursively(fullPath)
    })

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    files = readdirSync(folder)
  }

  if (files.length === 0)
  {
    console.log("removing: ", folder)
    rmdirSync(folder)
    return
  }
}
