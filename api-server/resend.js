const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendInterestNotification(interest) {
    const { name, email, courses, details } = interest;

    const { data, error } = await resend.emails.send({
        from: process.env.NOTIFY_FROM,
        to: process.env.NOTIFY_TO,
        subject: `New T-Level Interest from ${name} - ${courses}`,
        html: `
        <h2>New Register Interest Submission</h2>
        <p><strong>Name: </strong> ${name}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Course: </strong> ${courses}</p>
        <p><strong>Details: </strong> ${details}</p> 
        `,
    });

    if (error) {
        throw new Error(`Resend failed: ${error.message}`);
    }
    return data;

}

async function sendUserConfirmation(interest) {
    const { name, email, courses } = interest;
    const { data, error } = await resend.emails.send({
        from: process.env.NOTIFY_FROM,
        to: email,
        subject: `We've received your interest in ${courses}`,
        html: `
        <!DOCTYPE html>
        <body>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>Verify your identity</title>
        <style>
            html,
            body {
                margin: 0 auto !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
                font-family: "Amazon Ember", "Helvetica Neue", Roboto, Arial, sans-serif;
            }
            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }
            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }
            table {
                border-spacing: 0 !important;
                border-collapse: collapse !important;
                table-layout: fixed !important;
                margin: 0 auto !important;
            }
            table table table {
                table-layout: auto;
            }
            img {
                -ms-interpolation-mode:bicubic;
            }
            *[x-apple-data-detectors],  /* iOS */
            .x-gmail-data-detectors,    /* Gmail */
            .x-gmail-data-detectors *,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                .email-container {
                    min-width: 320px !important;
                }
            }
            /* iPhone 6, 6S, 7, 8, and X */
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                .email-container {
                    min-width: 375px !important;
                }
            }
            /* iPhone 6+, 7+, and 8+ */
            @media only screen and (min-device-width: 414px) {
                .email-container {
                    min-width: 414px !important;
                }
            }
            /* Media Queries */
            @media screen and (max-width: 600px) {
                .email-container {
                    padding-top: 0 !important;
                }

                #emailBodyContainer {
                    border: 0 !important;
                    border-bottom: 1px solid #DDD !important;
                }

                body,
                center {
                    background: #FFF !important;
                }

                #logoContainer td {
                    padding: 20px 0 20px 0 !important;
                }

                #footer {
                    background: #F9F9F9 !important;
                }
            }
        </style>
        </head>
        <body width="100%" style="margin: 0; mso-line-height-rule: exactly; background-color: #F0F2F3;">
        <div style="margin: auto; max-width: 600px; padding-top: 50px;" class="email-container">
        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" align="center" id="logoContainer" style="background: #252F3D; border-radius: 3px 3px 0 0; max-width: 600px;">
            <tr>
            <td style="background: #252F3D; border-radius: 3px 3px 0 0; padding: 20px 0 10px 0; text-align: center;">
                <img src="https://cdn.freebiesupply.com/images/large/2x/amazon-logo-transparent.png"
                    width="100" height="45" alt="AWS logo" border="0" style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
            </td>
            </tr>
        </table>
        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" align="center" id="emailBodyContainer" style="border: 0px; border-bottom: 1px solid #D6D6D6; max-width: 600px;">
            <tr>
                <td class="module" style="background-color: #FFF; color: #444; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 140%; padding: 25px 35px;">
                <h1 style="font-size: 20px; font-weight: bold; line-height: 1.3; margin: 0 0 15px 0;">Amazon T-Levels</h1>
                <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">Hello,</p>
                <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">Thank you for submitting your expression of interest for the Amazon T-Level ${courses} course! An Amazon member will be in touch shortly to review your interest.</p>
                </td>
            </tr>
        <tr>
            <td class="module module-otp" style="background-color: #FFF; color: #444; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 140%; padding: 25px 35px; padding-top: 0; text-align: center;">
            <div class="label" style="font-weight: bold; padding-bottom: 15px;">${name}'s Expression Of Interest for</div>
            <div class="code" style="color: #000; font-size: 36px; font-weight: bold; padding-bottom: 15px;">${courses}</div>
            <div class="description" style="color: #444; font-size: 10px;">A amazon team member will review your interest and be in touch shortly</div>
            </td>
        </tr>
        <tr>
        <td class="module" style="background-color: #FFF; color: #444; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 140%; padding: 25px 35px;">
            <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">Thank you for submitting your expression of interest for the Amazon T-Level ${courses} course! An Amazon member will be in touch shortly to review your interest. In the meantime read up on our courses[1].</p>
            <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">[1] http://localhost:5500/explore</p>
        </td>
        </tr>
        <tr>
            <td class="module module-dark" style="background-color: #FFF; border-top: 1px solid #E0E0E0; color: #777; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 140%; padding: 25px 35px;">
                <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">If you have any questions, concerns, or require assistance, please do not hesitate to contact Amazon Support https://www.amazon.co.uk/gp/help/customer/display.html</p>
            <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">Amazon T-Levels will never email you and ask you to disclose or verify your password, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link. Instead, report the e-mail to Amazon for investigation.</p>
            </td>
        </tr>
        </table>
        <table role="presentation" cellSpacing="0" cellPadding="0" width="100%" align="center" id="footer" style="max-width: 600px;">
            <tr>
                <td style="color: #777; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 12px; line-height: 16px; padding: 20px 30px; text-align: center;">
                    Amazon T-Levels, is a subsidiary of Amazon.com, Inc. Amazon.com is a registered trademark of Amazon.com, Inc. This message was produced and distributed by Amazon T-Levels, 410 Terry Ave. North, Seattle, WA 98109-5210.
                </td>
            </tr>
        </table>
        </div>
        </body>
        </html></body></html>
        `
    });
    if (error) throw new Error(`Resend failed: ${error.message}`);
    return data;
}

module.exports = { sendInterestNotification, sendUserConfirmation };