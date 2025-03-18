import { React, useEffect, useState } from "react";
import styled from "styled-components";

export const SelectImage = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    if (userData.profileImage) {
      console.log("Profile image updated:", selectedFile);
    }
  }, [isLoading]);

  const uploadImage = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profile_image", selectedFile);
    try {
      let body = JSON.stringify({
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        university_name: document.getElementById("universityName").value,
        department: document.getElementById("department").value,
        speciality: document.getElementById("speciality").value,
        location: document.getElementById("location").value,
        mobile_no: document.getElementById("mobileNumber").value,
        country: "1",
        user_timezone: "1",
        id: userData.userId,
        profile_image: JSON.stringify(formData.get("profile_image")),
      });
      console.log(body);
      const response = await fetch(
        "http://pocapi.researchpick.com/api/updateuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }
      );
      console.log(response);
      if (response.ok) {
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <input
        style={{ display: "none" }}
        type="file"
        id="profileImage"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => {
          setIsLoading(true);
          const file = e.target.files[0];
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onload = () => {
            userData.profileImage = reader.result;
            setIsLoading(false);
          };
          reader.readAsDataURL(file);
        }}
      />
      <label htmlFor="profileImage">
        {userData.profileImage && (
          <ProfileImage src={userData.profileImage} alt="Profile" />
        )}
      </label>
    </div>
  );
};

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20%;
  margin-right: 20px;
`;
