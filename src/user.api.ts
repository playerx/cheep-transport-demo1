import { ApiWithExecutableKeys } from '@cheep/transport'

type Api = {
  Command: {
    User: {
      login: (props: {
        username: string
        password: string
      }) => Promise<boolean>
    }
  }

  Event: {
    User: {
      loggedIn: (props: { username: string; timestamp: Date }) => void
    }
  }
}

export type UserApi = ApiWithExecutableKeys<Api, 'Command'>
