const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                rejectUnauthorized: false
            },

        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: "<!DOCTYPE html><html xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" lang=\"en\">\n" +
                "    <head>\n" +
                "        <title>\n" +
                "\n" +
                "        </title>\n" +
                "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
                "        <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->\n" +
                "        <style>\n" +
                "*{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}@media (max-width:540px){.image_block img.big,.row-content{width:100%!important}.mobile_hide{display:none}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table!important;max-height:none!important}}\n" +
                "</style>\n" +
                "</head>\n" +
                "<body style=\"background-color:#7f2222;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none\">\n" +
                "    <table class=\"nl-container\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace:0;mso-table-rspace:0;background-color:#7f2222\">\n" +
                "        <tbody>\n" +
                "            <tr>\n" +
                "                <td>\n" +
                "                    <table class=\"row row-1\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace:0;mso-table-rspace:0\">\n" +
                "                        <tbody>\n" +
                "                            <tr>\n" +
                "                                <td>\n" +
                "                                    <table \n" +
                "class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace:0;mso-table-rspace:0;color:#000;width:520px\" width=\"520\">\n" +
                "<tbody>\n" +
                "   \n" +
                "\n" +
                "       \n" +
                "    \n" +
                "<table class=\"image_block block-2\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace:0;mso-table-rspace:0\">\n" +
                "    <tr>\n" +
                "        <td class=\"pad\" style=\"width:100%;padding-right:0;padding-left:0;margin-top: 10%\">\n" +
                "            <div class=\"alignment\" align=\"center\" style=\"line-height:10px; bottom: -30%;\">\n" +
                "                <img class=\"big\" \n" +
                "src=\"https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/0db9f180-d222-4b2b-9371-cf9393bf4764/0bd8b69e-4024-4f26-9010-6e2a146401fb/editor_images/12963735-5004-4d47-8dc2-5796599fb904.jpg\" style=\"display:block;height:auto;border:0;width:520px;max-width:100%\" width=\"520\"></div></td></tr></table><table class=\"button_block block-3\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace:0;mso-table-rspace:0\"><tr><td class=\"pad\"><div \n" +
                "class=\"alignment\" align=\"center\"><!--[if mso]><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"text\" style=\"height:50px;width:117px;v-text-anchor:middle;\" arcsize=\"34%\" strokeweight=\"0.75pt\" strokecolor=\"#3968fc\" fillcolor=\"#3968fc\"><w:anchorlock/><v:textbox inset=\"0px,0px,0px,0px\"><center style=\"color:#ffffff; font-family:Arial, sans-serif; font-size:19px\"><![endif]-->\n" +
                "<a href="+text+" target=\"_blank\" style=\"text-decoration:none;display:inline-block;color:#ffffff;background-color:#3968fc;border-radius:17px;width:auto;border-top:1px solid #3968fc;font-weight:700;border-right:1px solid #3968fc;border-bottom:1px solid #3968fc;border-left:1px solid #3968fc;padding-top:5px;padding-bottom:5px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;\"><span style=\"padding-left:20px;padding-right:20px;font-size:19px;display:inline-block;letter-spacing:1px;\"><span dir=\"ltr\" style=\"word-break: break-word; line-height: 38px;\">Vérifier</span></span></a>\n" +
                "<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->\n" +
                "</div>\n" +
                "</td>\n" +
                "</tr>\n" +
                "</table>\n" +
                "</td>\n" +
                "</tr>\n" +
                "<div class=\"alignment\" align=\"center\" style=\"line-height:10px;margin-bottom: -70.7%;right:50.2%;position: absolute;\">\n" +
                "    <img src=\"https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/0db9f180-d222-4b2b-9371-cf9393bf4764/0bd8b69e-4024-4f26-9010-6e2a146401fb/gUYHHIr9_400x400.jpg\" style=\"display:block;height:auto;border:0;width:104px;max-width:100%\" width=\"104\">\n" +
                "</div>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "</td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "</td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table><!-- End -->\n" +
                "<div style=\"background-color:transparent;\">\n" +
                "    <div style=\"Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;\" class=\"block-grid \">\n" +
                "        <div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">\n" +
                "            <!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"background-color:transparent;\" align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width: 500px;\"><tr class=\"layout-full-width\" style=\"background-color:transparent;\"><![endif]-->\n" +
                "            <!--[if (mso)|(IE)]><td align=\"center\" width=\"500\" style=\" width:500px; padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><![endif]-->\n" +
                "            <div class=\"col num12\" style=\"min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;\">\n" +
                "                <div style=\"background-color: transparent; width: 100% !important;\">\n" +
                "                    <!--[if (!mso)&(!IE)]><!--><div style=\"border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;\">\n" +
                "                        <!--<![endif]-->\n" +
                "\n" +
                "\n" +
                "                       \n" +
                "\n" +
                "\n" +
                "                        <!--[if (!mso)&(!IE)]><!-->\n" +
                "                    </div><!--<![endif]-->\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div></body></html>",
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

const sendEmailHotel = async (email, subject, text,text2,facture,rooms,user) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                rejectUnauthorized: false
            },

        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: "<div>"+ user.name + user.lastname + rooms.map((m)=>("<div>"+m.title+"</div>"))+"</div><button><a href="+text+">oui</a></button><button ><a href="+text2+">non</a></button>",
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports = {sendEmail , sendEmailHotel};
