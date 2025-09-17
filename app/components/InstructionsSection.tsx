'use client'

import { useState } from "react";
import { masterQuery } from "../framework/schema";
import AdditionalInstructions from "./AdditionalInstructions";
import CopyButton from "./CopyButton";
import MasterQueryTextArea from "./MasterQueryTextArea";

const InstructionsSection = () => {
    const [instructions, setInstructions] = useState<string[]>([]);
    const [queryText, setQueryText] = useState(masterQuery);
    const [resetKey, setResetKey] = useState(0);

    const resetQueryTextToDefault = () => {
        setQueryText(masterQuery);
        setResetKey(resetKey + 1);
    };

    return <>
        <MasterQueryTextArea queryText={queryText} setQueryText={setQueryText} reset={resetQueryTextToDefault} resetKey={`${resetKey}`} />
        <AdditionalInstructions instructions={instructions} setInstructions={setInstructions} />
        <CopyButton masterQuery={queryText} additionalInstructions={instructions} />
    </>
};

export default InstructionsSection;
