var _0x3571=['Debug\x20empty10x10','Level10\x20Midground','pink','door','alpha','player','Level10\x20Speechbubbles','bubbles','forEach','anchor','setTo','scale','minimized','openBubble','Easing','Cubic','Out','position','physics','arcade','overlap','add','tween','build','setup','Level01'];(function(_0x3e4214,_0x44b30c){var _0x3df04a=function(_0x49921f){while(--_0x49921f){_0x3e4214['push'](_0x3e4214['shift']());}};_0x3df04a(++_0x44b30c);}(_0x3571,0xe7));var _0xa4e3=function(_0x6c775b,_0x5e2efa){_0x6c775b=_0x6c775b-0x0;var _0x135d5e=_0x3571[_0x6c775b];return _0x135d5e;};class Level10 extends GameState{[_0xa4e3('0x0')](){this[_0xa4e3('0x1')]('Level10\x20Map',0x7d0,0x1e0,0x514,_0xa4e3('0x2'),_0xa4e3('0x3'),_0xa4e3('0x4'),'Level10\x20Background',_0xa4e3('0x5'));this[_0xa4e3('0x6')]=new StaticGameObject(this,0x6b4,0x1a4,'Level10\x20Door');this[_0xa4e3('0x6')][_0xa4e3('0x7')]=0x0;this[_0xa4e3('0x8')]=new Player(this,0xe1,0x12c,'Player\x2001',0x12c,-0x258,!![]);let _0x4347a0=new BasicGameObject(this,0x1e5,0x136,_0xa4e3('0x9'),null,0x3);let _0x4ba5f4=new BasicGameObject(this,0x2bc,0x15e,'Level10\x20Speechbubbles',null,0x1);let _0x47df3d=new BasicGameObject(this,0x311,0x154,_0xa4e3('0x9'),null,0x2);let _0x5c1c6b=new BasicGameObject(this,0x398,0x140,_0xa4e3('0x9'),null,0x0);this[_0xa4e3('0xa')]=[_0x4347a0,_0x4ba5f4,_0x47df3d,_0x5c1c6b];this[_0xa4e3('0xa')][_0xa4e3('0xb')](_0x41eba8=>{_0x41eba8[_0xa4e3('0xc')][_0xa4e3('0xd')](0x1,0x1);_0x41eba8[_0xa4e3('0xe')][_0xa4e3('0xd')](0x0,0x0);_0x41eba8[_0xa4e3('0xf')]=!![];});}[_0xa4e3('0x10')](_0x2f12bf){_0x2f12bf['minimized']=![];this['add']['tween'](_0x2f12bf[_0xa4e3('0xe')])['to']({'x':0x1,'y':0x1},0x1f4,Phaser[_0xa4e3('0x11')][_0xa4e3('0x12')][_0xa4e3('0x13')],!![]);}['loop'](){if(this[_0xa4e3('0xa')][0x0][_0xa4e3('0xf')]&&this[_0xa4e3('0x8')][_0xa4e3('0x14')]['x']>0x15e){this[_0xa4e3('0x10')](this[_0xa4e3('0xa')][0x0]);}else if(this[_0xa4e3('0xa')][0x1][_0xa4e3('0xf')]&&this[_0xa4e3('0x8')][_0xa4e3('0x14')]['x']>0x258){this[_0xa4e3('0x10')](this[_0xa4e3('0xa')][0x1]);}else if(this[_0xa4e3('0xa')][0x2]['minimized']&&this['player'][_0xa4e3('0x14')]['x']>0x2bc){this[_0xa4e3('0x10')](this[_0xa4e3('0xa')][0x2]);}else if(this[_0xa4e3('0xa')][0x3][_0xa4e3('0xf')]&&this[_0xa4e3('0x8')][_0xa4e3('0x14')]['x']>0x320){this[_0xa4e3('0x10')](this[_0xa4e3('0xa')][0x3]);}else{this[_0xa4e3('0x15')][_0xa4e3('0x16')][_0xa4e3('0x17')](this[_0xa4e3('0x6')],this[_0xa4e3('0x8')],_0x5e0c12=>{if(_0x5e0c12[_0xa4e3('0x7')]===0x0){this[_0xa4e3('0x18')][_0xa4e3('0x19')](_0x5e0c12)['to']({'alpha':0x1},0x1f4,Phaser[_0xa4e3('0x11')][_0xa4e3('0x12')][_0xa4e3('0x13')],!![]);}else if(_0x5e0c12[_0xa4e3('0x7')]===0x1){this['goToNextLevel']();}});}}}