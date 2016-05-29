import { validate } from 'jsonschema';

export default function (BasePlugin) {

  return class BaseClass extends BasePlugin {
    constructor (...args) {
      super(...args);
    }

    get name () {
      return 'schema';
    }

    generateBefore(opts, next) {
      const docpad = this.docpad;

      const config = this.getConfig();

      if(!config) {
        console.log('There is no schema given!');
        return next();
      }

      const collections = Object.keys(config);
      console.log(collections);
      collections.forEach((col) => {
        const currentCol = docpad.getCollection(col).toJSON();

        const schema = collections[col];

        currentCol.forEach((record) => {
          console.log(validate(record.meta, schema));
        });
      });
    }
  };

}
