"use client"

import { useEffect, useState } from "react"

type User = {
  id: number
  name: string
  email: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  // READ
  const fetchUsers = async () => {
    const res = await fetch("/api/users")
    const data = await res.json()
    setUsers(data)
  }

  // CREATE
  const createUser = async () => {
    if (!name || !email) return

    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    })

    setName("")
    setEmail("")
    fetchUsers()
  }

  // DELETE
  const deleteUser = async (id: number) => {
    await fetch("/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>User CRUD (Prisma + Next.js)</h1>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={createUser}>Add</button>
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
