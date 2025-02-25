import React, { useState, useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import diff from "fast-diff";
import { diffWords } from "diff";

const EditorWithChangeTracking = () => {
  const editorRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);
  const [previousData, setPreviousData] = useState({
    blocks: [
      {
        type: "paragraph",
        data: {
          text: `"This is a paragraph with <span style="background-color: lightcoral;">some</span><span style="background-color: lightgreen;">same</span> text in it."`,
        },
      },
    ],
  });

  useEffect(() => {
    if (editorRef.current) return;
    editorRef.current = new EditorJS({
      holder: "editorJs",
      data: previousData,
      tools: {
        list: List,
      },
      onChange: () => {
        console.log("change");
        editorRef.current.save().then((data) => {
          handleEditorChange(data);
        });
      },
    });
    setIsInitialized(true);
  }, [previousData]);

  const handleEditorChange = (newData) => {
    if (previousData) {
      const optimized = highlightChanges(previousData, newData);
      previousData.blocks = optimized.blocks;

      setPreviousData(optimized);
      console.log(previousData);
    }
  };

  const compareData = (oldData, newData) => {
    const differences = diff(oldData.blocks, newData.blocks);
    if (differences) {
      return differences;
    }
    return [];
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
              return `<span style="background-color: lightcoral;">${part.value}</span>`;
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
    <div>
      <div id="editorJs"></div>
    </div>
  );
};

export default EditorWithChangeTracking;
