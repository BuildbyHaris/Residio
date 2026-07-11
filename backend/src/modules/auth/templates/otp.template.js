export const otpTemplate = ({
  userName,
  otp,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>

body{
background:#f5f7fb;
font-family:Arial,sans-serif;
padding:40px;
}

.container{
max-width:600px;
margin:auto;
background:white;
padding:40px;
border-radius:12px;
box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.logo{
font-size:28px;
font-weight:bold;
color:#2563eb;
margin-bottom:20px;
}

.heading{
font-size:24px;
font-weight:bold;
color:#111827;
margin-bottom:20px;
}

.text{
font-size:16px;
color:#4b5563;
line-height:1.8;
}

.otp{
margin:35px 0;
padding:20px;
font-size:36px;
font-weight:bold;
letter-spacing:10px;
text-align:center;
background:#eff6ff;
border-radius:10px;
color:#2563eb;
}

.note{
margin-top:30px;
font-size:14px;
color:#6b7280;
}

.footer{
margin-top:40px;
font-size:13px;
color:#9ca3af;
text-align:center;
}

</style>

</head>

<body>

<div class="container">

<div class="logo">
Residio
</div>

<div class="heading">
Verify Your Email
</div>

<p class="text">

Hi <strong>${userName}</strong>,

</p>

<p class="text">

Welcome to Residio.

Use the verification code below to verify your account.

</p>

<div class="otp">

${otp}

</div>

<p class="text">

This OTP is valid for <strong>15 minutes</strong>.

If you didn't create an account, you can safely ignore this email.

</p>

<div class="footer">

© ${new Date().getFullYear()} Residio.
All rights reserved.

</div>

</div>

</body>

</html>
`;
};