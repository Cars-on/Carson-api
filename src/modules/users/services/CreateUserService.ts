import fs from 'fs';
import csvParse from 'csv-parse';

class CreateUserService {
  public async execute(file: Express.Multer.File | undefined): Promise<void> {
    if (file) {
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile.on('data', async line => {
        console.log(line);
      });
    }
  }
}

export { CreateUserService };
