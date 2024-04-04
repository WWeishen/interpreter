import fs from 'fs';
import { execSync } from 'child_process';
import { parse } from 'flatted';

execSync('node ..\\sos_examples\\testSoSLang\\bin\\cli generate ..\\temp\\test1.simple > test1String');

// extract ccfg
const ccfgString = fs.readFileSync('test1String', 'utf-8');
const ccfgStringValide = ccfgString.match(/^.*/m)[0];
const ccfg = parse(ccfgStringValide);

export default ccfg;