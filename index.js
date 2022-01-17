
// include middleware

const app = require('./controller/app');

app.listen(80, ()=>{
    console.log("Server Started");
})