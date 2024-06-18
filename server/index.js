const express = require("express");
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();
const app = express();
const mysql = require("mysql");
const cors = require('cors');
app.use(cors());
app.use(express.json()); // Call express.json() as a function
const bcrypt = require('bcrypt');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123', // Replace with your MySQL root password if set
    database: 'passwordmanager',
});
// Connecting to database


db.connect(function (err) {
    if (err) {
        console.log('Error connecting to Database',err);
        return;
    }
    console.log('Connection established');
});

const PORT = process.env.PORT || 3001;
const algorithm = 'aes-256-ctr';
const secretKey = crypto.createHash('sha256').update(String(process.env.SECRET_KEY)).digest('base64').substr(0, 32);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (hash) => {
  const [iv, encrypted] = hash.split(':');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  try {
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error('Error decrypting password:', error);
    return null;
  }
};

app.post("/retrieve", (req, res) => {
  const { userid, title } = req.body;
  console.log('Received request with body:', req.body);

  const query = "SELECT password FROM passwords WHERE userid = ? AND title = ?";
  db.query(query, [userid, title], (err, result) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send("Database query failed");
          return;
      }

      if (result.length === 0) {
          console.log("Zero length");
          return res.status(404).json({ message: "No password found for the provided user ID and title" });
      }

      const encryptedPassword = result[0].password;
      console.log('Encrypted password:', encryptedPassword);
      const decryptedPassword = decrypt(encryptedPassword);
      if (decryptedPassword !== null) {
        res.json({ password: decryptedPassword });
      } else {
        res.status(500).send("Error decrypting password");
      }
  });
});

// app.post("/retreive",(req,res)=>{
//   const{userid,title}=req.body;
//   console.log('Received request with body:',req.body);
//   const query = "SELECT password FROM passwords WHERE userid = ? AND title = ?";
//   db.query(query,[userid,title],(err,result)=>{
//     if(err){
//         console.log("error aagaya idft")
//         console.log(err);
//         return;
//     }
//     if (result.length === 0) {
//         return res.status(404).json({ message: "No password found for the provided user ID and title" });
//       }
//     console.log(result);
//     res.json({password:result[0].password});
//   })
// });

// Login
app.post("/login", async (req, res) => {
  const { userid, app_password } = req.body;
  
  try {
      db.query("SELECT app_password FROM userauthenticationtable WHERE userid = ?", [userid], async (err, results) => {
          if (err) {
              console.error('Error executing query:', err);
              res.status(500).send("Database query failed");
              return;
          }
          
          if (results.length === 0) {
              res.status(400).json({ success: false, message: "User not found" });
              return;
          }

          const hashedPassword = results[0].app_password;
          
          const match = await bcrypt.compare(app_password, hashedPassword);
          if (match) {
              res.json({ success: true, message: "Authentication successful" });
          } else {
              res.status(401).json({ success: false, message: "Invalid password" });
          }
      });
  } catch (error) {
      console.error('Error comparing password:', error);
      res.status(500).send("Password comparison failed");
  }
});
// app.post("/login",(req,res)=>{
//   const{userid,app_password}=req.body;
//   console.log('Received request with body:',req.body);
//   const query = "SELECT COUNT(*) AS count FROM userauthenticationtable  WHERE userid = ? AND app_password = ?";
//   db.query(query,[userid,app_password],(err,result)=>{
//     if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).send("Error");
//     }
//       if(result[0].count === 1){
//         res.json({ success: true });
//         console.log("successfully logged in")
//       } 
//       else{
//         res.json({ success: false });
//         console.log("user authentication failure");
//       }
//   }
//     )
// });


// hashing password
// const saltRounds=20;
// const hashPassword = async (plainPassword) => {
//   try {
//       const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
//       return hashedPassword;
//   } catch (error) {
//       console.error('Error hashing password:', error);
//       throw error;
//   }
// };

//Register
app.post("/register", async (req, res) => {
  const { userid, app_password } = req.body;
  
  try {
      const hashedPassword = await bcrypt.hash(app_password, 10); // 10 -> saltRounds
      
      console.log('Received request with body:', req.body);
      
      db.query("INSERT INTO userauthenticationtable (userid, app_password) VALUES (?, ?)", [userid, hashedPassword], (err, result) => {
          if (err) {
              console.error('Error executing query:', err);
              res.status(500).send("Database insertion failed");
          } else {
              res.json({ success: true });
              console.log('Query executed successfully:', result);
          }
      });
  } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).send("Password hashing failed");
  }
});

// app.post("/register",(req,res) =>{
//     const {userid,app_password} = req.body;
//    const hashed_password = async (app_password) => {
//     try {
//         const hashedPassword = await bcrypt.hash(app_password, 10 ); // 10 -> saltRounds
//         return hashedPassword;
//     } catch (error) {
//         console.error('Error hashing password:', error);
//         throw error;
//     }
// };
//     console.log('Received request with body:', req.body);
//     db.query("INSERT INTO userauthenticationtable (userid,app_password) VALUES (?,?)",[userid,hashed_password],(err,result)=>{
//        if (err) {
//            console.error('Error executing query:', err);
//            res.status(500).send("Database insertion failed");
//        } else {
//            res.json({ success: true });
//            console.log('Query executed successfully:', result);
//        }
//     });
//    });


// app.post('/addpassword', async (req, res) => {
//     const { password, newTitle,userid } = req.body;
//       try {
//           const hashedPassword = await bcrypt.hash(password, 10 ); // 10 -> saltRounds
//           console.log('Received request with body:', req.body); // Added logging for debugging
//           db.query("INSERT INTO passwords (password, title,userid) VALUES (?, ?,?)", [hashedPassword, newTitle,userid], (err, result) => {
//               if (err) {
//                   console.error('Error executing query:', err);
//                   res.status(500).send("Database insertion failed");
//               } else {
//                   res.json({ success: true });
//                   console.log('Query executed successfully:', result);
//               }
//           });
//       } catch (error) {
//           console.error('Error hashing password:', error);
//           throw error;
//       }
// });

// adding password
app.post('/addpassword', async (req, res) => {
    const { password, newTitle, userid } = req.body;
    console.log('Received request with body:', req.body); // Logging the request body

    try {
        const encryptedPassword = encrypt(password); // Encrypting the password
        console.log('Encrypted password:', encryptedPassword); // Logging the encrypted password

        const query = `
            INSERT INTO passwords (password, title, userid) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE password = VALUES(password), title = VALUES(title)
        `;

        db.query(query, [encryptedPassword, newTitle, userid], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send("Database insertion failed");
            } else {
                console.log('Inserted/Updated password entry:', result);
                res.json({ success: true, message: "Password inserted/updated successfully" });
            }
        });
    } catch (error) {
        console.error('Error encrypting password:', error);
        res.status(500).send("Password encryption failed");
    }
});



//without update 

// app.post('/addpassword', async (req, res) => {
//     const { password, newTitle, userid } = req.body;
//     try {
//         const encryptedPassword = encrypt(password); // Encrypting the password
//         console.log('Received request with body:', req.body); // Added logging for debugging
//         db.query("INSERT INTO passwords (password, title, userid) VALUES (?, ?, ?)", [encryptedPassword, newTitle, userid], (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err);
//                 res.status(500).send("Database insertion failed");
//             } else {
//                 res.json({ success: true });
//                 console.log('Query executed successfully:', result);
//             }
//         });
//     } catch (error) {
//         console.error('Error encrypting password:', error);
//         res.status(500).send("Password encryption failed");
//     }
// });

