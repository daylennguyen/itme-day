/**
 * Ported from Chill Component `util-cat-face/utils.ts` (MIT).
 * @see https://gitlab.com/side_project/chill-component
 */
import { omit, pipe, piped, reduce } from "remeda";

const getPathAttrs = piped(
  (attrNode?: NamedNodeMap) => {
    if (!attrNode) return {};

    const result: Record<string, string> = {};
    for (let i = 0; i < attrNode.length; i++) {
      const node = attrNode[i];
      if (!node) continue;

      const { name, value } = node;
      result[name] = value;
    }
    return result;
  },
  omit(["id", "ref", "fill", "stroke", "stroke-linecap"]),
);

export function getKeyframeList<Id extends string>(
  svgId: string,
  partIdList: readonly Id[] | Id[],
  facialExpression: string,
) {
  return pipe(
    Array.from(document.querySelectorAll(`#${svgId} .${facialExpression}`)),
    (list) =>
      list.map((item) => {
        const partList = pipe(
          partIdList,
          reduce(
            (acc, partId) => {
              const target = item.querySelector(`#${partId}`);
              acc[partId] = getPathAttrs(target?.attributes);

              return acc;
            },
            {} as Record<(typeof partIdList)[number], Record<string, string>>,
          ),
        );

        return partList;
      }),
  );
}
