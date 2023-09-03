"use client"

import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";
import MobileModal, { MobileModalType } from "./modal.component";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, InstapaperIcon, InstapaperShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const ShareModalContext = createContext<{
    showShareModal: boolean,
    setShowShareModal: (isShowing: boolean) => void
}>({
    showShareModal: false,
    setShowShareModal: () => { }
});

export const ShareModalProvider = ({ children }: PropsWithChildren) => {
    const [showShareModal, setShowShareModal] = useState(false);

    return (
        <ShareModalContext.Provider value={{
            showShareModal,
            setShowShareModal
        }}>
            {children}
            <ShareModal />
        </ShareModalContext.Provider>
    )
}

export const useShareModal = () => useContext(ShareModalContext);

export default function ShareModal() {
    const { showShareModal, setShowShareModal } = useShareModal();

    const modalRef = useRef<MobileModalType>(null);
    const iconSize = 50;
    const url = "";

    useEffect(() => {
        if (modalRef.current) {
            if (showShareModal) {
                modalRef.current?.prompt();
            } else {
                modalRef.current?.close();
            }
        }
    }, [showShareModal, modalRef.current]);

    return (
        <MobileModal ref={modalRef} onChange={(isShowing) => setShowShareModal(isShowing)}>
            <div className="flex mb-2">
                <label className="text-onSurface text-lg font-bold grow">Share</label>
                <button onClick={() => modalRef.current?.close()}>
                    <FontAwesomeIcon className="text-onSurface" icon={faClose} fontSize={20} />
                </button>
            </div>
            <div className="flex justify-center gap-5">
                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={iconSize} round />
                </WhatsappShareButton>
                <FacebookShareButton url={url}>
                    <FacebookIcon size={iconSize} round />
                </FacebookShareButton>
                <TwitterShareButton url={url}>
                    <TwitterIcon size={iconSize} round />
                </TwitterShareButton>
                <EmailShareButton url={url}>
                    <EmailIcon size={iconSize} round />
                </EmailShareButton>
                <TelegramShareButton url={url}>
                    <TelegramIcon size={iconSize} round />
                </TelegramShareButton>
            </div>
        </MobileModal>
    );
}