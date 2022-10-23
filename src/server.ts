import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

type User = {
  id: string
  name: string
}

const userList: User[] = [
  {
    id: '1',
    name: 'KAT',
  },
]

const appRouter = t.router({
  userById: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'string') {
        return val
      }

      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query(req => {
      const { input } = req

      const user = userList.find(u => u.id === input)

      return user
    }),

  createUser: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(req => {
      const id = `${Math.random()}`
      const user: User = {
        id,
        name: req.input.name,
      }

      userList.push(user)

      return user
    }),
})

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter
