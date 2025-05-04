import axios from "axios";

const DeleteUser = (userId) => {
  return axios
    .post("http://localhost:3002/Blog/DeleteUser", { id: userId })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Delete error:", error);
      throw error;
    });
};

export default DeleteUser;
