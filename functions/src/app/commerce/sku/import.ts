import setCollectionFromCsv from "@funk/api/commerce/sku/set-collection-from-csv"
import createRpcFunction from "@funk/functions/helpers/http/create-rpc-function"
import authenticateForRoles from "@funk/functions/helpers/identity/authenticate-for-roles"
import { UserRole } from "@funk/model/auth/user-role"
import { SKUS } from "@funk/model/commerce/sku/sku"
import { Request } from "express"
import multer from "multer"

interface SkuImportFiles {
  files: {
    [key in typeof SKUS]: Express.Multer.File
  }
}

const uploadMiddleware = multer({ storage: multer.memoryStorage() })
  .fields([
    { name: SKUS, maxCount: 1 },
  ])

export default createRpcFunction(
  authenticateForRoles([ UserRole.SUPER, UserRole.OWNER, UserRole.ADMINISTRATOR ]),
  uploadMiddleware,
  async (_request) =>
  {
    const fileUploadRequest = _request as Request & SkuImportFiles
    const acceptsCsv = fileUploadRequest.accepts([
      "application/csv",
      "application/vnd.ms-excel",
      "application/x-csv",
      "text/comma-separated-values",
      "text/csv",
      "text/plain",
      "text/x-comma-separated-values",
      "text/x-csv",
    ])
    if (acceptsCsv)
    {
      const csvString = fileUploadRequest.files[SKUS].buffer.toString("utf-8")
      await setCollectionFromCsv(csvString)
    }
  }
)
