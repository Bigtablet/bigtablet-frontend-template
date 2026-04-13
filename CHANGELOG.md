## [1.7.2](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.7.1...1.7.2) (2026-04-13)

## [1.7.1](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.7.0...1.7.1) (2026-04-03)


### Bug Fixes

* resolve all 27 security vulnerabilities in transitive dependencies ([3e302a1](https://github.com/Bigtablet/bigtablet-frontend-template/commit/3e302a1185435ae0b5d8ec597e60b0a331f34fd3))
* restore @clack/prompts 1.2.0 and conventionalcommits 9.3.1 ([eef77cc](https://github.com/Bigtablet/bigtablet-frontend-template/commit/eef77cc80b89b9c424dc56caa9660f07fc4d76b3))

# [1.7.0](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.6.2...1.7.0) (2026-04-02)


### Bug Fixes

* add template validation and scaffold error cleanup ([07cb116](https://github.com/Bigtablet/bigtablet-frontend-template/commit/07cb11608766ed0923b033090ad266e5234e92f0))
* consolidate package.json I/O into single read-write pass ([92c38aa](https://github.com/Bigtablet/bigtablet-frontend-template/commit/92c38aa10abd5119b188cdc85f8b4e413232b77c))
* use JSON object model for package.json project name update ([23bd8c4](https://github.com/Bigtablet/bigtablet-frontend-template/commit/23bd8c48ec85a060470a65097615ec2813585611))


### Features

* introduce template registry for dynamic template management ([7af1b11](https://github.com/Bigtablet/bigtablet-frontend-template/commit/7af1b11814d3b0465dabe45a6a464ce88f1b1951))

## [1.6.2](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.6.1...1.6.2) (2026-04-01)

## [1.6.1](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.6.0...1.6.1) (2026-03-24)


### Bug Fixes

* move GCP mutation hook from query/ to mutation/ directory ([52b4f47](https://github.com/Bigtablet/bigtablet-frontend-template/commit/52b4f4745608fcc4881edd022fb629106ac0e196))
* rename hook files from .hook.ts to use-{name}.ts convention ([4619fdf](https://github.com/Bigtablet/bigtablet-frontend-template/commit/4619fdfa73399351b8e6f70a621d7533ab2105ce))
* rename signin route directory to sign-in for kebab-case convention ([8f2f36f](https://github.com/Bigtablet/bigtablet-frontend-template/commit/8f2f36f17e7449bd2e3f5e37bd5b60116507a408))
* wrap children with ToastProvider in provider component ([629800a](https://github.com/Bigtablet/bigtablet-frontend-template/commit/629800ada621ef1ff1f5400ccea27d249a378bbe))

# [1.6.0](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.5.2...1.6.0) (2026-03-20)


### Bug Fixes

* apply code review feedback from PR [#77](https://github.com/Bigtablet/bigtablet-frontend-template/issues/77) ([27ecc2c](https://github.com/Bigtablet/bigtablet-frontend-template/commit/27ecc2ccc0a36b83b8960eed11b4ae8ecee8834d))
* fix pnpm version in deploy workflow and package.json ([014c19a](https://github.com/Bigtablet/bigtablet-frontend-template/commit/014c19a41f24a036654fca35e2542023351584fd))
* handle undefined value in clack prompts validate callback ([ae627a6](https://github.com/Bigtablet/bigtablet-frontend-template/commit/ae627a664c4b576281ac807a4872b382ac8e6244))


### Features

* improve template app pages with JSDoc and welcome content ([91bed66](https://github.com/Bigtablet/bigtablet-frontend-template/commit/91bed66f5ada639075de62ed9d54eac0ceb4dd3f))

## [1.5.2](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.5.1...1.5.2) (2026-03-17)


### Bug Fixes

* use angle brackets for commit message format placeholder ([70c6343](https://github.com/Bigtablet/bigtablet-frontend-template/commit/70c6343dc2b3cd0fa7fb2f79307b56edb3fb8375))

## [1.5.1](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.5.0...1.5.1) (2026-03-13)


### Bug Fixes

* apply code review feedback from PR [#69](https://github.com/Bigtablet/bigtablet-frontend-template/issues/69) ([426d506](https://github.com/Bigtablet/bigtablet-frontend-template/commit/426d506009658cbd3f14a54a683e0f4b43934ab8))
* simplify getTemplateDirectory and useSigninMutation per review ([08891f9](https://github.com/Bigtablet/bigtablet-frontend-template/commit/08891f91749fe6ffad55587ac1854e8d45f252f0))

# [1.5.0](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.4.0...1.5.0) (2026-03-13)


### Features

* add missing shadcn template files for claude settings and signin mutation ([9fea864](https://github.com/Bigtablet/bigtablet-frontend-template/commit/9fea8647b703a79e7bf4c245f2511174d1bdad53))
* move template/ to templates/design-system/ as independent template ([0c13900](https://github.com/Bigtablet/bigtablet-frontend-template/commit/0c13900990b9ce95aed34cb3c41fa06141743bd5))
* simplify scaffold logic for independent template directories ([863fa7e](https://github.com/Bigtablet/bigtablet-frontend-template/commit/863fa7e943ffe9802a84fde1f2973251cd22b640))

# [1.4.0](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.3.0...1.4.0) (2026-03-10)


### Features

* add config files to shadcn template ([d082338](https://github.com/Bigtablet/bigtablet-frontend-template/commit/d08233829a233e75571d8815fe93adba42d48848))
* add docs and agent skills to shadcn template ([11e4387](https://github.com/Bigtablet/bigtablet-frontend-template/commit/11e4387cb1b8da997c362bb79097e80d8fa3ee1b))
* add Pretendard fonts and logo assets to shadcn template ([cad5b3a](https://github.com/Bigtablet/bigtablet-frontend-template/commit/cad5b3a94e49af2254b2375c2135aa1d57bed3ff))
* add shared libs, hooks, schema and entities to shadcn template ([aeb0ae9](https://github.com/Bigtablet/bigtablet-frontend-template/commit/aeb0ae9fc91297b4133a725ef5de6d7dc2b8274f))
* update app and widgets layers for shadcn template ([a2edd3f](https://github.com/Bigtablet/bigtablet-frontend-template/commit/a2edd3fb8ee1308e180e1846dc2ba25bfd600503))

# [1.3.0](https://github.com/Bigtablet/bigtablet-frontend-template/compare/1.2.0...1.3.0) (2026-03-10)


### Features

* add modal system, 5xx retry, zustand and standalone output to template ([754cbe0](https://github.com/Bigtablet/bigtablet-frontend-template/commit/754cbe0f651790d78b9b99c4d8eb1e729a69d9aa))
* migrate cli to typescript with interactive prompts and shadcn option ([e1879ab](https://github.com/Bigtablet/bigtablet-frontend-template/commit/e1879abcafaee0fb813deea617cb8b81b6b559dc))
