//const mysqldb = require('./src/adapters/mysqldb')

const mybusiness = require('../src/core/mybusiness');
const to = require('await-to-js').default;
var fs = require('fs');
var db = require('../src/adapters/mongodb');
const passport = require('passport');
require('../src/services/passport')


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

