import commander from 'commander'

import pkg from '../package'
import { lintFile } from './api'

commander
  .version(pkg.version)
  .usage('[options] <file>')
  .option('-u, --url [URL]', 'Use alternative Gitlab URL')
  .option('-t, --token [TOKEN]', 'Provide Gitlab personal access token, when it\'s needed')
  .option('-p, --project [ID]', 'Validate against a project specific context')
  .parse(process.argv)

lintFile(commander.args[0] || '.gitlab-ci.yml', commander.url, commander.token, commander.project)
  .then((result) => {
    result.errors.forEach((error) => console.error(error))
    process.exit(result.status === 'valid' ? 0 : 1)
  })
  .catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
