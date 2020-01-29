require("dotenv").config();

var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(4000);
console.log("Server is running on localhost:4000");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log(`Socket ${socket.id} connected.`);

  socket.emit("add prop", { name: "speed", value: 100 }, ({ err, res }) => {
    console.log("************ err", err);
    if (err) return console.log(err);
    console.log("************ res", res);
    // console.log("*", `prop: ${name} = ${value}.`);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
  // socket.on("move", function(data) {
  //   console.log(data);
  // });
});

// const MongoClient = require("mongodb").MongoClient;
// const uri = `mongodb+srv://admin:${process.env.MONGODB_PASS}@cluster0-jvnro.mongodb.net/test?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
