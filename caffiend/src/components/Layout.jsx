import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"

export default function Layout(props) {
    const { children } = props

    const [showModal, setShowModal] = useState(false)

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p>For Coffee Insatiates</p>
            </div>
            <button onClick={() => { setShowModal(true) }}>
                <p>Sign up free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was made by
                <a target="_blank" href="https://github.com/csdavids519"> Csdavids519 </a>
                with reference to
                <a target="_blank" href="https://github.com/csdavids519"> Smoljames </a>
                tutorial, using the
                <a href="https://www.fantacss.smoljames.com" target="_blank"> FantaCSS </a>
                design library.<br />Check out the project on
                <a target="_black" href="https://github.com/csdavids519/CoffeeTracker">GitHub</a>!
            </p>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}
