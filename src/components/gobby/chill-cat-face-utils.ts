/**
 * Ported from Chill Component `util-cat-face/utils.ts` (MIT).
 * @see https://gitlab.com/side_project/chill-component
 */

const OMIT_ATTRS = new Set([
  "id",
  "ref",
  "fill",
  "stroke",
  "stroke-linecap",
]);

export function getPathAttrs(attrNode?: NamedNodeMap): Record<string, string> {
  if (!attrNode) return {};

  const result: Record<string, string> = {};
  for (let i = 0; i < attrNode.length; i++) {
    const node = attrNode[i];
    if (!node) continue;
    if (OMIT_ATTRS.has(node.name)) continue;
    result[node.name] = node.value;
  }
  return result;
}

export function getKeyframeList<Id extends string>(
  svgId: string,
  partIdList: readonly Id[] | Id[],
  facialExpression: string,
) {
  return Array.from(
    document.querySelectorAll(`#${svgId} .${facialExpression}`),
  ).map((item) => {
    const partList = {} as Record<Id, Record<string, string>>;
    for (const partId of partIdList) {
      const target = item.querySelector(`#${partId}`);
      partList[partId as Id] = getPathAttrs(target?.attributes);
    }
    return partList;
  });
}

/** Head-tail connect — alternate direction looks unnatural for these loops. */
export function connectHeadTail<T>(list: T[]): T[] {
  const tail = [...list].reverse().slice(1);
  return [...list, ...tail];
}
