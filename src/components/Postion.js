/**
 * 角度をラジアンに変換する
 * https://ja.wikipedia.org/wiki/ラジアン
 *
 * @param {int} degree
 * @returns
 */
function toRadian(degree) {
  return degree * (Math.PI / 180);
}

/**
 * 座標を操作するクラス
 */
class Position {
  // 初期値の設定
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  // 座標を設定
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // 座標を足す
  add(x, y, z) {
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
  }

  // 複製
  // この方法だと「参照渡し」にならない
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }

  // コマンドで使える文字列で返す
  get str() {
    // 小数点以下は無意味なので切り捨て
    const x = Math.floor(this.x);
    const y = Math.floor(this.y);
    const z = Math.floor(this.z);
    return `${x} ${y} ${z}`;
  }

  /**
   * 2点間の空間座標の距離
   *
   * @param {Position Object} p
   * @returns {float} 距離
   */
  distance(p) {
    // 各座標の差
    const dx = this.x - p.x;
    const dy = this.y - p.y;
    const dz = this.z - p.z;
    // 差の２乗を足した平方根
    return Math.hypot(dx, dy, dz);
    // この計算は次と同じ。sqrt(square root)は平方根
    // return Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2) + ((p1.z - p2.z) ** 2));
  }

  // 回転
  // この座標(p1)を基準点(p2)から角度[度](angle[degree])分だけ回転する

  // y軸を基準に回転
  rotateY(degree, p2) {
    // 元の座標を複製して短縮した名前に入れる
    const p1 = this.clone();
    // 角度をラジアンに変換
    // Math.sin()の引数は角度(degree)ではなくラジアン(radian)
    const r = toRadian(degree);
    // 座標を三角関数(sine, cosine)で計算する
    // https://goukaku-suppli.com/archives/37382
    this.x = (p1.x - p2.x) * Math.cos(r) - (p1.z - p2.z) * Math.sin(r) + p2.x;
    this.z = (p1.z - p2.z) * Math.cos(r) + (p1.x - p2.x) * Math.sin(r) + p2.z;
  }

  // z軸を基準に回転
  rotateZ(degree, p2) {
    const p1 = this.clone();
    const r = toRadian(degree);
    this.y = (p1.y - p2.y) * Math.cos(r) - (p1.x - p2.x) * Math.sin(r) + p2.y;
    this.x = (p1.x - p2.x) * Math.cos(r) + (p1.y - p2.y) * Math.sin(r) + p2.x;
  }

  // x軸を基準に回転
  rotateX(degree, p2) {
    const p1 = this.clone();
    const r = toRadian(degree);
    this.z = (p1.z - p2.z) * Math.cos(r) - (p1.y - p2.y) * Math.sin(r) + p2.z;
    this.y = (p1.y - p2.y) * Math.cos(r) + (p1.z - p2.z) * Math.sin(r) + p2.y;
  }
}

export default Position;
