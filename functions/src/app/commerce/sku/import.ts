import setCollectionFromCsv from "@funk/api/commerce/sku/set-collection-from-csv"
import createRpcFunction from "@funk/functions/helpers/http/create-rpc-function"
import authenticateForRoles from "@funk/functions/helpers/identity/authenticate-for-roles"
import { UserRole } from "@funk/model/auth/user-role"
import { SKUS } from "@funk/model/commerce/sku/sku"
import fileUpload = require("express-fileupload")
import { Request } from "express"

interface FileUpload {
  files: {
    [key in typeof SKUS]: fileUpload.UploadedFile
  }
}

export default createRpcFunction(
  authenticateForRoles([ UserRole.SUPER, UserRole.OWNER, UserRole.ADMINISTRATOR ]),
  fileUpload(),
  async (_request) =>
  {
    const fileUploadRequest = _request as Request & FileUpload
    const acceptsCsv = fileUploadRequest.accepts("text/csv")
    if (acceptsCsv)
    {
      const csvString = fileUploadRequest.files[SKUS].data.toString("utf-8")
      await setCollectionFromCsv(csvString)
    }
  }
)
