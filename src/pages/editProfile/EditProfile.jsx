import styled from "styled-components";
import appLogo from "../../assets/app_logo.png";
import styles from "./editProfile.module.css"; // Import CSS module
import { React, useState, useEffect } from "react";
import { SelectImage } from "../../components/SelectImage";
import { uc } from "../../api/UserController";

// --- Components ---
const Header = () => (
  <HeaderContainer>
    <img
      src={appLogo}
      alt="Research Pick Logo"
      style={{
        width: 240,
        height: 70,
      }}
    />
    <RightContent>
      <ProjectDropdown>Project</ProjectDropdown>
      <LogoutButton>Logout</LogoutButton>
    </RightContent>
  </HeaderContainer>
);

const EditProfile = ({ userData, timeZoneList, countries }) => (
  <div className={styles.container}>
    <div className={styles.form}>
      <SectionTitle>Edit Profile</SectionTitle>

      <form id="editForm" className={styles.forms}>
        <SelectImage userData={userData} />
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name*</label>
          <div className={styles.wrapper}>
            <input
              type="name"
              id="firstName"
              placeholder="Enter first name"
              required
              defaultValue={userData.initialFirstName}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name*</label>
          <div className={styles.wrapper}>
            <input
              type="name"
              id="lastName"
              placeholder="Enter last name"
              required
              defaultValue={userData.initialLastName}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="mobileNumber">Mobile Number</label>
          <div className={styles.wrapper}>
            <input
              type="number"
              id="mobileNumber"
              placeholder="Enter mobile number"
              required
              defaultValue={userData.initialMobileNumber}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="universityName">University Name</label>
          <div className={styles.wrapper}>
            <input
              type="name"
              id="universityName"
              placeholder="Enter university name"
              required
              defaultValue={userData.initialUniversityName}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="department">Department</label>
          <div className={styles.wrapper}>
            <input
              type="name"
              id="department"
              placeholder="Enter department"
              required
              defaultValue={userData.initialDepartment}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="speciality">Speciality</label>
          <div className={styles.wrapper}>
            <input
              type="name"
              id="speciality"
              placeholder="Enter speciality"
              required
              defaultValue={userData.initialSpeciality}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <div className={styles.wrapper}>
            <input
              type="name"
              id="location"
              placeholder="Enter location"
              required
              defaultValue={userData.initialLocation}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <div className={styles.wrapper}>
            <select
              id="country"
              required
              defaultValue={userData.initialCountry}
              onChange={(e) => {
                const countryName = e.target.value;
                console.log(countryName);
                const country = countries.find(
                  (country) => country.CountryName === countryName
                ).CountryID;
                userData.initialCountry = country;
              }}
            >
              <option value="">Select country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.CountryId}>
                  {country.CountryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="timezone">Timezone</label>
          <div className={styles.wrapper}>
            <select
              id="timezone"
              required
              defaultValue={userData.initialTimezone}
              onChange={(e) => {
                const timeZone = e.target.value;
                userData.initialTimezone = timeZone;
              }}
            >
              <option value="">Select timezone</option>
              {timeZoneList.map((timezone, index) => (
                <option key={index} value={timezone.id}>
                  {timezone.user_timezone}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <button
            style={{
              backgroundColor: "white",
              color: "rgb(91, 3, 91)",
              padding: "10px 30px",
              border: "1px solid rgb(91, 3, 91)",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            cancel{" "}
          </button>
          <button
            onClick={(e) => {
              const token = localStorage.getItem("token");
              e.preventDefault();

              const body = JSON.stringify({
                first_name: document.getElementById("firstName").value,
                last_name: document.getElementById("lastName").value,
                university_name:
                  document.getElementById("universityName").value,
                department: document.getElementById("department").value,
                speciality: document.getElementById("speciality").value,
                location: document.getElementById("location").value,
                mobile_no: document.getElementById("mobileNumber").value,
                country: userData.initialCountry,
                user_timezone: userData.initialTimezone,
                id: userData.userId,
                profile_image: userData.profileImage,
              });

              console.log(body);
              fetch("http://pocapi.researchpick.com/api/updateuser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: body,
              })
                .then((response) => response.json())
                .then((data) => {
                  // Handle successful login response
                  console.log("Edited successful:", data);
                  if (data.status === true) {
                    alert(data.message);
                  } else {
                    alert(data.message);
                  }
                })
                .catch((error) => {
                  // Handle login error
                  console.error("Login error:", error);
                });
            }}
            className={styles.projectDropdown}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
);

const EditProfileScreen = () => {
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [userData, setUserDetails] = useState({
    initialFirstName: "",
    initialLastName: "",
    initialEmail: "",
    initialMobileNumber: "",
    initialUniversityName: "",
    initialDepartment: "",
    initialSpeciality: "",
    initialLocation: "",
    initialCountry: "",
    initialTimezone: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://pocapi.researchpick.com/api/getuserdetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const user = {
            initialFirstName: data.data.user_first_name,
            initialLastName: data.data.user_last_name,
            initialEmail: data.data.user_email,
            initialMobileNumber: data.data.mobile_no ? data.data.mobile_no : "",
            initialUniversityName: data.data.university_name,
            initialDepartment: data.data.department,
            initialSpeciality: data.data.speciality,
            initialLocation: data.data.location,
            initialCountry: data.data.country,
            initialTimezone: data.data.user_timezone,
            userId: data.data.id,
            profileImage: data.data.profile_image
              ? data.data.profile_image
              : "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain",
          };
          setUserDetails(user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    const fetchTimeZone = async () => {
      const timeZone = await uc.fetchTimeZone();
      setTimeZoneList(timeZone);
    };
    const fetchCountries = async () => {
      const countries = await uc.fetchCountries();
      setCountries(countries);
    };
    fetchTimeZone();
    fetchCountries();
    fetchUserDetails();
  }, []);

  return (
    <PageContainer>
      <Header />
      <EditProfile
        userData={userData}
        timeZoneList={timeZoneList}
        countries={countries}
      />
    </PageContainer>
  );
};

export default EditProfileScreen;

// --- STYLES ---  (Customize these extensively)
const PageContainer = styled.div`
  font-family: sans-serif; /* Example */
  background-color: #f7f9fa; /* Example */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const HeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  background-color: rgb(91, 3, 91);
  margin-top: -10px;
  margin-left: -10px;
  margin-right: -10px;
  border-radius: 20px 20px 0px 0px;
  width: 100%;
  margin-bottom: 10px;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const RightContent = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
`;

const ProjectDropdown = styled.button`
  /* Style as a dropdown */
  color: white;
  background-color: rgb(91, 3, 91);
  padding: 10px 30px;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  /* Style as a dropdown */
  color: white;
  background-color: rgb(91, 3, 91);
  padding: 10px 30px;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  padding: 20px;
  max-width: 960px; /* Example */
  margin: 0 auto;
  flex: 1; /* Makes the content expand to fill available space */
`;

const CardContainer = styled.div`
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20%;
  margin-right: 20px;
`;

const CardDetails = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  margin: 0;
  letterspacing: "0.4px";
`;

const Email = styled.p`
  color: #777;
  font-size: 0.9rem;
`;

const LastUpdate = styled.p`
  color: #777;
  font-size: 0.8rem;
`;

const TwoColumns = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex: 1; /* Distribute columns equally */
  width: 500px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  margin-top: 0px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(225, 223, 223);
  text-align: left;
`;

const DetailItemContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Label = styled.dt`
  font-weight: bold;
  margin-right: 10px;
  margin-bottom: 10px;
  color: gray;
  font-weight: 600;
  font-size: 14px;
`;

const Value = styled.dd`
  margin: 0;
  flex: 1;
  font-weight: 500;
  font-size: 14px;
  color: darkGray;
`;

const LinkedAccountsContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  margin-top: 20px;
  width: 50%;
  justify-content: center;
  min-height: 100vh;
`;

const GoogleLink = styled.div`
  display: flex;
  align-items: center;
`;

const GoogleIcon = styled.img`
  width: 30px;
  height: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 50px;
  margin-right: 10px;
`;

const GoogleText = styled.span`
  flex: 1;
  font-weight: 600;
`;

const UnlinkButton = styled.button`
  /* Style as a button */
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #f00;
  font-weight: 600;
  background-color: white;
`;

const DeleteAccountButton = styled.button`
  background-color: #f00; /* Example red */
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
