"use client";
import { Template } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import Mustache from "mustache";
import Link from "next/link";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface Props {
    template: Template;
    userProfile: JsonValue | null;
}

const Resume = ({ template, userProfile }: Props) => {
    console.log(userProfile);
    if (userProfile === undefined) {
        return (
            <h1 className="text-2xl text-emerald-400 font-bold text-center">This user profile does not exist</h1>
        );
    };
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const html = Mustache.render(template.html, userProfile);
    return (<div>
        <div className="flex gap-4 justify-center my-5">
            <Link href={"/"} className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out">Back to templates</Link>
            <button onClick={handlePrint} className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out">Print</button>

        </div>
        < div dangerouslySetInnerHTML={{ __html: html }} ref={componentRef} />
    </div>
    );

}

export default Resume