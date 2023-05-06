import Nav from './Nav'
import styles from '../styles/Layout.module.css'
import { useRouter } from "next/router";

const Layout = ({children}) =>{
    const router = useRouter();
    return(
        <>
            <Nav navItems={["Popular", "Bookmarks"]} path={router.pathname}/>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div>
                    {children}
                    </div>
                </main>
            </div>
        </>
       
    )
}

export default Layout