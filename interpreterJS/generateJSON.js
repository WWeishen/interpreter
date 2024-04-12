import fs from 'fs';
import { execSync } from 'child_process';
//import { parse } from 'flatted';

execSync('node ..\\sos_examples\\testSoSLang\\bin\\cli generate ..\\temp\\test1.simple > test1String');

// extract ccfg
//const ccfgString = fs.readFileSync('test1String', 'utf-8');
//const ccfgStringValide = ccfgString.match(/^.*/m)[0];
//const ccfg = parse(ccfgStringValide);

function removeLastLineFromFile(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error("Error lecture of the file test1String:", err);
            return;
        }
        const lines = data.split('\n');
        lines.pop();
        lines.pop();

        const ccfgString = lines.join('\n');
        console.log(ccfgString);
        /*fs.writeFile(file, ccfgString, 'utf8', (err) => {
            if (err) {
                console.error("Error", err);
                return;
            }
            console.log("succes");
        });*/
        return ccfgString;
    });
}


let ccfg = removeLastLineFromFile('test1String');
export default ccfg;