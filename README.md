[![Netlify Status](https://api.netlify.com/api/v1/badges/d03825f9-f5d1-496a-a14c-e1015126fde6/deploy-status)](https://app.netlify.com/sites/serenadewind/deploys)
# SerenadeWind.com

## Tools used in this project
+ Jekyll (jekyllrb.com)
    + So Simple Jekyll Theme ([GitHub](https://github.com/mmistakes/so-simple-theme))
    + [Jekyll Image Gallery by Olivier Pieters](https://github.com/opieters/jekyll-image-gallery-example)
+ Python
    + Image processing using [TinyPNG API](https://tinypng.com/developers)
    + Inspired by [Olivier Pieters](https://gist.github.com/opieters/756c86fdad219867c0f4)
+ Hosting
    + DreamHost
    + netlify
        * netlify cli
        * continuous deployment
        * nightly builds
    + Surge
+ SublimeText

## Image Workflow
- Post images are assumed to have a landscape aspect ratio and will be processed into 4 sizes, both 1x and 2x screen densities
    - Small - 320px wide
    - Medium - 768px wide
    - Large - 1024px wide
    - XLarge - 1280px wide
    - Thumbs - not auto-processed - 200px wide, mainly used for non enlargeable images embedded within text.
- Adding new image assets:
    - New images should be sourced at a minimal width of 1280px
    - Image filename conventions:
        - Be descriptive
        - Use hyphens instead of spaces
        - All characters are lower case
    - Supported file extensions:
        - png
        - jpg
        - jpeg
    - New images should be saved in ```./RawImages```
- Generating website image assets from *RawImages*
    - From within the project folder, execute:  `makeimages`
    - 8 image assets will be generated based upon the 4 sizes listed above
    - Website assets will be saved in `./images/`
    - Upon conversion, the original file is deleted 
## Inserting a post image (wide post images)
To insert a new image into a post, we will use a template include.  While editing a post in SublimeText, follow these steps:
- Place the cursor at the position where the image will display (relative to the paragraphs around it)
- Type `wimage` and press `enter`
![SublimeText Snippet](docs/sw-sublime-image-snippet.png)

## Creating a new post
- All posts are found in `./_posts/`
- Post file naming conventions:
    - `YYYY-MM-DD-`**postname**`.md`
        - **postname** follows the same guidelines as the image filenames
        - Example: `2020-03-02-anchoring-in-patagonia.md`. Note that month and day values need a leading `0`. 
- You can create a new post by copying an existing post file
- Edit file contents per the layout instructions
- Save to preview

## Start (server) the website locally
- From the project folder, run `startsw`
- Local Website URL: `http://127.0.0.1:4000`
- Every time a file is saved, the website will be rebuilt automatically to allow the changes to be previewed.

## 
