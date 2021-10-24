## Redux

Context でのデメリット

- ネストしすぎた Provider
- 一つのメンテナンスしづらい巨大な Provider
- パフォーマンス（更新頻度が高いものには不適切）

[脱 Redux を試みて失敗した話、その原因と対策について](https://blog.ojisan.io/datsu-redux-regret/)

useReducer とほぼ同じ

[useReducer の本質：良いパフォーマンスのためのロジックとコンポーネント設計 - Qiita](https://qiita.com/uhyo/items/cea1bd157453a85feebf)

Redux での開発が楽になる redux-toolkit

### Reducer 内の副作用

Reducer は単体で独立しなければならず、他に依存してはならない（同期・非同期関わらず）

Reducer 内で HTTP リクエストなどを送りたい場合は、useEffect でやるか redux の middleware を使うか

## Router

まあ、簡単。Params とか Location とかも取れる。

Router のパス管理が長すぎて見通しづらくならないか心配
