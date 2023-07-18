// const User = require('../models/User.model')
// const jwt = require('jsonwebtoken')
// const sceretKey = require('../../configs/jwt.config')
// var bcrypt = require('bcryptjs');

// class UserController {
//     async handleRegister(req, res) {
//         // get username vs password ở body
//         const { username, password } = req.body;
//         try {
//             //kiểm tra username đã tồn tại chưa
//             const userName = await User.findOne({ where: { username } });

//             // nếu mà tồn tại username thì báo lỗi
//             if (userName) {
//                 return res.status(400).json({ msg: 'Username already exists' });
//             }
//             // trường hợp k tồn tại username
//             const saltRounds = 10; //độ an toàn mã hóa của password
//             const salt = await bcrypt.genSalt(saltRounds);
//             const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa password
//             const user = await User.create({ ...req.body, password: hashedPassword }); // Insert dữ liệu, password = password mới mã hóa

//             res.status(200).json({ msg: 'Register Successfully' });
//         } catch (error) {
//             // lỗi server
//             console.error('Error handling register:', error);
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     }

//     async handleLogin(req, res) {
//         // get username vs password ở body
//         const { username, password } = req.body;
//         try {
//             // Kiểm tra username và trả về toàn bộ data
//             const user = await User.findOne({ where: { username } })
//             // Nếu có user thì so sánh password bằng hàm compare
//             if (user) {
//                 const myPass = await bcrypt.compare(password, user.password)
//                 const accessToken = jwt.sign(user.dataValues, sceretKey)
//                 res.status(200).json({
//                     data: user,
//                     accessToken
//                 })
//             } else {
//                 // Nếu sai thì báo lỗi
//                 res.status(401).json({ msg: "Username dont exist" });
//             }
//         } catch (error) {
//             res.status(404).json({ msg: "not found" })
//         }
//     }

//     async handleGetUser(req, res) {
//         try {
//             const userAll = await User.findAll()
//             res.status(200).json({ data: userAll })
//         } catch (error) {
//             res.status(500).json({ msg: "Server loi" })
//         }
//     }
// }

// module.exports = new UserController()

const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwt.config');
const bcrypt = require('bcryptjs');
const sql = require('../../libs/database/db');

class UserController {
  handleRegister(req, res) {
    // get username and password from the body
    const { username, email, password } = req.body;

    // check if the username already exists
    sql.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error handling register:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // if the username already exists, return an error
      if (results.length > 0) {
        return res.status(400).json({ msg: 'Username already exists' });
      }

      // generate a salt and hash the password
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.error('Error handling register:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) {
            console.error('Error handling register:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }

          // insert the user into the database
          sql.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (err, results) => {
              if (err) {
                console.error('Error handling register:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
              }

              res.status(200).json({ msg: 'Register Successfully' });
            }
          );
        });
      });
    });
  }

  async handleLogin(req, res) {
    // get username and password from the body
    const { email, password } = req.body;

    // check if the username exists and compare passwords
    sql.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Error handling login:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // If user exists
      if (results.length > 0) {
        const user = results[0];

        try {
          // Compare passwords
          const isPasswordMatch = await bcrypt.compare(password, user.password);

          // If password matches, generate access token
          if (isPasswordMatch) {
            const accessToken = jwt.sign(user, sceretKey);
            return res.status(200).json({
              data: user,
              accessToken,
            });
          }
        } catch (error) {
          console.error('Error handling login:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
      }

      // If username doesn't exist or password doesn't match
      res.status(404).json({ msg: 'User not found' });
    });
  }

  async handleGetUser(req, res) {
    try {
      // Execute the query to get all users
      sql.query('SELECT * FROM users', (err, results) => {
        if (err) {
          console.error('Error handling get users:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        res.status(200).json({ data: results });
      });
    } catch (error) {
      console.error('Error handling get users:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  async handleEditUser(req, res) {
    console.log('Ktra body', req.params.id);
    const userName = req.body.username;
    let query = `UPDATE users SET username=? WHERE idUser=${req.params.id}`;
    // const nameEdit = usernameUpdate
    // };

    sql.query(query, [userName], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
      }
      res.status(200).json({ msg: 'Sửa username thành công' });
    });
  }

  handleGetUserById(req, res) {
    sql.query(`SELECT * FROM users where idUser=${req.params.id}`, (err, results) => {
      if (err) {
        console.error('Error handling get users:', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      console.log('data', results);
      res.status(200).json({ data: results });
    });
  }
}

module.exports = new UserController();
