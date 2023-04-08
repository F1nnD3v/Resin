import React, {useState, useEffect} from "react";

const FileManager = () => {
    const [contextMenu, setContextMenu] = useState({x: -2000, y: -2000});

    const handleContextMenu = (e: any) => {
        e.preventDefault();
        setContextMenu({x: e.clientX, y: e.clientY});
        console.log(contextMenu)
    };

    return (
        <div
            onContextMenu={handleContextMenu}
            className="bg-black text-white mr-4 pt-2 pl-4 pr-4 h-full mt-auto max-h-screen min-h-screen"
        >
            <p className="text-lg font-bold mb-4">{"{Project_name}"}</p>
            <div className="bg-gray-400 h-0.5 my-1"/>
            <div>
                {contextMenu && (
                    <div
                        id={"fileManager"}
                        className={"bg-gray-800 p-4 rounded-md"}
                        style={{ position: "absolute", left: contextMenu.x, top: contextMenu.y }}
                    >
                        This is the context menu
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileManager;
