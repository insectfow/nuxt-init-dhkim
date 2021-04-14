# bigbird-real-live-chat

## Build Setup

```bash
# install dependencies
$ npm install

# package.json localhost fix plz and serve with hot reload
$ npm run dev

# cross-env NODE_ENV=production nuxt build
$ npm run build

# cross-env NODE_ENV=stage nuxt build
$ npm run buildStage

# cross-env NODE_ENV=stage firebase deploy -P dev
$ npm run deployStage

# cross-env NODE_ENV=production firebase deploy -P prod
$ npm run deploy

