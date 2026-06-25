const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendInterestNotification(interest) {
    const { name, email, course, details } = interest;

    const { data, error } = await resend.emails.send({
        from: process.env.NOTIFY_FROM,
        to: process.env.NOTIFY_TO,
        subject: `New T-Level Interest from ${name} - ${course}`,
        html: `
        <h2>New Register Interest Submission</h2>
        <p><strong>Name: </strong> ${name}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Course: </strong> ${course}</p>
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
        html: `<p>Hi ${name}, thanks for registering interest in this course. We will follow up and get back to you shortly</p>`
    });
    if (error) throw new Error(`Resend failed: ${error.message}`);
    return data;
}

module.exports = { sendInterestNotification, sendUserConfirmation };