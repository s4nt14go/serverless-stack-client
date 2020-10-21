import { Storage } from "aws-amplify";
import {onError} from "./errorLib";
import AWS from 'aws-sdk/global';
// eslint-disable-next-line no-unused-vars
import S3 from 'aws-sdk/clients/s3';
import config from "../config";

export async function s3Upload(file, fbIdentityId) {
  const filename = `${Date.now()}-${file.name}`;

  // If I'm logged in with Facebook, identityId gave me undefined (or set with the identityId of the previous user logged
  // in with email and password), so Storage.vault.put fails, so I'll use AWS.S3().puObject instead
  if (!fbIdentityId) {
    const stored = await Storage.vault.put(filename, file, {
      contentType: file.type,
    });

    return stored.key;
  } else {
    const params = {
      Body: file,
      ContentType: file.type,
      Bucket: config.s3.BUCKET,
      Key: `private/${fbIdentityId}/${filename}`
    };
    const s3 = new AWS.S3();
    s3.putObject(params, function (err, _data) {
      if (err) onError(err);
    });
    return filename;
  }
}
