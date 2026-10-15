import { Ref } from "react";
import { Project } from "../util/github";

export default function ProjectModal({project, dialogRef}: {project: Project | undefined, dialogRef: Ref<HTMLDialogElement>}) {
        return (
                <dialog ref={dialogRef}>
                        <div>
                                <h1>Project title</h1>
                                <p>insert github README here</p>
                        </div>
                </dialog>
        );
}
