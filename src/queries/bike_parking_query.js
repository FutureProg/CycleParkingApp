
export default `
[out:json]
[timeout:25]
;
area(3607034889)->.searchArea;
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

// Oakville - 2407500
// Burlington - 2407513 
// Milton - 2414122
// Halton Hills - 2414222
// Halton Region - 7034889