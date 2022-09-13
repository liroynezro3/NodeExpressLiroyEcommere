//הגדרנו משתנה שיש לו יכולות מיוחדות של האקספרס
let cors = require("cors");
const express = require("express");
const path = require("path"); //יודע לקחת כתובת ולעשות עליה מניפולציה
//משתנה שיש לו יכולת להפעיל שרת
const http = require("http");
require("./db/mongoConnect");
//הוספתי על מנת שאני יוכל לגשת מצד לקוח ולעקוף את הדפדפן
app.use(cors());
const { routsInit } = require("./routes/config_route"); //קורה לפונקציה שנקראת ראוטס איניט שמפעילה את שאר הרואטים שיצרתי

//יצרנו משתנה שיש לו את היכולת של אקספרסס כולל האזנה לראוט
const app = express();
// הגדרת פירסור מידע כגייסון אם הוא יכול
app.use(express.json());
// נגדיר את תקיית הפאבליק כתקייה סטטית שניתן לשים בה קבצים לצד לקוח יהיה גישה
app.use(express.static(path.join(__dirname, "public")));
routsInit(app);
//הגדרנו רואט של העמוד בית
//req->מה שנקבל בדרך כלל מהצד לקוח או הדפדפן ברוא
//res->מה שהשרת מגיב לצד לקוח,במקרה שלנו דפדפן
app.get("/", (req, res) => {
  //אומר לו להחזיר מידע בפורמט ג'ייסון לצד לקוח
  res.json({ msg: "express work perfect" });
});
//מייצרים שרת שמשתמש במשתנה אפ שיש לו את כל היכולות המיוחדות של האקספרס
const server = http.createServer(app);
//הגדרנו פורט
let port = process.env.PORT || 3000;
//מאזינים לשרת בפורט 3000
server.listen(port, function () {
  console.log(
    "express server listening on port $d in $d mode",
    this.address().port,
    app.settings.env
  );
});
