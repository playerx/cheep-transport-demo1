import { ApiWithExecutableKeys } from '@cheep/transport'

type Api = {
  User: {
    login: (props: {
      username: string
      password: string
    }) => Promise<boolean>
  }
}

export type UserApi = ApiWithExecutableKeys<Api, 'User'>
