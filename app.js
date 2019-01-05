const   nodemailer  = require('nodemailer')
        express     = require('express')
        http        = require('http')
        app         = express()
        bodyParser  = require('body-parser');
require('dotenv').config();

//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//POST ROUTE FROM PORTFOLIO CONTACT
app.post('/contact', function(req,res){
    
    let mailOpts, smtpTrans;
    
    smtpTrans = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        tls: { rejectUnauthorized: false },
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + ' &gt;',
        to: process.env.GMAIL_USER,
        subject: 'Nouveau message du formulaire de contact du portfolio',
        text: `${req.body.name} (${req.body.email}) a écrit: ${req.body.message}`
    };

    smtpTrans.sendMail(mailOpts, function(error, response) {
        if(error){
            //res.render('contact-failure');
            res.send(error);
        }else{
            //res.render('contact-success');
            res.send('mail send');
        }
    });
});

//Server setup
const port = process.env.PORT || 3005;
const server = http.createServer(app);

server.listen(port);