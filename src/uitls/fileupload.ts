import fs, { createWriteStream, appendFileSync } from 'fs';
import path from 'path';

export default async function savefile(file,uploadDir,file_name){
    const { createReadStream, filename, mimetype, encoding } =  await file;

const f_path = `${uploadDir}/${file_name}${ path.extname(filename)}`;

return new Promise((resolve, reject) =>
createReadStream()
    .on('error', error => {
      if (createReadStream().truncated)
        fs.unlinkSync(f_path);
      reject(error);
    })
    .pipe(fs.createWriteStream(f_path))
    .on('error', error => reject(error))
    .on('finish', () => resolve({ path }))
);
return file;
}