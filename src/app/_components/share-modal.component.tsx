"use client"

import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, InstapaperIcon, InstapaperShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "@mui/material";
import { data } from "autoprefixer";

export const ShareModalContext = createContext<{
    showShareModal: boolean,
    url: string,
    setShowShareModal: (isShowing: boolean, data: string) => void
}>({
    showShareModal: false,
    url: "",
    setShowShareModal: () => { }
});

export const ShareModalProvider = ({ children }: PropsWithChildren) => {
    const [isShowing, setIsShowing] = useState(false);
    const [url, setURL] = useState("");

    const setShowShareModal = (isShowing: boolean, data: string) => {
        setIsShowing(isShowing);
        setURL(data);
    }

    return (
        <ShareModalContext.Provider value={{
            showShareModal: isShowing,
            url: url,
            setShowShareModal
        }}>
            {children}
            <ShareModal url={url} />
        </ShareModalContext.Provider>
    )
}

export const useShareModal = () => useContext(ShareModalContext);

export default function ShareModal({ url }: { url: string }) {
    const { showShareModal, setShowShareModal } = useShareModal();

    const iconSize = 50;

    const close = () => {
        setShowShareModal(false, url)
    }

    return (
        <Drawer open={showShareModal} anchor="bottom" onClose={close}>
            <div className="p-3">
                <div className="flex mb-2">
                    <label className="text-onSurface text-lg font-bold grow">Share</label>
                    <button onClick={close}>
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
            </div>
        </Drawer>
    );
}