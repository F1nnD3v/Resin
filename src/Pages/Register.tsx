import Input from "../Components/Input"
import {useEffect, useState} from "react";
import getRandomValueFromArray from "../Functions/GetRandomValueFromArray";
import {MdAlternateEmail, MdEmail, MdLock, MdLockReset} from "react-icons/md";
import {BsCheckLg, BsFillPersonFill} from "react-icons/bs";
import passwordStrength from "../Functions/PasswordStrength";
import Button from "../Components/Button";
import {IoIosArrowForward} from "react-icons/io";


const Register = () => {

    //This states are just for the visuals
    const [usernamePlaceholder, setUsernamePlaceholder] = useState<string>();
    const [emailPlaceholder, setEmailPlaceholder] = useState<string>();
    const [displayNamePlaceholder, setDisplayNamePlaceholder] = useState<string>();
    const [hovering, setHovering] = useState<boolean>();

    //Field "variables"
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("")
    const [psw, setPsw] = useState<string>("")
    const [confPsw, setConfPsw] = useState<string>("")

    //This arrays are just for visuals
    const funnyUsernames: string[] = [
        "ProCoder1337",
        "CodeNinjaWarrior",
        "ByteMeMaybe",
        "FunctionJunction",
        "JavaTheHut",
        "CodeMonkey",
        "SyntaxError404",
        "BinaryBard",
        "CSharpShooter",
        "PythonPirate",
        "CtrlAltDefeat",
        "TheCodeFather",
        "DebuggingDiva",
        "CSSninja",
        "HackerAtHeart",
        "JavaScriptJester",
        "RubyRascal",
        "CodeCrusader",
        "HTMLHero",
        "ProgrammerPirate",
        "TheCodingCactus"
    ];
    const funnyDisplayNames: string[] = [
        "CaptainKeyboard",
        "TheCodingChimp",
        "CodeCommander",
        "PixelPirate",
        "TheBugBuster",
        "JavaJester",
        "CodeCowboy",
        "HackerHoney",
        "TheScriptSupervisor",
        "BugHunterExtraordinaire",
    ];
    const funnyEmails: string[] = [
        "codingqueen@example.com",
        "bytebuddy@gmail.com",
        "functionfun@yahoo.com",
        "csssavage@hotmail.com",
        "hackerheartbreaker@outlook.com",
        "javanator@aol.com",
        "rubyrascal@icloud.com",
        "codercoast2coast@protonmail.com",
        "programmerpirate@example.net",
        "thecodingcactus@gmail.com",
    ];

    useEffect(() => {
        setUsernamePlaceholder(getRandomValueFromArray(funnyUsernames));
        setDisplayNamePlaceholder(getRandomValueFromArray(funnyDisplayNames));
        setEmailPlaceholder(getRandomValueFromArray(funnyEmails));
    }, []);

    const handlePswChange = (event: any) => {
        setPsw(event.currentTarget.value);
    }

    return (
        <>
            <div className={`flex flex-col p-10 mt-10 shadow-lg rounded-md w-2/5 mx-auto`}>
                <h1 className={"text-center text-4xl text-black font-bold"}>Register</h1>
                <span className={"h-0.5 w-full bg-gray-200 my-4"}/>
                <div className={"flex justify-center"}>
                    <div className={"bg-gray-200 rounded-full h-10 w-10"}>
                        <p className={"text-center mt-2"}>1</p>
                    </div>
                    <div className={"bg-gray-200 h-2 w-32 my-auto"}/>
                    <div className={"bg-gray-200 rounded-full h-10 w-10"}>
                        <p className={"text-center mt-2"}>2</p>
                    </div>
                    <div className={"bg-gray-200 h-2 w-32 my-auto"}/>
                    <div className={"bg-gray-200 rounded-full h-10 w-10"}>
                        <p className={"text-center mt-2"}>3</p>
                    </div>
                </div>
                <Input label={"Username"} placeholder={usernamePlaceholder} icon={<MdAlternateEmail/>}/>
                <Input label={"E-mail"} placeholder={emailPlaceholder} icon={<MdEmail/>}/>
                <Input label={"Display name"} placeholder={displayNamePlaceholder} icon={<BsFillPersonFill/>}/>
                <Input label={"Password"} placeholder={"Password"} icon={<MdLock/>}
                       onChange={(e: any) => handlePswChange(e)}/>
                <Input label={"Repeat password"} placeholder={"Password"} icon={<MdLockReset/>}/>
                <div className={"mt-4"}>
                    <div
                        className={`h-2 w-${passwordStrength(psw).numMatches || 1}/5 rounded-md ${passwordStrength(psw).strength === "Very weak" ?
                            "bg-red-600"
                            :
                            passwordStrength(psw).strength === "Weak" ?
                                "bg-red-400"
                                :
                                passwordStrength(psw).strength === "Moderate" ?
                                    "bg-yellow-400"
                                    :
                                    passwordStrength(psw).strength === "Strong" ?
                                        "bg-green-400"
                                        :
                                        "bg-green-600"
                        }`}/>
                </div>
                <Button text={"Next"} icon={<IoIosArrowForward
                    className={`my-auto transition ease-in duration-500  ${hovering ? "translate-x-4" : "translate-x-0"}`}/>}
                        className={`text-center w-1/5 mt-4 flex justify-center mx-auto bg-green-400 transform-gpu`}
                        onHover={() => setHovering(true)} onMouseOut={() => setHovering(false)}/>
            </div>
        </>
    );
};

export default Register