import { boot } from 'quasar/wrappers';
import wSocket from 'vue-native-websocket-vue3';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  const port = 3080;
  app.use(wSocket, `ws://${window.location.hostname}:${port}/wss`, {
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
  });
  // something to do//
});
