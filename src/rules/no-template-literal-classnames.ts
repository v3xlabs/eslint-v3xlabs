import type { Rule } from "eslint";

// eslint's core AST types omit JSX nodes, so we describe the narrow shapes we read here.
type JSXReadableName = {
  type: string;
  name?: string;
};

type JSXReadableExpression = {
  type: string;
};

type JSXReadableValue = {
  type: string;
  expression?: JSXReadableExpression;
};

type JSXReadableAttribute = {
  name?: JSXReadableName;
  value?: JSXReadableValue;
};

const classAttributes = new Set(["className", "class"]);

export const noTemplateLiteralClassnames: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow template literals as class names; prefer clsx or the classnames package.",
    },
    schema: [],
    messages: {
      noTemplateLiteralClassnames:
        "Avoid template literals for class names in `{{attr}}`. Use `clsx` or the `classnames` package to compose class names conditionally.",
    },
  },
  create(context) {
    return {
      JSXAttribute(node) {
        const attribute = node as unknown as JSXReadableAttribute;

        if (attribute.name?.type !== "JSXIdentifier") {
          return;
        }

        const attributeName = attribute.name.name;

        if (attributeName === undefined || !classAttributes.has(attributeName)) {
          return;
        }

        if (attribute.value?.type !== "JSXExpressionContainer") {
          return;
        }

        if (attribute.value.expression?.type !== "TemplateLiteral") {
          return;
        }

        context.report({
          node,
          messageId: "noTemplateLiteralClassnames",
          data: { attr: attributeName },
        });
      },
    };
  },
};
