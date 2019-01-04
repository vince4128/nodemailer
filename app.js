const   nodemailer  = require('nodemailer')
        express     = require('express')
        app         = express()
        bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

//POST ROUTE FROM PORTFOLIO CONTACT
app.post('/contact', function(req,res){
    
    let mailOpts, smtpTrans;
    
    smtpTrans = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });

    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + ' &gt;',
        to: GMAIL_USER,
        subject: 'Nouveau message du formulaire de contact du portfolio',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };

    smtpTrans.sendMail(mailOpts, function(error, response) {
        if(error){
            //res.render('contact-failure');
            res.send('error');
        }else{
            //res.render('contact-success');
            res.send('mail send');
        }
    });
});
