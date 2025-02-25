import React, { useEffect, useState } from "react";
import Editor from "./Editor.jsx";

const TrackChangesPage = () => {
  const [data, setData] = useState(null);

  return (
    <div>
      <Editor data={data} onChange={setData} editorBlock="editorJs" />
    </div>
  );
};

export default TrackChangesPage;
