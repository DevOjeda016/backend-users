import app from "./app";

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT} http://127.0.0.1:${process.env.PORT}`);
});
