import EditorJS from "@editorjs/editorjs";
import Header from "editorjs-header-with-alignment";
import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import CheckList from "@editorjs/checklist";
import Link from "@editorjs/link";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import client from "../api/client";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import Handler from "../api/add_edit_api";
import styles from "../styles.module.css";
import { useParams } from "react-router-dom";
import { diffWords } from "diff";

const Home = () => {
  const ref = useRef(null);
  var currentData = useRef(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [previousData, setPreviousData] = useState({
    time: Date.now(),
    blocks: [],
    version: "1",
  });
  const [newDataS, setNewData] = useState({
    time: Date.now(),
    blocks: [],
    version: "1",
  });
  const [saveStatus, setSaveStatus] = useState("");

  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "Chris",
    "Sarah",
    "David",
    "Jessica",
    "Daniel",
    "Ashley",
    "James",
    "Amanda",
    "Robert",
    "Jennifer",
    "Mary",
    "William",
    "Patricia",
    "Linda",
    "Barbara",
    "Elizabeth",
  ];

  const colors = [
    "blue",
    "red",
    "#1A1A19",
    "orange",
    "#31511E",
    "#9B7EBD",
    "#604CC3",
  ];

  let name = firstNames[Math.floor(Math.random() * firstNames.length)];
  let color = colors[Math.floor(Math.random() * colors.length)];

  const socket = io(import.meta.env.VITE_SERVICE_URL);

  let socketClient = null;
  const { id } = useParams();

  const initializeEditor = (storedData) => {
    if (ref.current) return;
    var editor = new EditorJS({
      holder: "editor",
      data: storedData,
      tools: {
        header: Header,
        list: List,
        delimiter: Delimiter,
        quote: Quote,
        warning: Warning,
        checklist: CheckList,
        link: Link,
        code: Code,
        inlineCode: InlineCode,
      },
      onChange: async (api, event) => {
        if (socketClient.shouldPreventChange) {
          socketClient.shouldPreventChange = false;
          return;
        }
        switch (event.type) {
          case "block-changed":
            editor.save().then((updatedData) => {
              let newBlock = updatedData.blocks[event.detail.index];
              let currentBlock = storedData.blocks[event.detail.index];
              storedData.blocks[event.detail.index] = newBlock;
              if (!currentBlock) {
                return socket.emit(
                  "block-added",
                  event.detail.index,
                  name,
                  newBlock
                );
              }
              if (
                newBlock.type === currentBlock.type &&
                newBlock.data === currentBlock.data
              ) {
                return;
              }
              socket.emit(
                "block-changed",
                event.detail.index,
                name,
                updatedData.blocks[event.detail.index]
              );
            });
            break;
          case "block-added":
            let newBlock = {
              type: "paragraph",
              data: {
                text: "",
              },
            };
            storedData.blocks[event.detail.index] = newBlock;
            socket.emit("block-added", event.detail.index, name, newBlock);
            break;
          case "block-removed":
            editor.save().then((updatedData) => {
              storedData.blocks = updatedData.blocks;
              socket.emit("block-removed", event.detail.index, name);
            });
            break;
        }
        ref.current.save().then((data) => {
          handleEditorChange(data, previousData);
        });
      },
      onReady: async () => {
        console.log("ready", name);
        socketClient = client(editor, name, name, color);
      },
    });
    ref.current = editor;
  };
  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      if (id === "new") {
        initializeEditor({
          time: Date.now(),
          blocks: [],
          version: "1",
        });
        setIsEdit(false);
        return;
      }
      try {
        const response = await fetch(
          `http://pocapi.researchpick.com/api/viewContent?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        const data = JSON.parse(result["data"]);
        previousData.blocks = data.blocks;
        previousData.version = data.version;
        previousData.time = data.time;
        newDataS.blocks = data.blocks;
        newDataS.version = data.version;
        newDataS.time = data.time;
        setIsEdit(true);
        initializeEditor(data);
      } catch (error) {
        initializeEditor({
          time: Date.now(),
          blocks: [],
          version: "1",
        });
        setIsEdit(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, isEdit]);

  const save = async () => {
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
        Handler({ newPost: map, isEdit: isEdit, id: id, title: title });
      } catch (error) {
        console.error("error  data:", error);
      }
    }
  };

  const saveWithChanges = async () => {
    if (ref.current) {
      let map = {
        time: newDataS.time,
        blocks: newDataS.blocks,
        version: newDataS.version,
      };
      try {
        Handler({ newPost: map, isEdit: isEdit, id: id });
      } catch (error) {
        console.error("error  data:", error);
      }
    }
  };

  const download = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://pocapi.researchpick.com/api/downloadword?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert(
          "File downloaded successfully. Please check the download folder."
        );
        window.open(result.filepath, "_blank", "noopener,noreferrer");
      } else {
        alert("Error downloading file.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error downloading file.");
    }
  };

  const handleEditorChange = (newData, savedData) => {
    const optimized = highlightChanges(savedData, newData);

    newDataS.blocks = optimized.blocks;
    newDataS.time = optimized.time;
    newDataS.version = optimized.version;
    try {
      // Handler({ newPost: map, isEdit: isEdit, id: id });
    } catch (error) {
      console.error("error  data:", error);
    }
  };

  const highlightChanges = (oldData, newData) => {
    const newBlocks = newData.blocks.map((newBlock, index) => {
      const oldBlock = oldData.blocks[index];
      if (
        oldBlock &&
        oldBlock.type === newBlock.type &&
        oldBlock.data.text &&
        newBlock.data.text
      ) {
        const diff = diffWords(oldBlock.data.text, newBlock.data.text);
        const highlightedText = diff
          .map((part) => {
            if (part.added) {
              return `<span style="background-color: lightgreen;">${part.value}</span>`;
            } else if (part.removed) {
              return `<span style="text-decoration: line-through; color:grey">${part.value}</span>`;
            } else {
              return part.value;
            }
          })
          .join("");

        return {
          ...newBlock,
          data: {
            ...newBlock.data,
            text: highlightedText,
          },
        };
      }
      return newBlock;
    });

    return {
      ...newData,
      blocks: newBlocks,
    };
  };

  return (
    <div className={styles.container}>
      <div id="editor" className={styles.editor}></div>
      <button onClick={save} className={styles.saveButton}>
        {isEdit ? "Edit" : "Save"}
      </button>
      {/* <button onClick={saveWithChanges} className={styles.saveButton}>
        {isEdit ? "Edit with changes" : "Save"}
      </button> */}
      <button
        onClick={download}
        disabled={isSaving}
        className={styles.saveButton}
      >
        {isSaving ? "Downloading..." : "Download"}
      </button>
      {saveStatus && (
        <div className={`${styles.saveStatus} ${styles[saveStatus.type]}`}>
          {saveStatus.message}
        </div>
      )}
    </div>
  );
};

export default Home;
