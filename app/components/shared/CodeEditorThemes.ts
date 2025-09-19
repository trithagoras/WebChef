import { EditorView } from "codemirror";

export const editableTheme = EditorView.theme(
  {
    ".cm-scroller": { backgroundColor: "#ffffff" },
    ".cm-gutters": { backgroundColor: "#ffffff" },
  },
  { dark: false }
);

export const readOnlyTheme = EditorView.theme(
  {
    ".cm-scroller": { backgroundColor: "#e5e7eb" }, // tailwind gray-200
    ".cm-gutters": { backgroundColor: "#e5e7eb" },
  },
  { dark: false }
);
