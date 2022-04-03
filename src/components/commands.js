/**
 * 座標(position)オブジェクトを文字列(string)に変換する
 *
 * @param {*} pos 座標オブジェクト
 * @returns 座標文字列
 */
function toString(pos) {
  // 小数点以下は切り捨て（コマンド的には切り捨てる必要はない）
  const x = Math.floor(pos.x);
  const y = Math.floor(pos.y);
  const z = Math.floor(pos.z);
  return `${x} ${y} ${z}`;
}

/**
 * /setblock
 *
 * @param {*} pos 対象座標
 * @param {*} block 設置するブロック
 * @returns コマンド文
 */
function setBlock(pos, block) {
  return `/setblock ${toString(pos)} ${block}`;
}

export default setBlock;
