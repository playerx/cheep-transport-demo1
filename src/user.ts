import { MemoryTransport } from '@cheep/transport'

async function run() {
  const transport = new MemoryTransport()

  await transport.init()

  transport.on('User.login', ({ payload }) => {
    const { username, password } = payload as any

    return username === password
  })

  await transport.start()

  const result = await transport.execute({
    route: 'User.login',
    payload: {
      username: 'Me',
      password: 'Me',
    },
  })

  console.log('result', result)

  await transport.dispose()
}

run()
