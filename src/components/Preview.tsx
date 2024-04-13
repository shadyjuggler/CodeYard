import { useEffect, useRef } from "react";

interface PreviewProps {
    code: string,
    error: string
}

const html = `
    <html>
        <head></head>
        <body style="background-color: white">
            <div id="root"></div>
            <script>
                const handleError = (error) => {
                    const root = document.querySelector("#root");
                    root.innerHTML = "<div style='color: #FFFFFF; background-color: #EF9A9A; border: 2px solid red; border-radius: 5px; padding: 15px; height:100%;'>" + "<p><b>Runtime error</b></p>" + error + "</div>";
                    console.error(error);
                };

                window.addEventListener("error", (event) => {
                    event.preventDefault();
                    handleError(event.error);
                })

                window.addEventListener("message", (event) => {
                    try {
                        eval(event.data);
                    } catch (error) {
                        handleError(error);
                    }
                }, false);
            </script>
        </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;

        // Give a bit of time 50ms, to setup iframe "message" event listener
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, "*");
        }, 50)
    }, [code])

    return (
        <div className="preview-wrapper">
            <iframe
                title="preview"
                ref={iframe}
                sandbox='allow-scripts'
            >
            </iframe>
            {error && <div className="preview-error">{error}</div>}
        </div>
    )
}

export default Preview;