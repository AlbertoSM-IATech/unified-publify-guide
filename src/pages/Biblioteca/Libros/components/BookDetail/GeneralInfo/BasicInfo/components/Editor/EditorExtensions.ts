
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Extension } from "@tiptap/core";
import { Node } from "@tiptap/core";

// Custom extension for two-column layout
export const TwoColumns = Node.create({
  name: 'twoColumns',
  group: 'block',
  content: 'block+',
  defining: true,
  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="two-columns"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'two-columns', class: 'two-columns-container', ...HTMLAttributes }, 0];
  },
});

// Custom extension for image gallery
export const ImageGallery = Node.create({
  name: 'imageGallery',
  group: 'block',
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-gallery"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'image-gallery', class: 'image-gallery-container', ...HTMLAttributes }, 0];
  },
});

// Custom extension for A+ content HTML formatting
export const APlusContent = Extension.create({
  name: 'aplusContent',

  addGlobalAttributes() {
    return [
      {
        types: ['heading'],
        attributes: {
          class: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.class) {
                return {};
              }
              return { class: attributes.class };
            },
          },
        },
      },
    ];
  },
});

// Export all extensions as a unified collection
export const editorExtensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-primary underline',
    },
  }),
  TwoColumns,
  ImageGallery,
  APlusContent,
];
