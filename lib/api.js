import fs from 'mz/fs'
import rp from 'request-promise'

export function lint (content, baseURL = 'https://gitlab.com', token, projectId) {
  const apiEndpoint = `${baseURL}/api/v4`;
  const options = {
    uri: projectId ? `${apiEndpoint}/projects/${projectId}/ci/lint` : `${baseURL}/ci/lint`,
    json: true,
    method: 'POST',
    body: {
      content
    }
  }

  if (token !== undefined) {
    options.qs = {
      private_token: token
    }
  }

  return rp(options)
}

export function lintFile (filename, baseURL, token, projectId) {
  return fs.readFile(filename).then((data) => lint(data.toString(), baseURL, token, projectId))
}
