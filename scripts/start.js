// Normalize host-related variables to avoid invalid webpack-dev-server options.
if (typeof process.env.HOST === 'string' && process.env.HOST.trim() === '') {
  delete process.env.HOST;
}
if (typeof process.env.WDS_SOCKET_HOST === 'string' && process.env.WDS_SOCKET_HOST.trim() === '') {
  delete process.env.WDS_SOCKET_HOST;
}
if (typeof process.env.ALLOWED_HOSTS === 'string' && process.env.ALLOWED_HOSTS.trim() === '') {
  delete process.env.ALLOWED_HOSTS;
}

process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.DANGEROUSLY_DISABLE_HOST_CHECK = 'true';

require('react-scripts/scripts/start');
