const slogan = 'Comp, Done Better';
const companyName = 'BetterComp Inc';


  const getCompanyLogoLink = (NETMODE) => {
    const logo = 'bc-without-slogan.png';
    const companyLogoLink = NETMODE === 'live' ?
      `https://bettercomp.com/static/assets/images/logo/${logo}`
      :
      `https://dev.bettercomp.com/static/assets/images/logo/${logo}`;

    return companyLogoLink;
  };

  const getCompanyLink = (NETMODE) => {
    const companyLink = NETMODE === 'live' ?
        'https://bettercomp.com'
        :
        'https://dev.bettercomp.com';

    return companyLink;
  };

  const displayCopyRight = () => {
    return `
    
    <tr>
    <td class="mailpoet_divider" valign="top" style="border-collapse:collapse;padding:7.5px 20px 7.5px 20px">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0">
        <tr>
          <td class="mailpoet_divider-cell" style="border-collapse:collapse;border-top-width:1px;border-top-style:solid;border-top-color:#aaaaaa">
         </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <tr>
    <td class="mailpoet_header_footer_padded mailpoet_footer" style="border-collapse:collapse;padding:10px 20px;line-height:19.2px;text-align:center;color:#222222;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:12px">
      <span style="color: #333333;">Copyright © 2020 BetterComp, All rights reserved.</span><br /><span style="color: #333333;">California, USA</span>
    </td>
  </tr>
  
  <tr>
    <td class="mailpoet_spacer" bgcolor="#eeeeee" height="20" valign="top" style="border-collapse:collapse"></td>
  </tr>
    `;
  };

  const displayLoginButton = (NETMODE) => {
    const loginLink = getCompanyLink(NETMODE);
    if (loginLink) {
      return `
      <tr>
      <td class="mailpoet_padded_vertical mailpoet_padded_side" valign="top" style="border-collapse:collapse;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
        <div>
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0">
            <tr>
              <td class="mailpoet_button-container" style="border-collapse:collapse;text-align:center"><!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
                  href="${loginLink}"
                  style="height:80px;
                         width:250px;
                         v-text-anchor:middle;"
                  arcsize="100%"
                  strokeweight="0px"
                  strokecolor="#0074a2"
                  fillcolor="#0092d0">
                <w:anchorlock/>
                <center style="color:#ffffcc;
                  font-family:Verdana;
                  font-size:14px;
                  font-weight:bold;">Login
                </center>
                </v:roundrect>
                <![endif]--><a class="mailpoet_button" href="${loginLink}" style="color:#ffffcc;text-decoration:none !important;display:inline-block;-webkit-text-size-adjust:none;mso-hide:all;text-align:center;background-color:#0092d0;border-color:#0074a2;border-width:0px;border-radius:40px;border-style:solid;width:200px;line-height:40px;font-family:Verdana, Geneva, sans-serif;font-size:14px;font-weight:normal"> Login</a>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
      `;
    }

      return '';
  };

const displayHead = () => {
  return `
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <title>${slogan}</title>
    <style type="text/css"> @media screen and (max-width: 480px) {
            .mailpoet_button {width:100% !important;}
        }
 @media screen and (max-width: 599px) {
            .mailpoet_header {
                padding: 10px 20px;
            }
            .mailpoet_button {
                width: 100% !important;
                padding: 5px 0 !important;
                box-sizing:border-box !important;
            }
            div, .mailpoet_cols-two, .mailpoet_cols-three {
                max-width: 100% !important;
            }
        }
</style>

</head>

  `;
};

const bodyOpening = () => {
  return `
  
  <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="margin:0;padding:0;background-color:#eeeeee">

  `;
};

const bodyClosing = () => {
  return `
  
  </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
                    </tbody>
                </table><!--[if mso]>
                </td>
                </tr>
                </table>
                <![endif]--></td>
        </tr>
        
        </tbody>
        
    </table>
    
</body>
  `;
};

