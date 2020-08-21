## Running the extension

Requirements:

- node 12+

To watch source file changes and continually bundle the extension:

`yarn install` or `npm install`

`yarn build --watch` or `npm run build --watch`

To load the produced extension, [follow the extension loading directions on MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Installing)"

- Visit `about:debugging`
- Click `This Firefox`
- Click `Load Temporary Add-on...`
- Browse to and select `manifest.json` from the file selector
- Visit any twitch.tv VOD
