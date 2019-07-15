const {
  GraphQLDirective,
  DirectiveLocation,
  defaultFieldResolver,
} = require('graphql');
const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require("apollo-server");

class AuthenticationDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName = 'authentication') {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT]
    });
  }

  visitFieldDefinition(field, details) {
    this.wrapField(field, details.objectType)
  }

  visitObject(objectType) {
    if (objectType._authFieldsWrapped) return;
  
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      
      this.wrapField(field, objectType);
    });
  }

  wrapField(field, objectType) {
    if (field._authWrapped) return;

    field._authWrapped = true;

    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (root, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(`Sign in to perform this ${objectType}`);
      }

      return resolve.call(this, root, args, context, info)
    }
  }
}

module.exports = AuthenticationDirective;
