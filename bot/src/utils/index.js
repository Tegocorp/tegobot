const getArgs = (content, prefix) =>
  content.slice(prefix.length).trim().split(/ + /);

const sendMessage = (msg, type, content, deleteMsg) => {
  let botMsg;
  switch (type) {
    case 'reply':
      msg.reply(content).then((msg) => (botMsg = msg));
      break;
    default:
      msg.channel.send(content).then((msg) => (botMsg = msg));
      break;
  }

  if (deleteMsg) setTimeout(() => botMsg.delete(), 10000);
};

module.exports = { getArgs, sendMessage };
