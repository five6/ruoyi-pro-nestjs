# NEST RUOYI PRO SERVER AND ADMIN WEB PAGE

## Description

BASE ON [Nest](https://github.com/nestjs/nest) framework

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## config description

controller

```bash
@Keep() //返回自定义
```
  
```bash
@HasPermission('sys:email:query') //当前接口需要用权限sys:email:query
```
  
```bash
@SkipAuth //跳过权限校验
```
