import React, { useState } from 'react';
import './editor.css';
import bgImage from "../../assets/profile-bg.png";
import appLogo from "../../assets/app_logo_with_bg.png";
import home from "../../assets/home.png";
import share from "../../assets/share.png";
import submit from "../../assets/submit.png";
import chat from "../../assets/chat.png";
import HorizontalDivider from '../../components/divider';
import Home from "../../pages/index";


function EditorPage() {
    const [mode, setMode] = useState(0)
    return (
        <div className="research-pick-container">
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
                        <img src={home} alt="home" style={{
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
                        <button className="top-button"
                            style={{
                                borderRadius: '30px',
                                backgroundColor: mode === 0 ? '#41075c' : 'white',
                                color: mode === 0 ? 'white' : '#41075c',
                                fontWeight: 'bold'
                            }}
                            onClick={() => setMode(0)}
                        >
                            Visual Editor
                        </button>
                        <button className="top-button"
                            style={{
                                borderRadius: '30px',
                                backgroundColor: mode === 1 ? '#41075c' : 'white',
                                color: mode === 1 ? 'white' : '#41075c',
                                fontWeight: 'bold',
                            }}
                            onClick={() => setMode(1)}

                        >
                            Review
                        </button>
                        <button className="top-button"
                            style={{
                                borderRadius: '30px',
                                backgroundColor: mode === 2 ? '#41075c' : 'white',
                                color: mode === 2 ? 'white' : '#41075c',
                                fontWeight: 'bold',
                            }}
                            onClick={() => setMode(2)}
                        >
                            Portal Question
                        </button>
                    </div>
                </div>
                <div className="right-section">
                    <HorizontalDivider />
                    <button className="top-button"><img src={share}
                        style={{
                            filter: "brightness(0) saturate(100%) invert(100%)",
                            height: '25px',
                        }}
                        alt="share" /> Share</button>
                    <HorizontalDivider />

                    <button className="top-button"><img src={submit}
                        style={{
                            filter: "brightness(0) saturate(100%) invert(100%)",
                            height: '25px',
                        }}
                        alt="submit" /> Submit</button>
                    <HorizontalDivider />

                    <button className="top-button"><img src={chat}
                        style={{
                            filter: "brightness(0) saturate(100%) invert(100%)",
                            height: '25px',
                        }}
                        alt="chat" /> Chat</button>
                </div>
            </div>
            <div
                style={{
                    backgroundColor: "#f0f0f0",
                    padding: "20px",
                    height: "calc(100vh - 62px)",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div className="content-area">
                    <div className="left-sidebar">
                    </div>
                    <div className="main-content">
                        <Home />
                    </div>
                    <div className="right-sidebar">
                    </div>
                </div>
            </div>
            {/* <div className="content-area">
                <div className="left-sidebar">
                    <div className="document-sections">
                        <button className="add-section-button">+</button>
                        <span>Document sections</span>
                    </div>
                    <div className="section-item">
                        Types of stem cell
                    </div>
                </div>

                <div className="main-content">
                    <div className="top-controls">
                        <select className="dropdown">
                            <option>DC 100 %</option>
                        </select>
                        <select className="dropdown">
                            <option>Normal text</option>
                        </select>
                        <select className="dropdown">
                            <option>12+</option>
                        </select>
                        <button className="format-button">B</button>
                        <button className="format-button">I</button>
                        <button className="format-button">U</button>
                    </div>
                    <div className="editor-area">
                        <h1>Types of stem cell</h1>
                    </div>
                </div>

                <div className="right-sidebar">
                    <button className="sidebar-button">Comments</button>
                    <button className="sidebar-button">Modification</button>
                    <div className="no-comments">
                        No comments
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default EditorPage;


