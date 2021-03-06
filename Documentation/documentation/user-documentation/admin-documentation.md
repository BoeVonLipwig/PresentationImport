# Administration Documentation

This documentation will contain instructions for tweaking important areas
of the project.

## Contents

- [Setup](#setup)
- [Changing data](#changing-data)
- [Changing Color Schemes](#changing-color-schemes)
- [Changing YouTube Tutorial Video](#changing-youtube-tutorial-video)
- [Changing Footer Details](#changing-footer-details)
- [Adjusting the Year Range](#adjusting-the-year-range)
  - [Changing Default Slider Values](#changing-default-slider-values)
  - [Changing Years List Values](#changing-years-list-values)
- [Technical Documentation](#technical-documentation)
- [Getting the Static Deployable Files](#getting-the-static-deployable-files)
- [Changing ColorSchemes](#changing-colorschemes)

## Setup

Follow the [setup guide](documentation/guides/setup-guide).

## Changing Data

Follow the [data editing guide](documentation/guides/Data Uploading and Formatting).

## Changing Color Schemes

Follow the [color schemes guide](documentation/guides/using-and-changing-colorschemes).

## Changing YouTube Tutorial Video

1. Open **/src/components/VideoHelp.js**
1. Find the **renderVideo()** function

1. Find the **src** property of the iframe under the _// change tutorial video link here_ code comment.

1. Replace the **YouTube link** with your video link inside quote marks

   ```js
   renderVideo() {
       return (
         <div className="helpVideoWrapper">
           <iframe
             title="Youtube Video"
             // change tutorial video link here
             src="https://www.youtube.com/embed/ScMzIvxBSi4"
             frameborder="0"
             allow="autoplay; encrypted-media"
             allowfullscreen
           />
         </div>
       );
     }
   ```

   ```js
   // change tutorial video link here
   src = "<Your Youtube Link>";
   ```

1. Save changes to the file.
1. Push data changes to your Git and wait for the CI pipeline finish adding
   your video link change.

## Changing Footer Details

### Changing Logo

1. Open **/src/assets**
1. Drag your logo in to the folder and copy the file name
1. Open **/src/commponents/BottomBar.js**
1. Change `import logo from "../assets/vic-logo.svg";` to 
`import logo from "../assets/newLogo.fileType";`

### Changing Text

1. Open **/src/commponents/BottomBar.js**
1. Replace `<a>Connected Worlds: Research into VR, AR and MR at Victoria</a>`
with your own footer information

## Adjusting the Year Range

The year range slider uses array indexing to display the year range it is
currently displaying on screen. The name of this array is **this.years**.
This means the first year of the year range is **0** while the last year is
**this.years.length - 1**.

### Changing Default Slider Values

1. Open **/src/components/DataSwitch.js**
1. Find the **render()** function

1. Find the **defaultValue** property of the Range

1. Replace **this.min** with your desired min value (Between 0 and
   this.years.length - 1)

1. Replace **this.max** with your desired max value (Between this.min and
   this.years.length - 1)

   ```js
   render() {
     return (
       <div className="wrapper">
         <p>
           Range: {cytoscapeStore.minYear} - {cytoscapeStore.maxYear}
         </p>
         <Range
           min={0}
           max={this.years.length - 1}
           defaultValue={[this.min, this.max]}
           onChange={this.handleChange}
         />
       </div>
     );
   }
   ```

   ```js
           defaultValue={[<your min>, <your max>]}
   ```

1. Save changes to the file.

1. Push data changes to your Git and wait for the CI pipeline finish adding
   your video link change.

#### Changing Years List Values

- Currently years is given to **/src/components/DataSwitch.js** through getting
  **/src/assets/years.json** via Promise API.
- **/src/assets/years.json** is generated by the CSV-Parser when reading the data.
- To add or remove years to the list, create or delete your **year** sub-directories
  in **/parser/data**.
- **For Manual**, re-run the parser.
- **For Automatic**, push data changes to your Git and let the CI pipeline add
  your data changes to deployment.

## Getting the Static Deployable Files

Run `yarn build` and once it is finished running the resulting files will be found in the "build" directory.

Note: if you wish to change the data you will need to run the python parser manually with the new data and move output.json and years.json from the parser output folder to src/assets.

### Changing ColorSchemes:
For a guide on changing or creating custom color schemes follow [this guide](documentation/guides/using-and-changing-colorschemes)

## Technical Documentation

See the [technical documentation page](documentation/technical-documentation/technical-documentation).
