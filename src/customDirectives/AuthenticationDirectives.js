const {
  GraphQLDirective,
  DirectiveLocation,
  defaultFieldResolver,
} = require('graphql');
const { SchemaDirectiveVisitor } = require("apollo-server")

class AuthenticationDirectives extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName = 'authentication') {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION]
    });
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (root, args, context, info) => {
      return resolve.call(this, root, args, context, info)
    }
  }
}