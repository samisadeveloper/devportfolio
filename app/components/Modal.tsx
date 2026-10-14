import { ReactNode } from "react";

export default function Modal({content}: {content: ReactNode}) {
        return (
                <dialog>
                        {content}
                </dialog>
        );
}
