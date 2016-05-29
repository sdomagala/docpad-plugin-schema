# DocPad Configuration File
# http://docpad.org/docs/config
# Define the DocPad Configuration

docpadConfig = {

  collections:
    posts: ->
      @getCollection("documents")
        .findAllLive()

  plugins:
    schema:
      posts: require './schema/postSchema.json'

}

# Export the DocPad Configuration
module.exports = docpadConfig
