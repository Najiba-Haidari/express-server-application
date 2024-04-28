function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

module.exports = error;


// fs.readFile("./db/users.js", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err, "error reading the file");
//     } else {
//         const parsedUsers = JSON.parse(data);
//         parsedUsers.push(user);
//         fs.writeFile(
//             "./db/users.js",
//             JSON.stringify(parsedUsers, null, 4),
//             (er) => (er ? console.error(er) : console.log("Successfuly posted"))
//         );
//     }
// });
//  res.render("users", {users: users});