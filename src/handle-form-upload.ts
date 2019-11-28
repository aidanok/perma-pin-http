import { permafiyFile, PermafiySuccessResult, PermafiyErrorResult } from "@perma-pin/lib";

/**
 * Handles a form upload with a 'file' 
 * 
 * @param files request param parsed by express-fileupload
 * 
 */
export async function handleFormUpload(files: any): Promise<PermafiySuccessResult | PermafiyErrorResult> {

  const keys = Object.keys(files);
  
  if (keys.length !== 1) {
    throw new Error('More than 1 file is not suppoted');
  }
  
  const file = files[keys[0]];

  return permafiyFile(file.data, file.mimetype);

}