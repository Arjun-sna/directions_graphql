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
      locations: [DirectiveLocation.FIELD_DEFINITION]
    });
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (root, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError(`Sign in to access ${field.name}`);
      }

      return resolve.call(this, root, args, context, info)
    }
  }
}

module.exports = AuthenticationDirective;