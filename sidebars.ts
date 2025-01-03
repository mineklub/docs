import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  minepay: [
    "minepay/intro",
    {
      type: 'category',
      label: 'Plugin',
      items: [
        'minepay/plugin/intro',
      ]
    },
    {
      type: 'category',
      label: 'Skript',
      items: [
        'minepay/skript/intro',
        'minepay/skript/events',
        'minepay/skript/expressions',
        'minepay/skript/effects',
      ]
    }
  ],
  guides: [
    "guides/intro",
  ],
};

export default sidebars;
