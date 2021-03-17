import {
  createTransportApi,
  createTransportHandler,
  MemoryTransport,
} from '@cheep/transport'
import { UserApi } from './user.api'

async function run() {
  const transport = new MemoryTransport()

  const handler = createTransportHandler<UserApi>(transport)
  const api = createTransportApi<UserApi>(transport)

  await transport.init()

  // transport.on('User.login', ({ payload }) => {
  //   const { username, password } = payload as any

  //   return username === password
  // })

  handler.on(
    x => x.Command.User.login,
    async (api, payload) => {
      const isSuccess = payload.username === payload.password

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

  // const result = await transport.execute({
  //   route: 'User.login',
  //   payload: {
  //     username: 'Me',
  //     password: 'Me',
  //   },
  // })

  const result = await api.execute.Command.User.login({
    username: 'Me',
    password: 'Me',
  })

  console.log('result', result)

  await transport.dispose()
}

run()
