
const Manual = () => {
    return (
        <div className="manual">
            <h1 className="title">Quick guide of usage</h1>
            <div className="manual__wrapper">
                <div className="manual__item">
                    <p className="semi">Projects</p>
                    <p className="semibold">You can manage your coding ideas by storing them in projects. <br />Create a new one in the main page.</p>
                    <video className="video-small" autoPlay loop >
                        <source src="./manual_assets/01.webm" type="video/webm" />
                    </video>
                </div>

                <div className="manual__item">
                    <p className="semi">Nodes</p>
                    <p className="semibold">Add new nodes within project page be it text one or code as well. </p>
                    <p className="semibold">Use text nodes as docs for your ideas.</p>
                    <p className="semibold">Code nodes it' clear for. ;) </p>
                    <video className="video-small" autoPlay loop >
                        <source src="./manual_assets/02.webm" type="video/webm" />
                    </video>
                </div>

                <div className="manual__item">
                    <p className="semi">Text nodes</p>
                    <p className="semibold">You can style your docs as you wish using text node toolbar on top of it.</p>
                    <video className="video-large" autoPlay loop>
                        <source src="./manual_assets/04.webm" type="video/webm" />
                    </video>
                    <p className="semibold">Type "#" before your text to create Heading, <br />Type "*" to start List items.</p>
                    <video className="video-large" autoPlay loop>
                        <source src="./manual_assets/03.webm" type="video/webm" />
                    </video>
                </div>

                <div className="manual__item">
                    <p className="semi">Code nodes</p>
                    <p className="semibold">Left part acts like local IDE, so here you can type any Javascript code you would like to.</p>
                    <p className="semibold">You can import npm packages like "React", "JQuery". <br /> Meanwhile css frameworks like 'Bootstrap" or "Bulma" as well.</p>
                    <video className="video-large" autoPlay loop>
                        <source src="./manual_assets/06.webm" type="video/webm" />
                    </video>
                    <p className="semibold">Right part's purpose to execute your code, display any DOM structures or apply styles on it.</p>
                    <video className="video-large" autoPlay loop>
                        <source src="./manual_assets/05.webm" type="video/webm" />
                    </video>
                </div>

                <div className="manual__item">

                    <p className="semi">Keep projects tune.</p>
                    <p className="semibold">You can change title of your project, add description or even delete it if there is such need.</p>
                    <video className="video-small" autoPlay loop >
                        <source src="./manual_assets/07.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default Manual;