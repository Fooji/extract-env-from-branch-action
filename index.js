const core = require('@actions/core');
try {
  const branch = core.getInput('branchRef');
  const [stage, env] = branch.replace('refs/heads/', '').split('-');
  core.exportVariable('FOOJI_STAGE', stage);
  core.exportVariable('FOOJI_ENV', env);
  core.exportVariable('FOOJI_PROFILE', `${env}-${stage}`);
  let domain
  switch (stage) {
    case 'dev':
      domain = `${env}.fooji.dev`;
      break;
    case 'staging':
      domain = `${env}.fooji.qa`;
      break;
    case 'production':
      domain = `${env}.fooji.com`;
      break;
    default:
      throw Error(`Unknown stage ${stage}!`);
  }
  // TODO: Do we need this?
  core.exportVariable('FOOJI_DOMAIN', domain);
  console.log(`FOOJI_STAGE=${stage}, FOOJI_ENV=${env}, FOOJI_DOMAIN=${domain}`);
} catch (error) {
  core.setFailed(error.message);
}