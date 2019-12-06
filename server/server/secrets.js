const secrets = {
  dbUri:
    process.env.DB_URI ||
    'mongodb://chams:tekup123@ds233258.mlab.com:33258/react-class',
};

const getSecret = (key) => secrets[key];

module.exports = { getSecret };
