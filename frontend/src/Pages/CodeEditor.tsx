import React, {useState, useEffect, useRef} from 'react';
import '../App.css';
import {SyntaxHighlightingScheme} from "../Schemas/SyntaxHighlightingScheme";
import * as fs from "fs";
import Navbar from "../Components/Navbar";
import FileManager from "../Components/FileManager";

function CodeEditor() {
    const [code, setCode] = useState('');
    const preRef = useRef<HTMLPreElement>(null);
    const [selectedCode, setSelectedCode] = useState('');

    const [linesCounter, setLinesCounter] = useState<number>(1);
    const [currentLine, setCurrentLine] = useState<number>(1);

    function getSyntaxHighlightingSchemeForExtension(extension: string): SyntaxHighlightingScheme | null {
        // Read the syntax highlighting data from the JSON file
        const syntaxHighlightingData = fs.readFileSync('./ReservedWords/reservedWords.json', 'utf8');

        // Parse the JSON data into a JavaScript object
        const syntaxHighlightingSchemes = JSON.parse(syntaxHighlightingData);

        // Find the syntax highlighting scheme that matches the given extension
        const matchingScheme = syntaxHighlightingSchemes.find((scheme: SyntaxHighlightingScheme) => {
            return scheme.fileExtensions.includes(extension);
        });

        // Return the matching syntax highlighting scheme, or null if no matching scheme was found
        return matchingScheme || null;
    }

    useEffect(() => {
        console.log(currentLine);
        selectLine(currentLine)
    }, [currentLine])

    useEffect(() => {
        function handleKeyDown(event: any) {
            if (event.code == ' ' || event.code == '') return;
            let textToAdd;
            switch (event.code) {
                case 'Enter':
                    printNewLine();
                    break;
                case 'Space':
/*
                    setCode(code => code + ' ');
*/
                    break;
                case 'Backspace':
                    removeLine()
/*                    if (selectedCode.length > 0) {
                        setCode(code => code.replace(selectedCode, ""))
                        setSelectedCode("");
                    } else {
                        const codeLines = code.split("\n");
                        if (codeLines[linesCounter - 1].endsWith(`${linesCounter - 1}.`)) {
                            setLinesCounter(linesCounter => linesCounter - 1);
                            setCode((code) => code.slice(0, -((`${linesCounter.toString()}.`).length + 1)));
                        } else {
                            setCode((code) => code.slice(0, -1));
                        }
                    }*/
                    break;
                case 'IntlBackslash':
/*                    if (event.shiftKey) {
                        setCode(code => code + '>');
                    } else {
                        setCode(code => code + '<');
                    }*/
                    break;
                case 'Tab':
                    event.preventDefault();
                    textToAdd = "   ";
                    break;
                case 'ControlLeft':
                    break;
                case 'ShiftLeft':
                    break;
                case 'ShiftRight':
                    break;
                default:
                    let letter = event.getModifierState("CapsLock") || event.shiftKey
                        ? event.code.toUpperCase().replace("KEY", "")
                        : event.code.toLowerCase().replace("key", "");
                    let codeSplited = code.split(" ");
                    let lastWord = codeSplited[codeSplited.length - 1];
                    textToAdd = letter;
            }
            console.log(event.code)
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mouseup', handleSelect);


        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mouseup', handleSelect);
        };
    }, [code, selectedCode]);

    const printNewLine = () => {
        setLinesCounter(linesCounter => linesCounter + 1);
        setCurrentLine(currentLine => currentLine + 1);
    }

    const removeLine = () => {
        if(currentLine <= 1 || linesCounter <= 1) return;
        setLinesCounter(linesCounter => linesCounter - 1);
        setCurrentLine(currentLine => currentLine - 1);
    }

    const selectLine = (line:number) => {
        const currentLineEl = document.querySelector(`[key='${line}']`);
        if(currentLineEl) {
            currentLineEl.classList.add('bg-red-400');
        }
    }


    function handleSelect() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();
            setSelectedCode(selectedText);
        } else {
            setSelectedCode('');
        }
    }

    useEffect(() => {
        if (preRef.current) {
            preRef.current.focus();
        }
    }, []);

    return (
        <>
            <div className="App max-h-screen overflow-hidden">
                <Navbar/>
                <div className={"flex"}>
                    <pre ref={preRef} className="code flex h-auto" onSelect={handleSelect}>
                        <FileManager/>
                        <div id={"lineNumbers"} className={"border-r-2 p-2 pt-0"}>
                        {Array.from({ length: linesCounter }, (_, i) => (
                            <div key={i} className={`${i + 1 === currentLine ? "active-line-number" : ""}`}>
                                {i + 1}.
                            </div>
                        ))}
                        </div>
                        <div id={"codeLines"} className={"ml-2"}>
                            <div>
                                <span>const</span>
                                <span>funcao</span>
                                <span>=</span>
                                <span>()</span>
                                <span>{"=>"}</span>
                                <span>{"{"}</span>
                            </div>
                            <div>
                                line 2
                            </div>
                            <div>
                                line 3
                            </div>
                            <div>
                                line 4<span className="cursor bg-black absolute w-1 h-4 mt-0.5 animate-pulse duration-0"/>
                            </div>
                        </div>
                    </pre>
                </div>
            </div>
        </>

    );
}

export default CodeEditor;
