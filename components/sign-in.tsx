"use client"
import React from 'react';
import { useState } from "react";
import { signIn } from "@/auth";
 
export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <form
      action={async () => {
        "use server"
        await signIn("credentials", {
          // The Credentials provider is non-opinionated. username/password is the simplest use-case,
          // but it can be configured to work with almost any other external authentication mechanisms.
          email,
          password,
        })
      }}
    >
      <label>
        Email
        <input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button type="submit">Sign In</button>
    </form>
  )
}