import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {SyntaxHighlightingScheme} from "./Schemes/SyntaxHighlightingScheme";
import * as fs from "fs";

function App() {
    const [code, setCode] = useState('');
    const preRef = useRef<HTMLPreElement>(null);
    const [selectedCode, setSelectedCode] = useState('');

    const [linesCounter, setLinesCounter] = useState<number>(1);

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
        function handleKeyDown(event: any) {
            switch (event.code) {
                case 'Enter':
                    printNewLine(linesCounter);
                    break;
                case 'Space':
                    setCode(code => code + ' ');
                    break;
                case 'Backspace':
                    if (selectedCode.length > 0) {
                        setCode(code => code.replace(selectedCode, ""))
                        setSelectedCode("");
                    } else {
                        const codeLines = code.split("\n");
                        if(codeLines[linesCounter - 1].endsWith(`${linesCounter - 1}.`)){
                            setLinesCounter(linesCounter => linesCounter - 1);
                            setCode((code) => code.slice(0, -((`${linesCounter.toString()}.`).length + 1)));
                        }else{
                            setCode((code) => code.slice(0, -1));
                        }
                    }
                    break;
                case 'IntlBackslash':
                    if(event.shiftKey){
                        setCode(code => code + '>');
                    }else{
                        setCode(code => code + '<');
                    }
                    break;
                case 'Tab':
                    event.preventDefault();
                    setCode(code => code + "    ");
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
                    setCode((code) => code + letter);
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

    const printNewLine = (linesCounter:number) => {
        setLinesCounter(linesCounter => linesCounter + 1);
        const newLine = `${linesCounter}.`;
        setCode(code => code + `\n${newLine}`);
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
        console.log(selectedCode)
    }

    useEffect(() => {
        if (preRef.current) {
            preRef.current.focus();
        }
    }, []);

    return (
        <div className="App">
            <pre ref={preRef} className="code" onSelect={handleSelect}>
        {code}
          <span className="cursor bg-black absolute w-1 h-4 mt-0.5 animate-pulse duration-0" />
      </pre>
        </div>
    );
}

export default App;
