"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin() {
        console.log("Login clicked");
        console.log("email:", email);
        console.log("password:", password);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        router.push("/dashboard");
    }

    async function handleSignup() {
        console.log('Sign up clicked');
        const { error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) setError(error.message)
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Login</h1>

            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign Up</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}
