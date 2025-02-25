import React, { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import diff from "deep-diff"; // Install: npm install fast-diff

const EditorWithChanges = () => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  const [editorData, setEditorData] = useState(null);
  const previousData = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    editorInstanceRef.current = new EditorJS({
      holder: editorRef.current,
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      data: {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "Initial content.",
            },
          },
        ],
      },
      onChange: (api, event) => {
        const currentDataPromise = api.saver.save();
        currentDataPromise.then((currentData) => {
          setEditorData(currentData);
        });
      },
    });

    return () => {
      if (editorInstanceRef.current && editorInstanceRef.current.destroy) {
        editorInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (editorData) {
      const currentText = editorData.blocks[0]?.data?.text || "";
      const previousText = previousData.current?.blocks[0]?.data?.text || "";

      if (previousText !== "") {
        const diffResult = diff(previousText, currentText);
        const highlightedText = diffResult
          .map(([type, value]) => {
            if (type === 1) {
              // Added
              return `<span style="color: red;">${value}</span>`;
            } else if (type === -1) {
              // Removed
              return `<span style="text-decoration: line-through; color:grey">${value}</span>`;
            } else {
              // Unchanged
              return value;
            }
          })
          .join("");

        if (
          editorInstanceRef.current &&
          editorInstanceRef.current.blocks.getBlockByIndex(0)
        ) {
          editorInstanceRef.current.blocks
            .getBlockByIndex(0)
            .setData({ text: highlightedText });
        }
      }
      previousData.current = editorData;
    }
  }, [editorData]);

  return <div ref={editorRef}></div>;
};

export default EditorWithChanges;
