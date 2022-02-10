## Server

`apollo-server`

```bash
cd server
yarn install
yarn dev
```

## Client

`next-js` + `graphql-request` + `graphql-codegenerator`

- `react-query`
- `swr`

```bash
cd client
yarn install
yarn codegen (server 켜야해요)
yarn dev
```

### Note

`graphql codegenerator`

- react-query plugin에서 addInfiniteQuery 옵션은 모든 쿼리에 적용된다.
- swr plugin을 사용하려면 최신 graphql 버전을 사용할 수 없다. (graphql 버전을 최신에서 15.7.2 로 낮추었다)
- swr plugin에서 useSWRInfinite 와 autogenSWRKey 혼용할 수 없는듯 하다. (조금더 봐야..)
- useSWRInfinite의 장점은 operation을 특정할 수 있다. (react-query plugin도 이걸 지원해주면 좋을텐데)
