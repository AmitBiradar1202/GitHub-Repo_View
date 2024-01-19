import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3003;
const REPO_URL = "http://localhost:3003";


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render("index.ejs")
})

app.post('/api/get',async(req,res)=>{
    const input = req.body.username;
    //avatar_url,,,location,,,,bio,,,,name,,,,,html_url,,,,,,twitter_username
    
    

    try {
        const userResponse = await axios.get(`https://api.github.com/users/${input}`);
        const reposResponse = await axios.get(userResponse.data.repos_url);

        res.render('repo', { UserData: { profile: userResponse.data, repos: reposResponse.data } });
    } catch (error) {
        console.error(error);
        res.redirect('/')
    }
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  