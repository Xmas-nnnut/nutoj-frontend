# nutoj-frontend

## 根据后台自动生成代码
```shell
// 单体项目
openapi --input http://localhost:8121/api/v2/api-docs --output ./generated --client axios
// 微服务项目需要分组生成
openapi --input http://localhost:8101/api/user/v2/api-docs?group=default --output ./generated --client axios
openapi --input http://localhost:8101/api/team/v2/api-docs?group=default --output ./generated --client axios
openapi --input http://localhost:8101/api/question/v2/api-docs?group=default --output ./generated --client axios
openapi --input http://localhost:8101/api/judge/v2/api-docs?group=default --output ./generated --client axios
```
同时修改，携带cookie

WITH_CREDENTIALS: true,

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
