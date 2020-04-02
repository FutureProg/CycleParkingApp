
export default `
[out:json]
[timeout:25]
;
area(3601954127)->.searchArea;
(
  node
    ["bicycle_parking"]
    (area.searchArea);
  way
    ["bicycle_parking"]
    (area.searchArea);
  relation
    ["bicycle_parking"]
    (area.searchArea);
);
out;
>;
out skel qt;
`