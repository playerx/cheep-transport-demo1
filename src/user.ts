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
    x => x.User.login,
    (_, payload) => {
      return payload.username === payload.password
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

  const result = await api.execute.User.login({
    username: 'Me',
    password: 'Me',
  })

  console.log('result', result)

  await transport.dispose()
}

run()
