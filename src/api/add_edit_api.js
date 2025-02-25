export default async function handler({ newPost, isEdit, id }) {
  let data = {
    content: JSON.stringify(newPost),
  };
  let editedData = {
    id: id,
    content: JSON.stringify(newPost),
  };

  console.log(JSON.stringify(data));
  let response = await fetch(
    isEdit
      ? "http://localhost/Researchpickpoc/api/editcontent"
      : "http://localhost/Researchpickpoc/api/storeresearchcontent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
