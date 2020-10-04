const QRCode = require('qrcode');
const iOsCanvas = document.querySelector('#iOsQrCode');

//FN;CHARSET=UTF-8:###{firstName}###　###{lastName}###
const VCARD_TEMPLATE = `BEGIN:VCARD
VERSION:4.0
N;CHARSET=UTF-8:###{lastName}###;###{firstName}###;;;
X-PHONETIC-FIRST-NAME;CHARSET=UTF-8:###{firstNameKana}###
X-PHONETIC-LAST-NAME;CHARSET=UTF-8:###{lastNameKana}###
`;
//SORT-STRING;CHARSET=SHIFT_JIS:###{lastNameKana}### ###{firstNameKana}###

const VCARD_END = 'END:VCARD';

const VCARD_TEL = 'TEL;TYPE=CELL:';
const VCARD_EMAIL = 'EMAIL;TYPE=INTERNET:';

document.querySelector('button').addEventListener('click', () => {
  const lastName = document.querySelector('#lastName').value;
  const firstName = document.querySelector('#firstName').value;
  const lastNameKana = document.querySelector('#lastNameKana').value;
  const firstNameKana = document.querySelector('#firstNameKana').value;

  let vcard = VCARD_TEMPLATE.replace(/###{lastName}###/g, lastName)
    .replace(/###{firstName}###/g, firstName)
    .replace(/###{lastNameKana}###/g, lastNameKana)
    .replace(/###{firstNameKana}###/g, firstNameKana);

  const tel = document.querySelector('#tel').value;
  if (tel.length != 0) {
    vcard = `${vcard}${VCARD_TEL}${tel}\n`;
  }

  const email = document.querySelector('#email').value;
  if (email.length != 0) {
    vcard = `${vcard}${VCARD_EMAIL}${email}\n`;
  }

  vcard = vcard + VCARD_END;

  console.log(vcard);

  QRCode.toCanvas(iOsCanvas, vcard, function (error) {
    iOsCanvas.style.display = 'inline-block';
  });

  document.querySelector('#download').addEventListener('click', () => {
    const link = document.createElement("a");
    link.href = iOsCanvas.toDataURL("image/png");
    link.download = "test.png";
    link.click();
  });
});
