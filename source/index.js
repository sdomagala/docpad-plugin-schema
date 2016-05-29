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
        docpad.log('warn', 'There is no schema given!');
        return next();
      }

      const collections = Object.keys(config);

      collections.forEach((col) => {
        const currentCol = docpad.getCollection(col).toJSON();

        const schema = config[col];

        currentCol.forEach((record) => {
          const isValidated = validate(record.meta, schema);

          if(isValidated.errors && isValidated.errors.length) {
            docpad.log('warn', `Document ${record.relativePath} isn't following schema, it will not render`);

            docpad
              .getFile({
                _id: record._id
              })
              .setMeta({
                write: false,
                render: false
              });
          }
        });
      });

      next();
    }
  };

}
