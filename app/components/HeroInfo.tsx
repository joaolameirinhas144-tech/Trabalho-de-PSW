import "./HeroInfo.css";

interface HeroInfoProps {
    nome: string;
    image: string;
    superpower: string;
}

export default function HeroInfo({ nome, image, superpower }: HeroInfoProps) {
    return (
        <div className="hero-card">
            <img src={image} alt={nome} />
            <h4>{nome}</h4>
            <p>{superpower}</p>
        </div>
    );
}