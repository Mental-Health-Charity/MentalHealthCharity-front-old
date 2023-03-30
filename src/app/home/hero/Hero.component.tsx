import Link from "next/link";

const Hero = () => {
    
    return (
        <main>
            <h1>Stowarzyszenie Juz Lepiej</h1>
            <h2>Przybywam w celu:</h2>
            <Link about="Panel wolontariusza" href={"/volunteer"}>Uzyskania pomocy</Link>
            <Link about="Panel podopiecznego" href={"/mentee"}>Niesienia pomocy</Link>

        </main>
    )
};

export default Hero;