import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const params = useParams();
  console.log("params single user ", params);
  const { authorizationToken, API } = useAuth();

  // get single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users single data: ${data}`);
      console.log(data);
      setUsername(data.username);
      setEmail(data.email);
      setPhone(data.phone);
      setIsAdmin(data.isAdmin);
      // if (response.ok) {
      //     getAllUsersData();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify({
            username,
            email,
            phone,
            isAdmin,
          }),
        }
      );
      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
      </div>
      {/* contact page main  */}
      <div className="container grid grid-two-cols">
        {/* contact form content actual  */}
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Mobile</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="isAdmin">Admin</label>
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
            </div>

            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
