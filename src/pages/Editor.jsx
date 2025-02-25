import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { diffWords } from "diff";

const Editor = ({ data, onChange, editorBlock }) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlock,
        data: data,

        async onChange(api, event) {
          const newData = await api.saver.save();
          const optimized = highlightChanges(data, newData);
          onChange(optimized);
        },
      });
      ref.current = editor;
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

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

  return <div id={editorBlock}> </div>;
};
export default memo(Editor);
