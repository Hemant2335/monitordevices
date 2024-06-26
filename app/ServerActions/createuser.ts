"use server";

type CreateUserProps = {
  Name: string | null;
  Username: string | null;
  Email: string | null;
  Password: string | null;
};

export async function createuser(Props: CreateUserProps) {
  console.log("Running");
  try {
    const res = await fetch("https://montior-backend.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Props.Name,
        email: Props.Email,
        password: Props.Password,
        username: Props.Username,
        profilepic: "",
        location: "",
        bio: "",
      }),
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return "An error occurred";
  }
}
