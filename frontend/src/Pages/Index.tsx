import Button from "../Components/Button";
import { FaCode } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
    const [getStarted, setGetStarted] = useState<boolean>(false);

    const handleRedirectToLoginPage = () => {
        window.location.href = "/login";
    };

    const handleRedirectToRegisterPage = () => {
        setGetStarted(true);
        window.location.href = "/Register";
    };

    return (
        <div className="flex flex-col">
            {/* Fade out the content when the user clicks "Get started" */}
            <div
                className={`fade ${getStarted ? "opacity-0" : "opacity-100"}`}
            >
                <div className={"bg-black flex p-4"}>
                    <ul className={"flex justify-between mt-auto mb-auto gap-4"}>
                        <li className={"text-white"}>
                            <a href={"/whatIsResin"}>
                                What is{" "}
                                <span className={"text-red-400 hover:text-yellow-400 font-bold"}>
                  Resin
                </span>
                            </a>
                        </li>
                        <li className={"text-white"}>
                            <a href={"/github"}>Github</a>
                        </li>
                        <li className={"text-white"}>
                            <a href={"/donate"}>Donate</a>
                        </li>
                    </ul>
                    <Button
                        text={"Login"}
                        className={"ml-auto"}
                        onClick={handleRedirectToLoginPage}
                    />
                </div>
                <h1 className={"text-4xl mt-40 text-center font-bold animate-bounce"}>
                    Welcome to <span className={"text-red-400"}>Resin</span>
                </h1>
                <img
                    className={"flex m-auto hover:animate-spin"}
                    src="https://user-images.githubusercontent.com/67049621/230255936-32cb7b13-a556-403b-8bbd-bcd357a99268.svg"
                    width="250"
                    alt={"ResinLogo"}
                />
                <Button
                    text={"Get started"}
                    className={"mt-4 m-auto"}
                    icon={<FaCode className={"mt-1 ml-2"} />}
                    onClick={handleRedirectToRegisterPage}
                />
            </div>
        </div>
    );
};

export default Index;
