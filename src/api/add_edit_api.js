export default async function handler({ newPost, isEdit, id, title }) {
  let token = localStorage.getItem("token");

  let data = {
    title: title,
    content: JSON.stringify(newPost),
  };
  let editedData = {
    id: id,
    content: JSON.stringify(newPost),
  };

  let response = await fetch(
    isEdit
      ? "http://pocapi.researchpick.com/api/editcontent"
      : "http://pocapi.researchpick.com/api/storeresearchcontent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(isEdit ? editedData : data),
    }
  );

  if (response.ok) {
    if (!isEdit) alert(isEdit ? "Edited Successfully" : "Added Success");
  } else {
    console.error("Error:", response.statusText);
  }
  console.log("response :", response);
}
