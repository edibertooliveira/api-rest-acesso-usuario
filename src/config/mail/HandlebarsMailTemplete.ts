import handlebars from 'handlebars';
import fs from 'fs';

interface ITempleteVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  file: string;
  variables: ITempleteVariable;
}
export class HandlebarsMailTemplete {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templeteFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templeteFileContent);

    return parseTemplate(variables);
  }
}
