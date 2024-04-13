import React, { ReactNode, useState, useEffect } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import checkInnerWidth from "../hooks/helpers/checkInnerWidth";

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children: ReactNode
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth * .4);

    let resizableProps: ResizableBoxProps;

    useEffect(() => {
        let timer: any;

        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
                if (window.innerWidth * .46 < width) {
                    setWidth(window.innerWidth * .46)
                }
            }, 100)
        }

        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener)
        }
    }, [])

    if (checkInnerWidth(768)) {
        if (direction === "vertical") {
            resizableProps = {
                width: Infinity,
                height: 300,
                resizeHandles: ["s"],
                maxConstraints: [Infinity, innerHeight * .9],
                minConstraints: [Infinity, 60],
               
            };
        } else {
            resizableProps = {
                className: "resize-horizontal",
                width,
                height: Infinity,
                resizeHandles: ["e"],
                maxConstraints: [innerWidth * .45, Infinity],
                minConstraints: [innerWidth * .12, Infinity],
                onResizeStop: (event, data) => {
                    setWidth(data.size.width);
                }
            };
        }
    } else {
        resizableProps = {
            width: Infinity,
            height: 100,
            resizeHandles: ["s"],
            maxConstraints: [Infinity, innerHeight * .9],
            minConstraints: [Infinity, 60],
           
        };
    }
  



    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;