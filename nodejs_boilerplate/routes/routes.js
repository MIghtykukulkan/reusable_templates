//const mysqldb = require('./src/adapters/mysqldb')

const mybusiness = require('../src/core/mybusiness');
const to = require('await-to-js').default;
var fs = require('fs');
var db = require('../src/adapters/mongodb');
var jwt = require('jsonwebtoken')
const passport = require('passport');
require('../src/services/passport')
/*
//---------------------------------
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


//hardcoded users need to be removed while working with DB
var users = [
    {
      id: 1,
      name: 'jonathanmh',
      password: '%2yx4'
    },
    {
      id: 2,
      name: 'test',
      password: 'test'
    }
  ];

  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'secret string';
  
  var strategy = new JWTStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  
passport.use(strategy);
//------------------------------------------------
*/

module.exports = router => {

 
    router.get('/',passport.authenticate('jwt', { session: false }), async (req, res) => res.end('test service!'));

    router.get('/findgitusers',async (req,res)=>{
        let error, result, finaljson;
        //----------------only modify this portion--------------
        [error, result] = await to(mybusiness.findGitUsers());
        //-------------------------------------------------------
        finaljson = {"error":error, "result":result}
        res.send(finaljson);
        
    });

    //file upload 
    router.post('/upload', function(req, res) {
        req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream('./uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send({"error":null, "result":"file uploaded"});
        });
    });

    });

    //database call

    router.post('/createNewuser', async(req,res)=>{
        let error, result, finaljson;
        //----------------only modify this portion--------------
        let user = req.body;
        [error, result] = await to(mybusiness.createNewUser(db, user));
        //-------------------------------------------------------
        finaljson = {"error":error, "result":result}
        res.send(finaljson);
        
    })

}

