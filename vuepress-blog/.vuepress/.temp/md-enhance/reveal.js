import { reveal, revealMarkdown, revealHighlight, revealMath, revealSearch, revealNotes, revealZoom } from "D:/blog/blog/node_modules/vuepress-plugin-md-enhance/lib/client/reveal";

export const useReveal = () => [reveal(), revealMarkdown(), revealHighlight(), revealMath(), revealSearch(), revealNotes(), revealZoom()
];