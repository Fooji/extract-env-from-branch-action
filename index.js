const core = require('@actions/core');
try {
  const branch = core.getInput('branchRef');
  const [stage, env] = branch.replace('refs/heads/', '').split('-')
  core.exportVariable('FOOJI_STAGE', stage);
  core.exportVariable('FOOJI_ENV', env);
  let domain
  switch (stage) {
    case 'dev':
      domain = 'fooji.dev';
      break;
    case 'staging':
      domain = 'fooji.qa';
      break;
    case 'production':
      domain = 'fooji.com';
      break;
    default:
      throw Error(`Unknown stage ${stage}!`)
  }
  core.exportVariable('FOOJI_DOMAIN', domain);
} catch (error) {
  core.setFailed(error.message);
}