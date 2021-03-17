import {
  createTransportApi,
  createTransportHandler,
  MemoryTransport,
} from '@cheep/transport'
import { NatsTransport } from '@cheep/transport-nats'
import { UserApi } from './user.api'

async function run() {
  const transport = new NatsTransport({
    moduleName: 'Server',
  })

  const handler = createTransportHandler<UserApi>(transport)
  const api = createTransportApi<UserApi>(transport)

  await transport.init()

  handler.on(
    x => x.Event.User.loggedIn,
    (_, payload) => {
      console.log('User logged in event', payload)
    },
  )

  await transport.start()

  const result = await api.execute.Command.User.login({
    username: 'Me',
    password: 'Me',
  })

  console.log('result', result)

  await transport.dispose()
}

run()
