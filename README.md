# web-twitter-rename

> 誰でも設置者の Twitter 表示名を変更できます

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Making

```shell
cd ./web-twitter-rename
# set node version
nodenv local 13.5.0
# init nuxt-app
yarn create nuxt-app .
? Project name web-twitter-rename
? Project description 誰でも設置者のTwitter表示名を変更できるようになります
? Author name ɯ̹t͡ɕʲi
? Choose the package manager Yarn
? Choose UI framework None
? Choose custom server framework None (Recommended)
? Choose Nuxt.js modules Axios, DotEnv
? Choose linting tools ESLint, Prettier, Lint staged files, StyleLint
? Choose test framework Jest
? Choose rendering mode Universal (SSR)
? Choose development tools jsconfig.json (Recommended for VS Code)
# typescript support
yarn remove @nuxtjs/eslint-config
yarn add --dev @nuxt/typescript-build
yarn add --dev @nuxtjs/eslint-config-typescript
yarn add --dev @typescript-eslint/parser
yarn add @nuxt/typescript-runtime
yarn add @vue/composition-api
touch ./plugins/composition-api.ts
rename nuxt.config.js nuxt.config.ts
vi nuxt.config.ts # add @nuxt/typescript-build and @/plugins/composition-api
vi .eslintrc.js # add @nuxtjs/eslint-config-typescript and @typescript-eslint/parser
vi package.json # edit lint command to add .ts to ext option and replace nuxt with nuxt-ts
touch tsconfig.json
mkdir ./types
touch ./types/vue-shim.d.ts
# stylus support
yarn add --dev stylus stylus-loader
yarn add --dev stylelint-config-standard
# add plugins
yarn add --dev @nuxtjs/google-analytics
vi nuxt.config.js # add @nuxtjs/google-analytics and ga settings
# make api
mkdir ./api
touch ./api/emit_new_name.ts
yarn add twitter
# misc
rm -rf ./middleware
mkdir ./src
mv ./api ./src/
mv ./assets ./src/
mv ./components ./src/
mv ./layouts ./src/
mv ./pages ./src/
mv ./plugins ./src/
mv ./static ./src/
mv ./types ./src/
vi nuxt.config.ts # add srcDir option
touch LICENSE
touch README.md
# docker
touch Dockerfile
touch .dockerignore
# make config file
touch .env.sample
touch .env
gitignore code vim windows macos node
git secret init
git secret tell -m
git secret add .env
git secret hide
```
