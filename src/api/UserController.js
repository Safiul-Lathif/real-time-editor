const token = localStorage.getItem("token");

class UserController {
  fetchUserDetails = async () => {
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
        const user = {
          name: `${data.data.user_first_name} ${data.data.user_last_name}`,
          email: data.data.user_email,
          lastUpdate: data.data.updated_at,
          location: data.data.location,
          country: data.data.country,
          university: data.data.university_name,
          department: data.data.department,
          mobile: data.data.mobile_no ? data.data.mobile_no : "",
          specialist: data.data.speciality,
          timeZone: data.data.user_timezone,
          profileImage: data.data.profile_image
            ? data.data.profile_image
            : "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain",
        };
        console.log(data);
        return user;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  fetchTimeZone = async () => {
    try {
      const response = await fetch(
        `http://pocapi.researchpick.com/api/timezonelist`,
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
        let timeZone = data.timezonelist;
        return timeZone;
      }
    } catch (error) {
      console.error("Error fetching time zone list:", error);
    }
  };

  fetchCountries = async () => {
    try {
      const response = await fetch(
        `http://pocapi.researchpick.com/api/countrieslist`,
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
        let countries = data.countrieslist;
        return countries;
      }
    } catch (error) {
      console.error("Error fetching countries list:", error);
    }
  };
}
export const uc = new UserController();