const displayCompanyLogo = (NETMODE) => {
  const companyLink = getCompanyLink(NETMODE);
  const companyLogoLink = getCompanyLogoLink(NETMODE);

  const logoImgWidth = 100;

  const companyLogoLinkHtml = companyLogoLink === '' ?
    ''
    :
    `
      <td width="220" valign="top">
        <![endif]--><div style="display:inline-block; max-width:220px; vertical-align:top; width:100%;">
          <table class="mailpoet_cols-two" style="border-collapse:collapse;width:100%;max-width:220px;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;margin-left:auto;margin-right:auto;padding-left:0;padding-right:0" width="220" cellspacing="0" cellpadding="0" border="0" align="left">
            <tbody>
      <tr>
        <td class="mailpoet_image mailpoet_padded_vertical mailpoet_padded_side" style="border-collapse:collapse;padding-top:25px;padding-bottom:0px;padding-left:20px;padding-right:20px" valign="top" align="left">
          <a href="${companyLink}" target="_blank" style="color:#21759B;text-decoration:underline"><img src="${companyLogoLink}" alt="" style="height:auto;max-width:100%;-ms-interpolation-mode:bicubic;border:0;display:block;outline:none;text-align:center" width="${logoImgWidth}"></a>
        </td>
      </tr>
            </tbody>
          </table>
        </div><!--[if mso]>
      </td>
    `;

  return `
  
    <table class="mailpoet_template" border="0" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0">
        <tbody>
        <tr>
            <td align="center" class="mailpoet-wrapper" valign="top" style="border-collapse:collapse;background-color:#eeeeee"><!--[if mso]>
                <table align="center" border="0" cellspacing="0" cellpadding="0"
                       width="660">
                    <tr>
                        <td class="mailpoet_content-wrapper" align="center" valign="top" width="660">
                <![endif]--><table class="mailpoet_content-wrapper" border="0" width="660" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background-color:#ffffcc;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;max-width:660px;width:100%">
                    <tbody>


      <tr>
        <td class="mailpoet_content" align="center" style="border-collapse:collapse;background-color:#ffffcc!important" bgcolor="#ffffcc">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0">
            <tbody>
              <tr>
                <td style="border-collapse:collapse;padding-left:0;padding-right:0">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" class="mailpoet_cols-one" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;margin-left:auto;margin-right:auto;padding-left:0;padding-right:0">
                    <tbody>
                    <tr>
                    <td style="border-collapse:collapse;font-size:0" align="center"><!--[if mso]>
                      <table border="0" width="100%" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>

          ${companyLogoLinkHtml}

          <td width="440" valign="top">
            <![endif]--><div style="display:inline-block; max-width:${companyLogoLink ? '440px' : '100%'}; vertical-align:top; width:100%;">
              <table class="mailpoet_cols-two" style="border-collapse:collapse;width:100%;max-width:440px;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;margin-left:auto;margin-right:auto;padding-left:0;padding-right:0" width="440" cellspacing="0" cellpadding="0" border="0" align="left">
                <tbody>
          <tr>
            <td class="mailpoet_text mailpoet_padded_vertical mailpoet_padded_side" style="border-collapse:collapse;padding-top:10px;padding-bottom:10px;padding-left:0px;padding-right:20px;word-break:break-word;word-wrap:break-word" valign="top">
              <h1 style="margin:0 0 9px;color:#111111;font-family:Verdana,Geneva,sans-serif;font-size:30px;line-height:48px;margin-bottom:0;text-align:left;padding:0;font-style:normal;font-weight:normal">
                <a href="${companyLink}" target="_blank" style="color:#0077b5;text-decoration:none;">
                  ${companyName}
                </a>
              </h1>
            </td>
          </tr>
                </tbody>
              </table>
            </div><!--[if mso]>
          </td>
                      </tr>
                    </tbody>
                  </table>
                <![endif]--></td>
                </tr>


                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td class="mailpoet_content" align="center" style="border-collapse:collapse;background-color:#f8f8f8!important" bgcolor="#f8f8f8">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0">
            <tbody>
              <tr>
                <td style="border-collapse:collapse;padding-left:0;padding-right:0">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" class="mailpoet_cols-one" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;margin-left:auto;margin-right:auto;padding-left:0;padding-right:0">
                    <tbody>
      <tr>
        <td class="mailpoet_text mailpoet_padded_vertical mailpoet_padded_side" valign="top" style="border-collapse:collapse;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;word-break:break-word;word-wrap:break-word">
          <table style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0" width="100%" cellpadding="0">
        <tr>
          <td class="mailpoet_paragraph" style="border-collapse:collapse;color:#000000;font-family:Verdana,Geneva,sans-serif;font-size:14px;line-height:22.4px;word-break:break-word;word-wrap:break-word;text-align:left">
            <strong></strong>
          </td>
        </tr></table>

  
  `;
};

const displayUserRegisterStatement = (str) => {
  return `
  
      <tr>
        <td class="mailpoet_text mailpoet_padded_vertical mailpoet_padded_side" valign="top" style="border-collapse:collapse;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;word-break:break-word;word-wrap:break-word">
          <table style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0" width="100%" cellpadding="0">
            <tr>
              <td class="mailpoet_paragraph" style="border-collapse:collapse;color:#000000;font-family:Verdana,Geneva,sans-serif;font-size:14px;line-height:22.4px;word-break:break-word;word-wrap:break-word;text-align:left">
                <span>${str}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
  `;
};

