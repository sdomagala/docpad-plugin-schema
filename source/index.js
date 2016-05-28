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

      docpad.getCollection();
    }
  };

}
