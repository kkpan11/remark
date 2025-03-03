import type {Root} from 'mdast'
import type {Extension as FromMarkdownExtension} from 'mdast-util-from-markdown'
import type {Extension as MicromarkExtension} from 'micromark-util-types'
import type {Plugin} from 'unified'
import type {Options} from './lib/index.js'

export type {Options} from './lib/index.js'

// Note: we have to use manual types here,
// instead of getting them from `lib/index.js`,
// because TS generates wrong types for functions that use `this`.
// TS makes them into classes which is incorrect.
/**
 * Add support for parsing from markdown.
 *
 * @this
 *   Unified processor.
 * @param
 *   Configuration (optional).
 * @returns
 *   Nothing.
 */
declare const remarkParse: Plugin<
  [(Readonly<Options> | null | undefined)?],
  string,
  Root
>
export default remarkParse

// Add custom settings supported when `remark-parse` is added.
declare module 'unified' {
  interface Settings extends Options {}

  interface Data {
    /**
     * List of `micromark` extensions to use.
     *
     * This type is registered by `remark-parse`.
     * Values can be registered by remark plugins that extend `micromark` and
     * `mdast-util-from-markdown`.
     * See {@linkcode MicromarkExtension | Extension} from
     * {@linkcode https://github.com/micromark/micromark/tree/main/packages/micromark-util-types | micromark-util-types}.
     */
    micromarkExtensions?: Array<MicromarkExtension>

    /**
     * List of `mdast-util-from-markdown` extensions to use.
     *
     * This type is registered by `remark-parse`.
     * Values can be registered by remark plugins that extend `micromark` and
     * `mdast-util-from-markdown`.
     * See {@linkcode FromMarkdownExtension | Extension} from
     * {@linkcode https://github.com/syntax-tree/mdast-util-from-markdown#extension | mdast-util-from-markdown}.
     */
    fromMarkdownExtensions?: Array<
      Array<FromMarkdownExtension> | FromMarkdownExtension
    >
  }
}
