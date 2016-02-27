module.exports = {
  name: 'Umss.io',
  description: 'Umss.io',
  domain: 'example.com',
  url: 'http://www.example.com',
  env: 'development',
  //port: 3000,
  port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
  ip_address: process.env.OPENSHIFT_NODEJS_IP || 'localhost',
  database: {
    //domain: 'localhost',
    domain: (process.env.OPENSHIFT_MONGODB_DB_URL) ? process.env.OPENSHIFT_MONGODB_DB_URL: 'localhost',
    name: 'umss.io'
  }
}
