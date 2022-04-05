import setBlock from './commands';

// 開始点と終了点から直線を描く
// ブレゼンハムのアルゴリズム
// https://ja.wikipedia.org/wiki/ブレゼンハムのアルゴリズム
export function drawLine(start, end, block) {
  // 参照渡しにならないようにclone/copy相当の変換をする
  // 1. オブジェクトをJSON形式の文字列に変換し(stringify)
  // 2. それをJSONとしてオブジェクトに変換する(parse)
  const sp = JSON.parse(JSON.stringify(start));
  const ep = JSON.parse(JSON.stringify(end));
  // 終点と始点の差(difference)
  const diff = {
    x: ep.x - sp.x,
    y: ep.y - sp.y,
    z: ep.z - sp.z,
  };
  // 増加値(increment)。各座標はどちらの方向に進むのか。
  const inc = {
    // 三項演算子
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    x: diff.x > 0 ? 1 : -1,
    y: diff.y > 0 ? 1 : -1,
    z: diff.z > 0 ? 1 : -1,
  };
  // 各座標の長さ。絶対値(absolute)
  const distance = {
    x: Math.abs(diff.x),
    y: Math.abs(diff.y),
    z: Math.abs(diff.z),
  };
  //
  const diff2 = {
    x: distance.x * 2,
    y: distance.y * 2,
    z: distance.z * 2,
  };

  const findPosition = (A, B, C) => {
    // ビットシフトした値と元のxとの差をとる
    let err1 = diff2[B] - distance[A];
    let err2 = diff2[C] - distance[A];
    // 0からその距離の2つ前までループ
    for (let i = 0; i < distance[A] - 1; i += 1) {
      // 配置する座標として加える、その座標は別クラスで計算
      setBlock(sp, block);
      // ビットシフトした値と元のxとの差が0より大きければ座標を更新する
      if (err1 > 0) {
        sp[B] += inc[B];
        err1 -= diff2[A];
      }
      if (err2 > 0) {
        sp[C] += inc[C];
        err2 -= diff2[A];
      }
      err1 += diff2[B];
      err2 += diff2[C];
      sp[A] += inc[A];
    }
  };

  // 始点にブロックを置く
  setBlock(sp, block);

  // x,y,zのどれが一番長いかで処理が分かれる
  if (distance.x >= distance.y && distance.x >= distance.z) {
    // x方向が一番長いとき
    findPosition('x', 'y', 'z');
  } else if (distance.y >= distance.x && distance.y >= distance.z) {
    // y方向が一番長いとき
    findPosition('y', 'x', 'z');
  } else {
    // z方向が一番長いとき
    findPosition('z', 'y', 'x');
  }

  // 始点と終点が一致してなければ、終点にもブロックを置く
  if (sp.x !== ep.x || sp.y !== ep.y || sp.z !== ep.z) {
    setBlock(ep, block);
  }
}

// 中心点と半径から円を描く
// https://en.wikipedia.org/wiki/Midpoint_circle_algorithm
export function drawCircle(pos, radius, block) {
  // 中心から90度の4点にブロックを置く
  setBlock({ x: pos.x, z: pos.y + radius, y: pos.z }, block);
  setBlock({ x: pos.x, z: pos.y - radius, y: pos.z }, block);
  setBlock({ x: pos.x + radius, z: pos.y, y: pos.z }, block);
  setBlock({ x: pos.x - radius, z: pos.y, y: pos.z }, block);

  let f = 1 - radius;
  let ddfX = 1;
  let ddfY = -2 * radius;
  let x = 0;
  let y = radius;

  while (x < y) {
    if (f >= 0) {
      y -= 1;
      ddfY += 2;
      f += ddfY;
    }
    x += 1;
    ddfX += 2;
    f += ddfX;
    setBlock({ x: pos.x + x, z: pos.y + y, y: pos.z }, block);
    setBlock({ x: pos.x - x, z: pos.y + y, y: pos.z }, block);
    setBlock({ x: pos.x + x, z: pos.y - y, y: pos.z }, block);
    setBlock({ x: pos.x - x, z: pos.y - y, y: pos.z }, block);
    setBlock({ x: pos.x + y, z: pos.y + x, y: pos.z }, block);
    setBlock({ x: pos.x - y, z: pos.y + x, y: pos.z }, block);
    setBlock({ x: pos.x + y, z: pos.y - x, y: pos.z }, block);
    setBlock({ x: pos.x - y, z: pos.y - x, y: pos.z }, block);
  }
}
