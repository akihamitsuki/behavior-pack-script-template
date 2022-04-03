/**
 * エンティティのIDを取得する
 * この場合のIDは通し番号ではなくエンティティの種類(type)
 *
 * @param {Entity JS API object} entity
 * @returns {string}
 */
function getIdentifier(entity) {
  // 公式の名前空間を削除して返す
  return entity.__identifier__.replace('minecraft:', '');
}

/**
 * ダメージを表示する
 *
 * @param {*} self
 * @param {*} eventData
 */
function showDamage(self, eventData) {
  let attaker = null;
  let target = null;

  // 攻撃したエンティティ/原因を取得
  if (eventData.data.attacker) {
    attaker = getIdentifier(eventData.data.attacker);
  } else if (eventData.data.cause) {
    attaker = eventData.data.cause;
  }

  // 攻撃されたエンティティを取得
  if (eventData.data.entity) {
    target = getIdentifier(eventData.data.entity);
  }

  // 対象が両方あれば表示
  if (attaker && target) {
    self.displayChat(`${attaker} -> ${target}: ${eventData.data.damage} damage!`);
  }
}

export default showDamage;
