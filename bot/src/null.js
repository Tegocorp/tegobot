cliente.reproductor = new Manager(nodosLavalink, {
  user: cliente.user.id,
  shards: 1,
});
await cliente.reproductor
  .connect()
  .then((res) => {
    if (res)
      console.log(`tegobot iniciado correctamente -> ${cliente.user.tag}.`);
  })
  .catch((err) =>
    console.error(
      `Ha ocurrido un error conectando con Lavalink -> ${err.message}`
    )
  );

cliente.reproductor.on('error', (err, node) => {
  console.log(
    `Ha ocurrido el siguiente error -> ${err.message}, en el nodo ${node}`
  );
});
