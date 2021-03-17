import { MemoryTransport } from '@cheep/transport'

async function run() {
  const transport = new MemoryTransport()

  await transport.init()

  transport.on('PING', () => {
    console.log('received PING')

    return 'PONG'
  })

  await transport.start()

  const result = await transport.execute({
    route: 'PING',
    payload: {},
  })

  console.log('result', result)

  await transport.stop()

  await transport.dispose()
}

run()
