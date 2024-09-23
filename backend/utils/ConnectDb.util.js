import mongoose from "mongoose";

export default function connectDatabase() {
  console.log(process.env.DB_NAME);

  mongoose
    .connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then((res) => {
      console.log(
        "connected to database",
        `${res.connection.host}:${res.connection.port}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
}
