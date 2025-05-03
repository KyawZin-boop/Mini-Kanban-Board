import { useStore } from '../store';

const Loader = () => {
    const isLoading = useStore(state => state.isLoading)
    return (
        (isLoading) && <section
            className="bg-black/75 fixed top-0 z-[9999] flex items-center justify-center w-screen h-screen overflow-hidden"
        >
            <div className="loader"></div>
        </section>
    )
}

export default Loader;