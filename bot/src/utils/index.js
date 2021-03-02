const getArgs = (content, prefix, management) => {
  // Comprueba si el mensaje ha sido enviado en el canal de gestión
  if (management) return content.trim().split(/ + /);
  else return content.slice(prefix.length).trim().split(/ + /);
};

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
