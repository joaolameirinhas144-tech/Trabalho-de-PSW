"use client";

import Link from "next/link";
import "./Header.css";

interface InfoProps {
    my_name: "João";
    my_project: "League of Heroes"
}

export default function Header() {
    return (
        <header className="header">
            <div className="headerInner">

                <img
                    src="https://logos-world.net/wp-content/uploads/2020/05/Avengers-Symbol.jpg"
                    alt="logo"
                    className="header_logo"
                />

                <div>
                    <h1>League Of Heroes</h1>
                    <h3>By João Lameirinhas</h3>
                </div>

                <nav className="nav">

                    <Link href="/">Home</Link>
                    {}
                    <Link href="/dashboard">Dashboard</Link>
                </nav>

            </div>
        </header>
    );
}