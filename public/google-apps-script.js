/**
 * Google Apps Script for "Connect with @Ritesh" Portfolio Form
 * 
 * Setup instructions:
 * 1. Open Google Sheets (create a new sheet or use an existing one).
 * 2. In row 1 of Sheet1, add headers:
 *    A1: Timestamp | B1: Name | C1: Designation | D1: Contact No | E1: Email Address | F1: Social Media | G1: Message
 * 3. In the top menu, go to: Extensions > Apps Script.
 * 4. Replace any default code in Code.gs with this exact script.
 * 5. Click "Deploy" (top right blue button) > "New deployment".
 * 6. Click the gear icon next to "Select type" and choose "Web app".
 * 7. Configure:
 *    - Description: Portfolio Webhook
 *    - Execute as: Me (<your-email>)
 *    - Who has access: Anyone (MUST be Anyone so visitors can submit)
 * 8. Click "Deploy", approve access/permissions if asked.
 * 9. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 10. In your portfolio, click "Send Message" > click "Google Sheet Setup" gear icon, and paste the URL.
 */

const RECIPIENT_EMAIL = "singhritesh8236@gmail.com, riteshsingh.analytics@gmail.com";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let data = {};
    
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    const timestamp = new Date();
    const name = data.name || "N/A";
    const designation = data.designation || "N/A";
    const contactNo = data.contactNo || "N/A";
    const email = data.email || "N/A";
    const socialProfile = data.socialProfile || "N/A";
    const message = data.message || "N/A";

    // 1. Append row to Google Sheet
    sheet.appendRow([
      timestamp,
      name,
      designation,
      contactNo,
      email,
      socialProfile,
      message
    ]);

    // 2. Shoot instant email notification to Ritesh
    const subject = "🚀 New Portfolio Inquiry: " + name + " (" + designation + ")";
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4); padding: 24px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 22px;">New Inquiry: Connect with @Ritesh</h2>
          <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">Someone submitted your portfolio contact form.</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #64748b;">Name:</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Designation:</td>
              <td style="padding: 10px 0; color: #0f172a;">${designation}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Contact No:</td>
              <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${contactNo}" style="color: #6366f1; text-decoration: none;">${contactNo}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Email Address:</td>
              <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Social Media:</td>
              <td style="padding: 10px 0; color: #0f172a;">${socialProfile}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #8b5cf6; border-radius: 4px;">
            <p style="margin: 0 0 6px; font-weight: bold; color: #475569; font-size: 13px; text-transform: uppercase;">Message:</p>
            <p style="margin: 0; color: #1e293b; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}?subject=Re:%20Inquiry%20from%20Portfolio&body=Hi%20${encodeURIComponent(name)},%0D%0A%0D%0AThank%20you%20for%20reaching%20out!" 
               style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Reply Directly via Email
            </a>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px 24px; font-size: 12px; color: #94a3b8; text-align: center;">
          Received via Er. Ritesh Singh Portfolio • ${timestamp.toLocaleString()}
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      replyTo: email !== "N/A" ? email : undefined,
      subject: subject,
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data recorded in Google Sheet and notification email sent!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheets Webhook for Ritesh's Portfolio is Active! Use POST to submit data.");
}