const displayUserRegisterInfo = (firstName, lastName, companyName, emailAddress, password) => {
  return `
  
      <tr>
        <td class="mailpoet_text mailpoet_padded_vertical mailpoet_padded_side" valign="top" style="border-collapse:collapse;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;word-break:break-word;word-wrap:break-word">

<table style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0" width="100%" cellpadding="0">
        <tr>
          <td class="mailpoet_paragraph" style="border-collapse:collapse;color:#000000;font-family:Verdana,Geneva,sans-serif;font-size:14px;line-height:22.4px;word-break:break-word;word-wrap:break-word;text-align:left">
            First Name:<strong> ${firstName}</strong>
          </td>
        </tr>
</table>

<table style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0" width="100%" cellpadding="0">
        <tr>
          <td class="mailpoet_paragraph" style="border-collapse:collapse;color:#000000;font-family:Verdana,Geneva,sans-serif;font-size:14px;line-height:22.4px;word-break:break-word;word-wrap:break-word;text-align:left">
            Last Name:<strong> ${lastName}</strong>
          </td>
        </tr>
</table>

<table style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0" width="100%" cellpadding="0">
        <tr>
          <td class="mailpoet_paragraph" style="border-collapse:collapse;color:#000000;font-family:Verdana,Geneva,sans-serif;font-size:14px;line-height:22.4px;word-break:break-word;word-wrap:break-word;text-align:left">
            Company Name: <strong>${companyName}</strong> <br /><br />
          </td>
        </tr>
</table>

<table style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0" width="100%" cellpadding="0">
        <tr>
          <td class="mailpoet_paragraph" style="border-collapse:collapse;color:#000000;font-family:Verdana,Geneva,sans-serif;font-size:14px;line-height:22.4px;word-break:break-word;word-wrap:break-word;text-align:left">
            Email: <strong>${emailAddress}</strong>
          </td>
        </tr>
</table>

<table style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0" width="100%" cellpadding="0">
        <tr>
          <td class="mailpoet_paragraph" style="border-collapse:collapse;color:#000000;font-family:Verdana,Geneva,sans-serif;font-size:14px;line-height:22.4px;word-break:break-word;word-wrap:break-word;text-align:left">
            Password: <strong>${password}</strong><br /><br />
          </td>
        </tr>
</table>

        </td>
      </tr>

      <tr>
        <td class="mailpoet_divider" valign="top" style="border-collapse:collapse;padding:0px 20px 0px 20px">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0">
            <tr>
              <td class="mailpoet_divider-cell" style="border-collapse:collapse;border-top-width:1px;border-top-style:solid;border-top-color:#aaaaaa">
             </td>
            </tr>
          </table>
        </td>
      </tr>
  `;
};

const userRegisterTitle = () => {
  return `
  
  <h1 style="margin:0 0 9px;color:#111111;font-family:Verdana,Geneva,sans-serif;font-size:30px;line-height:48px;text-align:left;padding:0;font-style:normal;font-weight:normal">User Registration Confirmation</h1>

<table style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0" width="100%" cellpadding="0">
        <tr>
          <td class="mailpoet_paragraph" style="border-collapse:collapse;color:#000000;font-family:Verdana,Geneva,sans-serif;font-size:14px;line-height:22.4px;word-break:break-word;word-wrap:break-word;text-align:left">
            <strong></strong>
          </td>
        </tr></table>

</td>
</tr>

  `;
};

const contentBodyBuilderForUserRegister = (data, NETMODE) => {
  const {
    firstName, lastName, companyName, emailAddress, password
  } = data;

  const firstStatement = `
  Login BetterComp platform with the default password (provided above). After login, please change the password as soon as possible.
  `;

  const bodyHtmlStr = `
  
    ${bodyOpening()}

      ${displayCompanyLogo(NETMODE)}

      ${userRegisterTitle()}
      
      ${displayUserRegisterInfo(firstName, lastName, companyName, emailAddress, password)}
      
      ${displayUserRegisterStatement(firstStatement)}

      ${displayLoginButton(NETMODE)}

      ${displayCopyRight()}

    ${bodyClosing()}
  
  `;

  return bodyHtmlStr;
};

module.exports = {
  displayHead,
  contentBodyBuilderForUserRegister
};
