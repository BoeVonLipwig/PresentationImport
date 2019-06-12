# Editing Site Colors

## Contents:
- [Swap Between Color Schemes](#swap-between-color-schemes)
- [Edit the Color Scheme](#edit-the-color-scheme)

## Swap Between Color Schemes:

There are 4 default color schemes provided by default in connected worlds. To change between them you will need to make a small edit in cytoscape.js. By setting the number for the "colorScheme" variable you are picking which of these 4 color schemes are being used on you site. You can check out how the color scheme looks by running `yarn install` and then `yarn start` (if you want to see how it looks with your data locally you will need to run the python parser manually with the new data and move output.json and years.json from the parser output folder to src/assets before you run `yarn start`).
```js
let styleMaster = {
      colorScheme: 0, // num 0 - 3, selects one of 4 color schemes from an
      array defined in Colors.json(see Colors.pdf for visual guide)
      //color overrides for css and cycss variables
      //accepts only hex color values (#fff) empty and faulty field will use
      defined in the selected colorScheme
      fg: "", //foreground color : text, tickboxes, logo etc
      bg: "", //background color
      hl: "", //highlight color : tooltip, html links, scrollbar hover etc
      ll: "", //lowlight color : greyed out text, drop shadows, scrollbar track etc
      //nodeOverride, can override automatic styling and labels (addKey) for nodes
      // can be done by type(person, project, school) or subtype/role
      (Honours Student, Academic Staff, etc)
      nodeOverride: nodeOverrides
    };
```
This will allow you to swap between the color schemes outlined in [the colors pdf](Colors.pdf).

## Edit the Color Scheme:

To create a custom color scheme you can change values in the colors.json found in the src/assets directory. It is split into and array of 4 objects, each is an individual color scheme. Pick one that you dont want and you can start changing its colors (*Remember to change to that color scheme following the above section*).

Each color scheme object has two pars, one that describes the colors of the site as a whole and one that describes the colors of the nodes.

Section 1:
```js
fg: "", //foreground color : text, tickboxes, logo etc
bg: "", //background color
hl: "", //highlight color : tooltip, html links, scrollbar hover etc
ll: "", //lowlight color : greyed out text, drop shadows, scrollbar track etc
```

Section 2:
This outlines the colors for nodes, where the first item in each array is the colors for one node type and the second item of each is the colors for a second node type and so on.
```js
    "node": [
      ["#nodetype one color", "#nodetype two color", "#etc", "#etc", "#etc", "#etc"],
       //5 foreground colors for nodes
      ["#nodetype one color", "#nodetype two color", "#etc", "#etc", "#etc", "#etc"],
       //5 background colors for nodes
      ["#nodetype one color", "#nodetype two color", "#etc", "#etc", "#etc", "#etc"],
       //5 highlight colors for nodes
      ["#nodetype one color", "#nodetype two color", "#etc", "#etc", "#etc", "#etc"]
       //5 lowlight colors for nodes
    ]
```
Edit as you please but it is recommended you test locally before pushing to your website. You can check out how the color scheme looks by running `yarn install` and then `yarn start` (if you want to see how it looks with your data locally you will need to run the python parser manually with the new data and move output.json and years.json from the parser output folder to src/assets before you run `yarn start`).
