const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://doctor-appointment-admin-y94n.onrender.com/api", //http://localhost:1337/admin  https://doctor-appointment-admin-y94n.onrender.com/api
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

console.log(API_KEY,'rg4tg4tg4');
const getCategory = () => axiosClient.get("/categories?populate=*");
const getDoctorList = () => axiosClient.get("/doctors?populate=*");
const getDoctorByCategory = (category) =>
  axiosClient.get(
    `/doctors?filters[categories][Name][$eq]=${category}&populate=*`
  );
const getDoctorById = (id) => axiosClient.get("/doctors/" + id + "?populate=*");
const bookAppointment = (data) => axiosClient.post("/appointments", data);
const sendEmail = (data) => axios.post("/api/sendEmail", data);
const sendRating = (data) => axios.post("/ratings", data);

const getUserBookingList = (userEmail) =>
  axiosClient.get(
    "/appointments?[filter][Email][$eq]=" +
      userEmail +
      "&populate[doctor][populate][image][populate][0]=url&populate=*"
  );

const deleteBooking = (id) => axiosClient.delete("/appointments/" + id);
export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  sendEmail,
  getUserBookingList,
  deleteBooking,
  sendRating,
};
