var _0x25c9=['touchstart','getElementById','warningBox','width','100%','mobileRunning','gameBox','body','clientWidth','clientHeight','createElement','div','style','height','opacity','position','absolute','background','url(\x22assets/graphics/general/','.png\x22)','backgroundSize','cover','bottom','toString','pressed','playerContext','append','mobileControls','left','jump','shoot','addEventListener','mousedown','mobileJumpDown','mouseup'];(function(_0x43bdf6,_0x377603){var _0x1172eb=function(_0x335513){while(--_0x335513){_0x43bdf6['push'](_0x43bdf6['shift']());}};_0x1172eb(++_0x377603);}(_0x25c9,0x6a));var _0xd472=function(_0x5a3f90,_0x2aafb7){_0x5a3f90=_0x5a3f90-0x0;var _0xd14f2=_0x25c9[_0x5a3f90];return _0xd14f2;};function setupMobile(){var _0x1fdb29=document[_0xd472('0x0')](_0xd472('0x1'));_0x1fdb29['style'][_0xd472('0x2')]=_0xd472('0x3');const _0x91b136=document;game[_0xd472('0x4')]=!![];var _0x33007c=_0x91b136[_0xd472('0x0')](_0xd472('0x5'));var _0x33d3f8=_0x91b136[_0xd472('0x6')][_0xd472('0x7')];var _0x5db964=_0x91b136['body'][_0xd472('0x8')];var _0xf2ec2c=_0x5db964>_0x33d3f8?_0x5db964:_0x33d3f8;function _0x9828c1(_0x4cb011,_0x1e19f2,_0x1e0e8b){let _0x4c6249=_0x91b136[_0xd472('0x9')](_0xd472('0xa'));let _0x599447=_0xf2ec2c/0x8;_0x4c6249[_0xd472('0xb')][_0xd472('0x2')]=~~_0x599447+'px';_0x4c6249['style'][_0xd472('0xc')]=~~_0x599447+'px';_0x4c6249[_0xd472('0xb')][_0xd472('0xd')]=0x0;_0x4c6249[_0xd472('0xb')][_0xd472('0xe')]=_0xd472('0xf');_0x4c6249[_0xd472('0xb')][_0xd472('0x10')]=_0xd472('0x11')+_0x1e0e8b+_0xd472('0x12');_0x4c6249[_0xd472('0xb')][_0xd472('0x13')]=_0xd472('0x14');_0x4c6249[_0xd472('0xb')][_0xd472('0x15')]=(_0x1e19f2*_0x599447+0x14)[_0xd472('0x16')]()+'px';_0x4c6249[_0xd472('0xb')]['left']=~~(_0x599447*_0x4cb011)+'px';_0x4c6249[_0xd472('0x17')]=![];_0x4c6249[_0xd472('0x18')]=null;_0x33007c[_0xd472('0x19')](_0x4c6249);return _0x4c6249;}game['mobileControls']={};game[_0xd472('0x1a')][_0xd472('0x1b')]=_0x9828c1(0.2,0x0,_0xd472('0x1b'));game[_0xd472('0x1a')]['right']=_0x9828c1(1.5,0x0,'right');game[_0xd472('0x1a')][_0xd472('0x1c')]=_0x9828c1(5.5,0x0,_0xd472('0x1c'));game[_0xd472('0x1a')][_0xd472('0x1d')]=_0x9828c1(5.5,1.2,'shoot');game['mobileControls']['jump'][_0xd472('0x1e')](_0xd472('0x1f'),()=>game[_0xd472('0x20')]=!![]);game[_0xd472('0x1a')][_0xd472('0x1c')][_0xd472('0x1e')](_0xd472('0x21'),()=>game[_0xd472('0x20')]=![]);game[_0xd472('0x1a')][_0xd472('0x1c')]['addEventListener'](_0xd472('0x22'),()=>game['mobileJumpDown']=!![]);game[_0xd472('0x1a')][_0xd472('0x1c')][_0xd472('0x1e')]('touchend',()=>game['mobileJumpDown']=![]);}