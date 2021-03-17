import {
  createTransportApi,
  createTransportHandler,
  MemoryTransport,
} from '@cheep/transport'
import { NatsTransport } from '@cheep/transport-nats'
import { UserApi } from './user.api'

async function run() {
  const transport = new NatsTransport({
    moduleName: 'User',
  })

  const handler = createTransportHandler<UserApi>(transport)
  const api = createTransportApi<UserApi>(transport)

  await transport.init()

  handler.on(
    x => x.Command.User.login,
    async (api, payload) => {
      const isSuccess = payload.username === payload.password

      console.log('user login', payload.username, isSuccess)

      if (isSuccess) {
        await api.publish.Event.User.loggedIn({
          username: payload.username,
          timestamp: new Date(),
        })
      }

      return isSuccess
    },
  )

  await transport.start()

  // const result = await api.execute.Command.User.login({
  //   username: 'Me',
  //   password: 'Me',
  // })

  // console.log('result', result)

  // await transport.dispose()

  setInterval(() => {}, 1000)
}

run()
