// 이 파일에서만 no-global-assign ESlint 옵션을 비활성화합니다.
/* eslin-disable no-global-assign */

require = require('esm')(module);
module.exports = require('./main.js');