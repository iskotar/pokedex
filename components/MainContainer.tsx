import Head from "next/head";
import Link from "next/link";

interface IProps {
    children: any
    keywords: string
    title: string
}

const MainContainer = ({children, keywords, title}: IProps) => {

    return (
        <>
            <Head>
                <meta name={"Ivan Skotar, nextjs" + keywords}/>
                <title>{title}</title>
            </Head>

            <div className="navbar">
                <div className='container'>
                    <Link href='/' >
                        <a>Pokemon list</a>
                    </Link>
                </div>
            </div>

            <div className='container'>
                {children}
            </div>
        </>
    );
}

export default MainContainer;
