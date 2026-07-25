import type { Rule } from "eslint";

type Fingerprint = {
  name: string;
  replacement: string;
};

// Keys stay escaped so this rule does not flag its own source, and so the
// invisible entries stay visible to whoever edits this file.
const fingerprints = new Map<string, Fingerprint>([
  ["\u{2014}", { name: "em dash", replacement: "--" }],
  ["\u{2013}", { name: "en dash", replacement: "-" }],
  ["\u{B7}", { name: "middle dot", replacement: "-" }],
  ["\u{D7}", { name: "multiplication sign", replacement: "x" }],
  ["\u{2026}", { name: "horizontal ellipsis", replacement: "..." }],
  ["\u{201C}", { name: "left double quotation mark", replacement: "\"" }],
  ["\u{201D}", { name: "right double quotation mark", replacement: "\"" }],
  ["\u{2018}", { name: "left single quotation mark", replacement: "'" }],
  ["\u{2019}", { name: "right single quotation mark", replacement: "'" }],
  ["\u{A0}", { name: "non-breaking space", replacement: " " }],
  ["\u{200B}", { name: "zero-width space", replacement: "" }],
  ["\u{FEFF}", { name: "zero-width no-break space", replacement: "" }],
]);

// eslint's core AST types omit JSX nodes, so we describe the narrow shapes we read here.
type JSXReadableText = {
  range?: [number, number];
  value?: string;
};

type JSXReadableParent = {
  type: string;
};

type ScanTarget = {
  text: string;
  start: number;
  quote?: string;
  // JSX attribute values are not escape-processed, so `\"` there is a literal backslash.
  isEscapable: boolean;
};

const fingerprintPattern = new RegExp(
  `[${Array.from(fingerprints.keys()).join("")}]`,
  "gu",
);

const describeCodePoint = (character: string) =>
  `U+${(character.codePointAt(0) ?? 0)
    .toString(16)
    .toUpperCase()
    .padStart(4, "0")}`;

export const noLlmFingerprint: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow typographic and invisible characters commonly emitted by language models.",
    },
    fixable: "code",
    schema: [],
    messages: {
      noLlmFingerprint:
        "Avoid the {{name}} ({{code}}) character. Use `{{replacement}}` instead.",
      noLlmFingerprintInvisible:
        "Avoid the {{name}} ({{code}}) character. Remove it.",
    },
  },
  create(context) {
    const { sourceCode } = context;

    const scan = ({ text, start, quote, isEscapable }: ScanTarget) => {
      for (const match of text.matchAll(fingerprintPattern)) {
        const character = match[0];
        const fingerprint = fingerprints.get(character);

        if (!fingerprint) {
          continue;
        }

        const from = start + match.index;
        const to = from + character.length;
        const hasQuoteCollision = fingerprint.replacement === quote;
        const replacement = hasQuoteCollision
          ? `\\${fingerprint.replacement}`
          : fingerprint.replacement;

        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(from),
            end: sourceCode.getLocFromIndex(to),
          },
          messageId:
            fingerprint.replacement === ""
              ? "noLlmFingerprintInvisible"
              : "noLlmFingerprint",
          data: {
            name: fingerprint.name,
            code: describeCodePoint(character),
            replacement: fingerprint.replacement,
          },
          fix:
            hasQuoteCollision && !isEscapable
              ? undefined
              : fixer => fixer.replaceTextRange([from, to], replacement),
        });
      }
    };

    return {
      Literal(node) {
        if (typeof node.value !== "string" || node.raw === undefined) {
          return;
        }

        const parent = node.parent as unknown as JSXReadableParent;

        scan({
          text: node.raw,
          start: node.range[0],
          quote: node.raw[0],
          isEscapable: parent.type !== "JSXAttribute",
        });
      },
      TemplateElement(node) {
        scan({
          text: sourceCode.getText(node),
          start: node.range[0],
          isEscapable: true,
        });
      },
      JSXText(node) {
        const text = node as unknown as JSXReadableText;

        if (text.value === undefined || text.range === undefined) {
          return;
        }

        scan({ text: text.value, start: text.range[0], isEscapable: false });
      },
      Program() {
        for (const comment of sourceCode.getAllComments()) {
          // `//` and `/*` are both two characters, so the value starts at range[0] + 2.
          scan({
            text: comment.value,
            start: comment.range[0] + 2,
            isEscapable: false,
          });
        }
      },
    };
  },
};
