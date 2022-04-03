const path = require('path');

// webpackの設定
module.exports = {
  // 出力モード
  mode: 'production',
  // エントリーポイントとなるファイル（どのファイルを基準にするか）
  // server/server -> `scripts/server/server.js`
  entry: {
    'server/server': './src/server.js',
    'client/client': './src/client.js',
  },
  // 出力方法
  output: {
    // 出力先: 初期値のdistからscriptsに変更している
    path: path.resolve(__dirname, 'scripts'),
    // 出力ファイル名[name]はentryのキーのこと
    filename: '[name].bundle.js',
  },
};
