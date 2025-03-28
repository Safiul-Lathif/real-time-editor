import React, { useState, useEffect, useRef } from 'react';
import './editor.css';
import bgImage from "../../assets/profile-bg.png";
import appLogo from "../../assets/app_logo_with_bg.png";
import home from "../../assets/home.png";
import share from "../../assets/share.png";
import submit from "../../assets/submit.png";
import chat from "../../assets/chat.png";
import HorizontalDivider from '../../components/divider';
import Home from "../../pages/index";
import Handler from '../../api/add_edit_api';
import { useParams, useNavigate } from 'react-router-dom';
import { Add, AttachEmail, AttachFile } from '@mui/icons-material';
import bold from "../../assets/editorOptions/Bold.png";
import italic from "../../assets/editorOptions/italic.png";
import underline from "../../assets/editorOptions/Underline.png";
import link from "../../assets/editorOptions/Link.png";
import image from "../../assets/editorOptions/Image.png";
import tag from "../../assets/editorOptions/tag_svgrepo.com.png";
import calculator from "../../assets/editorOptions/math.png";
import music from "../../assets/editorOptions/omega-square.png";
import table from "../../assets/editorOptions/insert-table.png";
import align from "../../assets/editorOptions/align.png";
import list from "../../assets/editorOptions/List.png";
import intentLeft from "../../assets/editorOptions/Indent Left.png";
import intentRight from "../../assets/editorOptions/IndentRight.png";
import numberList from "../../assets/editorOptions/NumberList.png";
import undo from "../../assets/editorOptions/Arrow.png";
import redo from "../../assets/editorOptions/back_line.png";
import { FaMicrophone, FaPaperPlane, FaSmile } from 'react-icons/fa'; // Import icons
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import AuthorCard from '../../components/autherCard';

const Header = ({ mode, setMode, navigate, handleSubmit, isChat, setChat }) => (
    <div style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 62,
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderBottom: '2px solid #fff',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.15)',
    }}>
        <div className="left-section">
            <img
                src={appLogo}
                alt="Research Pick Logo"
                style={{
                    height: 50,
                    padding: "5px 5px"
                }}
            />
            <div style={{
                display: 'flex',
                gap: 10,
                paddingRight: "10px"
            }}>
                <HorizontalDivider />
                <img
                    onClick={() => navigate("/")}
                    src={home} alt="home" style={{
                        filter: "brightness(0) saturate(100%) invert(100%)", /* White */
                    }} />
                <HorizontalDivider />
            </div>
            <div style={{
                display: 'flex',
                borderRadius: '30px',
                backgroundColor: 'white',
                padding: '3px 5px 3px 0px',
            }}>
                {['Visual Editor', 'Review', 'Portal Question'].map((label, index) => (
                    <button key={label} className="top-button"
                        style={{
                            borderRadius: '30px',
                            backgroundColor: mode === index ? '#41075c' : 'white',
                            color: mode === index ? 'white' : '#41075c',
                            fontWeight: 'bold'
                        }}
                        onClick={() => setMode(index)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
        <div className="right-section">
            <HorizontalDivider />
            <ButtonWithIcon icon={share} text="Share" />
            <HorizontalDivider />
            <ButtonWithIcon icon={submit} text="Submit" onClick={handleSubmit} />
            <HorizontalDivider />
            <div style={{ backgroundColor: isChat ? "#fec000" : "inherit", margin: "0px 10px", borderRadius: "10px", color: isChat ? "#41075c" : "inherit" }}>
                <ButtonWithIcon icon={chat} text="Chat" onClick={() => setChat(!isChat)} isChat={isChat} />
            </div>
        </div>
    </div>
);

const Toolbar = ({ pixelValue, setPixelValue, editorType, setEditorType }) => (
    <div style={{
        display: 'flex',
        backgroundColor: "white",
        border: "none",
        margin: "0px 10px",
        borderRadius: "25px",
        padding: "0px 10px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#41075c",
        transition: "all 0.3s ease",
        ":hover": {
            backgroundColor: "#41075c",
            color: "white",
        },
        boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.15)",
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={redo} alt="redo" />
            <img src={undo} alt="undo" />
            <select style={{ padding: '5px', borderRadius: '10px', border: '1px solid #ccc' }}>
                <option value="100">100%</option>
                <option value="120">120%</option>
                <option value="140">140%</option>
            </select>
            <HorizontalDivider />
            <select style={{ padding: '5px', borderRadius: '10px', border: '1px solid #ccc' }}>
                <option value="1">Normal Text</option>
                <option value="2">Section</option>
                <option value="3">Subsection</option>
                <option value="4">Sub-subsection</option>
                <option value="5">Paragraph</option>
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <button
                    style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        ":hover": {
                            backgroundColor: '#f0f0f0',
                        }
                    }}
                    onClick={() => setPixelValue(prev => Math.max(prev - 1, 0))}
                >
                    -
                </button>
                <span>{pixelValue}</span>
                <button
                    style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        ":hover": {
                            backgroundColor: '#f0f0f0',
                        }
                    }}
                    onClick={() => setPixelValue(prev => prev + 1)}
                >
                    +
                </button>
            </div>
            <HorizontalDivider />
            {[
                { icon: bold, type: "bold" },
                { icon: italic, type: "italic" },
                { icon: underline, type: "underline" },
                { icon: calculator, type: "math" },
                { icon: music, type: "music" },
                { icon: link, type: "link" },
                { icon: tag, type: "tag" },
                { icon: image, type: "image" },
                { icon: table, type: "table" },
                { icon: align, type: "align" },
                { icon: intentLeft, type: "internLeft" },
                { icon: intentRight, type: "internRight" },
                { icon: list, type: "list" },
                { icon: numberList, type: "numberList" },
            ].map(({ icon, type }) => (
                <img key={type} src={icon} alt={type}
                    style={{
                        borderRadius: "5px",
                        padding: "2px",
                        backgroundColor: editorType === type ? "lightgray" : "transparent"
                    }}
                    onClick={() => setEditorType(type)}
                />
            ))}
        </div>
    </div>
);

