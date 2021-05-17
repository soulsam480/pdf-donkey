var Changelog = require('generate-changelog');
var Fs = require('fs');

return Changelog.generate({
  patch: true,
  repoUrl: 'https://github.com/soulsam480/pdf-donkey',
}).then(function (changelog) {
  Fs.writeFileSync('./CHANGELOG.md', changelog);
});
