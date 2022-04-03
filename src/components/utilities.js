const utilities = {};

// チャット欄に文字を表示する
utilities.displayChat = function displayChat(message) {
  const BroadcastEventData = this.createEventData('minecraft:display_chat_event');
  BroadcastEventData.data.message = message;
  this.broadcastEvent('minecraft:display_chat_event', BroadcastEventData);
};

// スラッシュコマンドを実行する
utilities.executeCommand = function executeCommand(command) {
  const ExecuteEventData = this.createEventData('minecraft:execute_command');
  ExecuteEventData.data.command = command;
  this.broadcastEvent('minecraft:execute_command', ExecuteEventData);
};

export default utilities;