const Sidebar = ({ pixelValue, setPixelValue, editorType, setEditorType }) => (
    <div style={{
        backgroundColor: "#f0f0f0",
        padding: "18px 15px 3px 15px",
        height: "calc(100vh - 62px)",
        display: "flex",
        justifyContent: "space-between",
    }}>
        <button style={{
            backgroundColor: "white",
            border: "none",
            padding: "0px 10px",
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#41075c",
            transition: "all 0.3s ease",
            ":hover": {
                backgroundColor: "#41075c",
                color: "white",
            },
            boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.15)",
            width: "280px"
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p>Document Sections</p>
                <Add />
            </div>
        </button>
        <Toolbar pixelValue={pixelValue} setPixelValue={setPixelValue} editorType={editorType} setEditorType={setEditorType} />
        <div style={{
            display: 'flex',
            backgroundColor: "white",
            border: "none",
            padding: '3px 5px 3px 0px',
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#41075c",
            transition: "all 0.3s ease",
            ":hover": {
                backgroundColor: "#41075c",
                color: "white",
            },
            boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.15)",
            width: "270px",
            justifyContent: "space-between",
        }}>
            {['Comments', 'Modifications'].map((label, index) => (
                <button key={label} className="top-button"
                    style={{
                        borderRadius: '30px',
                        backgroundColor: index === 0 ? '#41075c' : 'white',
                        color: index === 0 ? 'white' : '#41075c',
                        fontWeight: 'bold',
                        fontSize: "14px",
                        padding: "0px 20px"
                    }}
                    onClick={() => { }}
                >
                    {label}
                </button>
            ))}
        </div>
    </div>
);

const ButtonWithIcon = ({ icon, text, onClick, isChat }) => (
    <button className={isChat ? "top-button-active" : "top-button"} onClick={onClick}>
        <img src={icon}
            style={{
                filter: isChat ? "" : "brightness(0) saturate(100%) invert(100%)",
                height: '25px',
            }}
            alt={text.toLowerCase()}
        /> {text}
    </button>
);

function EditorPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState(0);
    const [type, setType] = useState(0);
    const [isEdit, setIsEdit] = useState(true);
    const [pixelValue, setPixelValue] = useState(12);
    const [editorType, setEditorType] = useState("bold");
    const ref = useRef(null);
    const { id } = useParams();
    const [isChat, setChat] = useState(false);

    const handleSubmit = async () => {
        if (ref.current) {
            let savedData = await ref.current.save();
            let map = {
                time: savedData.time,
                blocks: savedData.blocks,
                version: savedData.version,
            };
            try {
                const firstBlock = map.blocks[0];
                const title = firstBlock.data.text ? firstBlock.data.text : "";
                Handler({ newPost: map, isEdit: isEdit, id: id, title: title, navigate: navigate });
            } catch (error) {
                console.error("error  data:", error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (id === "new") {
                setIsEdit(false);
            } else {
                setIsEdit(true);
            }
        };
        fetchData();
    }, [id, isEdit]);
    const auth = { user: { id: 1 } }; // Replace with your actual auth object



    useEffect(() => {
        window.Pusher = Pusher;
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: "2ae2e982409c3e397b85", // Replace with your Pusher app key
            cluster: "ap2", // Replace with your Pusher cluster
            wsHost: "http://poc.researchpick.com/",
            // wsPort: 6001,
            forceTLS: false,
            disableStats: true,
        });
        // Assuming you have the authenticated user's ID available:
        const userId = 3;
        console.log("userId:", userId);
        window.Echo.channel(`user.${userId}`).listen('MessageEvent', (event) => {
            console.log('MessageEvent Event:', event);
            // setMessages((oldMessages) => [...oldMessages, event.message]);
        });
        console.log("userId  hs:", userId);


        // window.Echo.private(`user.${userId}`)
        //     .listen('UserUpdated', (event) => {
        //         console.log('User Updated Event:', event);
        //         // Handle the received data
        //     });
        // if (auth.user && auth.user.id && window.Echo) {
        //     const channel = window.Echo.private(`user.${auth.user.id}`)
        //         .listen('MessageEvent', (e) => {
        //             console.log('Received MessageEvent:', e);
        //             // Handle the event, e.g., update state to display a notification
        //         });

        //     return () => {
        //         channel.stopListening('MessageEvent');
        //         console.log("channel stopped listening");
        //     };
        // }

        // // Optional: Clean up even if Echo is not initialized or user is not logged in
        // return () => {
        //     if (window.Echo) {
        //         window.Echo.leave(`user.${auth.user.id}`);
        //         console.log("Echo stopped listening 1");
        //     }
        // };
        return () => {
            window.Echo.leaveChannel(`user.${userId}`);
            console.log("Echo stopped listening");
        };
    }, []); // Depend on auth.user?.id to re-subscribe when user changes
    const [message, setMessages] = useState();
    const [messages, setMessage] = useState([
        {
            senderName: `Safiul Lathif`,
            content: "Hey team, how's the research paper coming along?",
            time: "10:30 AM",
            mySelf: true
        },
        {
            senderName: `Prakash Kumar`,
            content: "It's going well, Safiul. I think we need more references for the introduction section.",
            time: "10:35 AM",
            mySelf: false
        },
        {
            senderName: `Rasith Mohammed`,
            content: "I agree with Prakash. Also, we should finalize the methodology by tomorrow.",
            time: "10:40 AM",
            mySelf: false
        },
        {
            senderName: `Alice Johnson`,
            content: "The initial findings suggest that the hypothesis holds true. However, we need to conduct further experiments to validate the results comprehensively. The data collected so far is promising, but it's crucial to ensure the reliability and accuracy through additional testing and peer review. Let's discuss how we can allocate resources for the next phase of the research, and identify any potential challenges that might arise during the process. Also, consider collaborating with external experts to gain additional insights and perspectives.",
            time: "11:00 AM",
            mySelf: false
        },
        {
            senderName: `Bob Smith`,
            content: "Thank you, Alice, for the detailed update. I believe involving external experts is an excellent idea. We should also start drafting a preliminary report to summarize our findings and outline the next steps. This will help us stay organized and provide a clear direction for the upcoming phases. Additionally, let's schedule a meeting next week to discuss the allocation of resources and address any concerns that team members might have. Looking forward to everyone's feedback and suggestions.",
            time: "11:15 AM",
            mySelf: true
        },
        {
            senderName: `Safiul Lathif`,
            content: "I also agree with Prakash. We should also consider including a section on the limitations of our research and potential avenues for future studies.",
            time: "11:20 AM",
            mySelf: true
        },
        {
            senderName: `Rasith Mohammed`,
            content: "I'll take care of the literature review and methodology sections. Safiul, can you please work on the introduction and conclusion?",
            time: "11:25 AM",
            mySelf: false
        },
        {
            senderName: `Alice Johnson`,
            content: "I'll start working on the results section. Also, I'll make sure to include any relevant tables and figures to support our findings.",
            time: "11:30 AM",
            mySelf: false
        },
        {
            senderName: `Bob Smith`,
            content: "Great, I'll start working on the preliminary report. I'll also make sure to include any relevant appendices and references.",
            time: "11:35 AM",
            mySelf: true
        }


    ]);

    const handleInputChange = (event) => {
        setMessages(event.target.value);
    };

    const handleSend = () => {
        setMessage([...messages, { senderName: "Safiul Lathif", content: message, time: new Date().toLocaleTimeString(), mySelf: true }]);
        setMessages("");
    };

    return (
        <div className="research-pick-container">
            <Header mode={mode} setMode={setMode} navigate={navigate} handleSubmit={handleSubmit} isChat={isChat} setChat={setChat} />
            {
                isChat ? <div
                    style={{
                        backgroundColor: "#f0f0f0",
                        padding: "10px",
                        height: "calc(100vh - 62px)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div className="content-area">
                        <div style={{
                            width: "340px", backgroundColor: "white", padding: "20px", borderRadius: "15px",
                            height: "calc(100vh - 70px)",
                            overflow: "scroll"
                        }}>
                            <div style={{
                                backgroundColor: "#ededed",
                                border: "none",
                                margin: "0px 0px",
                                borderRadius: "25px",
                                padding: "12px 0px",
                                cursor: "pointer",
                                fontSize: "17px",
                                fontWeight: "600",
                                color: "gray",
                                transition: "all 0.3s ease",
                                ":hover": {
                                    backgroundColor: "#41075c",
                                    color: "white",
                                }
                            }}>
                                Collaborators
                            </div>
                            <AuthorCard authorTitle="Main Author" authorName="Dr. Rasith Mohamed" affiliationText="Department Of Diagnostic Imaging, Warren Alpert Medical School, Brown University, USA" />
                            <AuthorCard authorTitle="Collaborator" authorName="Dr. Prakash Jaganathan" affiliationText="Department Of Diagnostic Imaging, Warren Alpert Medical School, Brown University, USA" />
                            <AuthorCard authorTitle="Collaborator" authorName="Dr. Safiul Lathif" affiliationText="Department Of Diagnostic Imaging, Warren Alpert Medical School, Brown University, USA" />
                        </div>
                        <div style={{
                            flexGrow: "1",
                            width: "300px",
                            justifyContent: "space-between",
                            display: "flex",
                            flexFlow: "column",
                        }}>
                            <div style={{
                                backgroundColor: "white",
                                border: "none",
                                margin: "0px 10px",
                                borderRadius: "25px",
                                padding: "12px",
                                cursor: "pointer",
                                fontSize: "17px",
                                fontWeight: "bold",
                                color: "#41075c",
                                transition: "all 0.3s ease",
                                ":hover": {
                                    backgroundColor: "#41075c",
                                    color: "white",
                                },
                                boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.15)",
                            }}>
                                This is title of the editor
                            </div>
                            <div style={{
                                overflowY: "scroll",
                                height: "640px",
                                padding: "10px",
                            }}>
                                {messages.map((message, index) => {
                                    return (
                                        <div style={{
                                            justifyContent: message.mySelf ? "flex-end" : "flex-start",
                                            display: "flex",
                                        }}>
                                            {
                                                !message.mySelf ?
                                                    <div>
                                                        <img src="https://media.licdn.com/dms/image/v2/C4D03AQFdX9FHzdCSYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1646324063549?e=1748476800&v=beta&t=obCqWLLZopjY3VmaiNz5pGVCQwNMgP-gPfqtbTXBua8" alt="profile" style={{ width: "40px", borderRadius: "50%", marginRight: "10px" }} />
                                                    </div> : <>
                                                    </>
                                            }
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: message.mySelf ? "flex-end" : "flex-start",
                                                gap: "5px"
                                            }}>
                                                <div >
                                                    {
                                                        message.mySelf ?
                                                            <span style={{ fontSize: "12px", color: "#a6a6a6", marginRight: "10px" }}>{message.time}</span>
                                                            : <></>
                                                    }
                                                    <span style={{ fontWeight: "bold", fontSize: "15px", color: "#A9a9a9" }}>{message.senderName}</span>
                                                    {
                                                        !message.mySelf ?
                                                            <span style={{ fontSize: "12px", color: "#a6a6a6", marginLeft: "10px" }}>{message.time}</span>
                                                            : <></>
                                                    }
                                                </div>
                                                <div key={index} style={{
                                                    display: "flex",
                                                    flexDirection: message.mySelf ? "row-reverse" : "row",
                                                    gap: "10px",
                                                    padding: "10px",
                                                    borderRadius: message.mySelf ? "15px 0px 15px 15px" : "0px 15px 15px 15px",
                                                    marginBottom: "10px",
                                                    backgroundColor: message.mySelf ? "#2fa1ec" : "white",
                                                    color: !message.mySelf ? "black" : "white",
                                                    boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1)",
                                                    textAlign: "start",
                                                    maxWidth: "60%",
                                                }}>
                                                    <div className="message-content">{message.content}</div>
                                                </div>
                                            </div>

                                            {
                                                message.mySelf ?
                                                    <div>
                                                        <img src="https://media.licdn.com/dms/image/v2/C4D03AQFdX9FHzdCSYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1646324063549?e=1748476800&v=beta&t=obCqWLLZopjY3VmaiNz5pGVCQwNMgP-gPfqtbTXBua8" alt="profile" style={{ width: "40px", borderRadius: "50%", marginLeft: "10px" }} />
                                                    </div> : <>
                                                    </>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            {/* <div className="instructions">
                                Invite collaborators,
                                <br />
                                Send your first message to your collaborators
                            </div> */}
                            <div className="collaboration-message-container">
                                <div className="input-container">
                                    <button className="icon-button">
                                        <FaSmile />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Send your message to your collaborators......."
                                        onChange={handleInputChange}
                                        value={message}
                                        className="message-input"
                                    />
                                    <button className="icon-button">
                                        <FaMicrophone />
                                    </button>
                                    <button className="icon-button">
                                        <AttachFile />
                                    </button>
                                    <button onClick={handleSend} className="send-button">
                                        Send  <FaPaperPlane />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> :
                    <>
                        <Sidebar pixelValue={pixelValue} setPixelValue={setPixelValue} editorType={editorType} setEditorType={setEditorType} />
                        <div
                            style={{
                                backgroundColor: "#f0f0f0",
                                padding: "10px",
                                height: "calc(100vh - 62px)",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <div className="content-area">
                                <div className="left-sidebar">
                                </div>
                                <div className="main-content">
                                    <Home ref={ref} />
                                </div>
                                <div className="right-sidebar">
                                    no comments
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div >
    );
}

export default EditorPage;

