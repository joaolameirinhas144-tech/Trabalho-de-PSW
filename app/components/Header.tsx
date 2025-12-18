import Link from "next/link";
import "../@header/Header.css";

type HeaderProps = {
    project_name: string;
    my_name: string;
};

export default function Header({ project_name, my_name }: HeaderProps) {
    return (
        <header className="header">
            <div className="headerInner">

                <img
                    src="https://logos-world.net/wp-content/uploads/2020/05/Avengers-Symbol.jpg"
                    alt="logo"
                    className="header_logo"
                />

                <div>
                    <h1>{project_name}</h1>
                    <h3>by {my_name}</h3>
                </div>

                <nav className="nav">
                    {/* Link para a rota raiz (/) */}
                    <Link href="/">Home</Link>
                    {}
                    <Link href="/dashboard">Dashboard</Link>
                </nav>

            </div>
        </header>
    );
}