import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (projId: string, cellId: string) => {
    return useTypedSelector((state) => {
        const { data, order } = state.userProjects.projects[projId];
        const orderedCells = order.map(id => data[id]);


        const renderFunc = `
            import _React from "react";
            import _ReactDOM from "react-dom";

            var render = (value) => {
                    const root = document.querySelector("#root");
                    
                    if (typeof value == "object") {
                        if (value.$$typeof && value.props) {
                            _ReactDOM.render(value, root);
                        } else {
                            root.innerHTML = JSON.stringify(value);
                        }
                    } else {
                        root.innerHTML = value;
                    }
                }
        `;
        const renderFuncNoop = "var render = () => {};"
        const cumulativeCode = [];
        for (let c of orderedCells) {
            if (c.type === "code") {
                if (c.id === cellId) {
                    cumulativeCode.push(renderFunc);
                } else {
                    cumulativeCode.push(renderFuncNoop);
                }
                cumulativeCode.push(c.content);
            }
            if (c.id === cellId) {
                break;
            }
        }
        return cumulativeCode;
    }).join("\n")
};