import { exec } from 'child_process';

// 执行命令
exec('node ..\\sos_examples\\testSoSLang\\bin\\cli generate ..\\temp\\test1.simple', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行命令时出错：${error}`);
    return;
  }
  if (stderr) {
    console.error(`命令执行产生了错误：${stderr}`);
    return;
  }
  
  console.log(`命令输出结果：${stdout}`);
});