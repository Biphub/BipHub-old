import nconf from 'nconf'
import path from 'path'

const loadNConf = () => {
  const configPath = __dirname
  nconf.set('database:host', '127.0.0.1');
  nconf.set('database:port', 5984);
  // Loads hub config
  nconf.file('hub', path.join(configPath, 'hub.json'))

  // Loads web config
  nconf.file('web', path.join(configPath, 'web.json'))
  console.log('laoded web ', path.join(configPath, 'web.json') , '  ', nconf.get('database'))
  return nconf
}

export default loadNConf()
