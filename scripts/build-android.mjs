import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

function run(command, args, cwd = process.cwd()) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run(process.execPath, [resolve('node_modules/vite/bin/vite.js'), 'build']);
run(process.execPath, [resolve('node_modules/@capacitor/cli/bin/capacitor'), 'sync', 'android']);
run('java', [
  '-classpath',
  resolve('android/gradle/wrapper/gradle-wrapper.jar'),
  'org.gradle.wrapper.GradleWrapperMain',
  'assembleDebug',
], resolve('android'));
console.log('APK gerado em android/app/build/outputs/apk/debug/app-debug.apk');
