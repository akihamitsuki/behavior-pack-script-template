import utilities from './components/utilities';
import showDamage from './components/damage';

/* global server */
const system = server.registerSystem(0, 0);

// 基本機能はオブジェクトにまとめて結合する
Object.assign(system, utilities);

// 最初に実行されるメソッド
system.initialize = function initilalize() {
  // エンティティがダメージを受けたとき
  this.listenForEvent('minecraft:entity_hurt', (event) => this.onEntityHurt(event));
};

let tick = 0;
// 1ティックごとに実行されるメソッド
system.update = function update() {
  // 20で割った余りが0なら
  if (tick % 20 === 0) {
    // 20ティック = 1秒に1回実行する
  }
  if (tick % 100 === 0) {
    // 100ティック = 5秒に1回実行する
  }
  // 最後にティックを1加算する
  tick += 1;
};

// エンティティがダメージを受けたときに実行される
system.onEntityHurt = function onEntityHurt(event) {
  // ダメージを表示する
  showDamage(this, event);
};
