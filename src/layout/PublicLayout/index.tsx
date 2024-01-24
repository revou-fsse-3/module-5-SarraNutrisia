import { ReactNode } from "react"
import { Navbar } from "@/components";

interface Props {
    children: ReactNode;
}


const PublicLayout = ({ children }: Props) => {

    return (
        <main>
            <Navbar/>
            {children}
        </main>
    )
}

export default PublicLayout
