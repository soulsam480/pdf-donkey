import chalk from 'chalk';
import { createWriteStream } from 'fs';

export function logApiRoutes(ServerRoutes: any[], port: number | string) {
  console.log(chalk.black.bgGreen('ROUTES'));
  let routeData: any[] = ServerRoutes.map((r) => {
    if (r && r.route && r.route.path && r.route.methods) {
      console.log(
        chalk.bgBlack.bold.yellow(
          `http://localhost:${port}` + r.route.path.toUpperCase(),
        ),
        '||',
        chalk.bgBlack.bold.greenBright(
          Object.keys(r.route.methods).map((el) => el.toUpperCase()),
        ),
      );
      return `PATH : **${r.route.path.toUpperCase()}** **||** METHOD: **${Object.keys(
        r.route.methods,
      ).map((el) => el.toUpperCase())}** 
- Detailed:
\`\`\`\json
 ${JSON.stringify(r)}
\`\`\`
          `;
    }
  });
  routeData = routeData.filter((el) => el !== undefined);

  const file = createWriteStream('./ROUTES.md');
  file.on('error', (err) => {
    console.log(err);
  });
  file.write(`## ROUTES ${new Date().toLocaleDateString('en-US')}` + '\n\n');
  routeData.forEach((v: string) => {
    file.write(v + '\n');
  });
  file.end();
}
