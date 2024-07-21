import React, { useState } from 'react';
import web from '../utils/web'
import InitialFormModal from './InitialFormModal';
import TutupKasirModal from './TutupKasirModal';

const LeftSidebar = props => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTupKasIsOpen, setModalTupKasIsOpen] = useState(false);

    const openModal = async () => {
        try {
            const response = await web.get('/checkUserTransaction');
            const { hasTransaction } = response.data;

            if (hasTransaction === '1') {
                if (window.confirm('Apakah Anda ingin menutup kasir?')) {
                    setModalTupKasIsOpen(true);
                }
            } else if(hasTransaction === '0'){
                setModalIsOpen(true);
            }else if(hasTransaction === '2'){
                alert('Anda sudah melakukan tutup kasir, lakukan transaksi di hari berikutnya')
            }
        } catch (error) {
            console.error('Error checking user transaction:', error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeTupKasModal = () => {
        setModalTupKasIsOpen(false);
    };

    const handleSubmit = (data) => {
        console.log('Form submitted', data);
        // Handle form submission logic here
    };

    const logout = async () => {
        if (confirm('Are you sure you want to log out?')) {
            await web.post('/logout')
                .then((response) => {
                    if (response.status === 204) {
                        window.location.reload()
                    } else {
                        alert('Logout error. Please try refresh your browser')
                        console.log(response)
                    }
                })
                .catch((error) => {
                    alert('Logout error. Please try refresh your browser')
                })
        }
    }


    return (
        <div className="w-30 bg-blue-gray-50 flex flex-row flex-shrink-0 pl-4 pr-2 py-4">
            <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-cyan-500 rounded-3xl">
                <a href="#"
                    className="flex items-center justify-center h-12 w-12 bg-cyan-50 text-cyan-700 rounded-full">
                    <img src="img/logo.png" />
                </a>
                <ul className="flex flex-col space-y-2 mt-12">
                    <li>
                        <a href="#"
                            className="flex items-center">
                            <span className="flex items-center justify-center h-12 w-12 rounded-2xl bg-cyan-300 shadow-lg text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            className="flex items-center">
                            <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            className="flex items-center">
                            <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            className="flex items-center">
                            <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
                                <svg className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </span>
                        </a>
                    </li>
                </ul>
                <ul className="flex flex-col space-y-2 mt-auto">
                    <li>
                        <button
                            onClick={logout}
                            type="button"
                            className="flex items-center justify-center text-cyan-200 hover:bg-cyan-400 rounded-2xl h-12 w-12 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={openModal}
                            type="button"
                            className="flex items-center justify-center text-cyan-200 hover:bg-cyan-400 rounded-2xl h-12 w-12 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="24" width="24"><path fill="currentColor" d="M64 0C46.3 0 32 14.3 32 32l0 64c0 17.7 14.3 32 32 32l80 0 0 32-57 0c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4L0 448c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-69.6c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160l-217 0 0-32 80 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32L64 0zM96 48l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L96 80c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16l352 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z"></path></svg>
                        </button>
                    </li>
                    <li>
                        <a
                            href="https://github.com/herilesmana/actiry-pos"
                            target="_blank"
                            className="flex items-center justify-center text-cyan-200 hover:text-cyan-100 h-12 w-12 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <InitialFormModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
            />
            <TutupKasirModal
                isOpen={modalTupKasIsOpen}
                onClose={closeTupKasModal}
            />
        </div>
    )
}

export default LeftSidebar
