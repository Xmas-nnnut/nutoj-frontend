# nutoj-frontend

## 根据后台自动生成代码
```shell
openapi --input http://localhost:8121/api/v2/api-docs --output ./generated --client axios
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
