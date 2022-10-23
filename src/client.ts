import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from './server'

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080',
    }),
  ],
})

async function main() {
  const greet = await trpc.greet.query('yo')

  console.log(greet.greeting)

  const user = await trpc.userById.query('1')

  if (user) {
    console.log('user found')
    console.log(user?.name)
  } else {
    console.log('user not found')
  }

  const res = await trpc.createUser.mutate({name: 'hoge'})

  console.log(`user created: ${res.name}`)
}

main()
