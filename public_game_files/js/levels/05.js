var _0x4bf7=['blue_white','Level05\x20Water','setTo','alpha','characters','add','group','Level05\x20Char1','animations','idle','setSize','Level05\x20Char2','body','Level05\x20Char3','anchor','Level05\x20Char4','addMultiple','forEach','play','started','openBubble','getChildIndex','sprite','position','Level05\x20Speechbubbles','frame','tween','scale','Cubic','Out','player','bringToTop','events','startWind','Player\x2001','camera','follow','FOLLOW_LOCKON','checkWorldBounds','goToNextLevel','killPlayer','loop','arcade','overlap','randomWind','random','time','build','setup','Level05\x20Map','Level04','Debug\x20empty10x10','Level05\x20Midground','Level05\x20Background'];(function(_0x224440,_0xba6cea){var _0x1cb6a4=function(_0x4b6eae){while(--_0x4b6eae){_0x224440['push'](_0x224440['shift']());}};_0x1cb6a4(++_0xba6cea);}(_0x4bf7,0x65));var _0x9422=function(_0x5a1e9c,_0xb43860){_0x5a1e9c=_0x5a1e9c-0x0;var _0x2e0499=_0x4bf7[_0x5a1e9c];return _0x2e0499;};class Level05 extends GameState{[_0x9422('0x0')](){this[_0x9422('0x1')](_0x9422('0x2'),0x12c0,0x1e0,0x514,_0x9422('0x3'),_0x9422('0x4'),_0x9422('0x5'),_0x9422('0x6'),_0x9422('0x7'));let _0x49565c=this['add']['sprite'](0x0,0x1e0,_0x9422('0x8'));_0x49565c['anchor'][_0x9422('0x9')](0x0,0x1);_0x49565c[_0x9422('0xa')]=0.7;this[_0x9422('0xb')]=this[_0x9422('0xc')][_0x9422('0xd')]();let _0x43e8c8=new StaticGameObject(this,0x780,0x1c1,_0x9422('0xe'));_0x43e8c8[_0x9422('0xf')][_0x9422('0xc')](_0x9422('0x10'),[0x0,0x1],0x5,!![]);_0x43e8c8['body'][_0x9422('0x11')](0x32,0x1e0,-0x10e,-0x17c);let _0x21ee09=new StaticGameObject(this,0xb68,0x12c,_0x9422('0x12'));_0x21ee09[_0x9422('0xf')]['add'](_0x9422('0x10'),[0x0,0x1,0x2,0x3],0x5,!![]);_0x21ee09[_0x9422('0x13')]['setSize'](0x32,0x1e0,-0x10e,-0xe7);let _0x52bd0c=new StaticGameObject(this,0xdd4,0x18b,_0x9422('0x14'));_0x52bd0c[_0x9422('0xf')][_0x9422('0xc')](_0x9422('0x10'),[0x0,0x1,0x2],0x5,!![]);_0x52bd0c['body'][_0x9422('0x11')](0x32,0x1e0,-0x10e,-0x136);_0x52bd0c[_0x9422('0x15')][_0x9422('0x9')](3.5,0.75);let _0x1d47b9=new StaticGameObject(this,0x1124,0x1b8,_0x9422('0x16'));_0x1d47b9[_0x9422('0xf')][_0x9422('0xc')](_0x9422('0x10'),[0x0,0x1,0x2],0x5,!![]);_0x1d47b9[_0x9422('0x13')][_0x9422('0x11')](0x32,0x1e0,-0x10e,-0x177);this[_0x9422('0xb')][_0x9422('0x17')]([_0x43e8c8,_0x21ee09,_0x52bd0c,_0x1d47b9]);this['characters'][_0x9422('0x18')](_0x312091=>{_0x312091[_0x9422('0xf')][_0x9422('0x19')]('idle');_0x312091[_0x9422('0x1a')]=![];});this[_0x9422('0xb')][_0x9422('0x1b')]=(_0x1b1abf,_0x5ecc3b)=>{let _0x4f0d23=this['characters'][_0x9422('0x1c')](_0x5ecc3b);let _0x112675=this['add'][_0x9422('0x1d')](_0x5ecc3b[_0x9422('0x1e')]['x']+0x5,_0x5ecc3b[_0x9422('0x1e')]['y']-0x3c,_0x9422('0x1f'));_0x112675[_0x9422('0x20')]=_0x4f0d23;_0x112675[_0x9422('0x15')][_0x9422('0x9')](0x1,0x1);_0x112675['scale'][_0x9422('0x9')](0x0,0x0);_0x5ecc3b[_0x9422('0x1a')]=!![];this[_0x9422('0xc')][_0x9422('0x21')](_0x112675[_0x9422('0x22')])['to']({'x':0x1,'y':0x1},0x1f4,Phaser['Easing'][_0x9422('0x23')][_0x9422('0x24')],!![]);this[_0x9422('0x25')][_0x9422('0x26')]();};this['time'][_0x9422('0x27')][_0x9422('0xc')](0xfa,this[_0x9422('0x28')],this);this[_0x9422('0x25')]=new Player(this,0xc8,0xff,_0x9422('0x29'),0x118,-0x258);this[_0x9422('0x2a')][_0x9422('0x2b')](this[_0x9422('0x25')],Phaser['Camera'][_0x9422('0x2c')],0.05,0.05);this[_0x9422('0x25')][_0x9422('0x2d')]=!![];this[_0x9422('0x25')][_0x9422('0x27')]['onOutOfBounds'][_0x9422('0xc')](()=>{if(this[_0x9422('0x25')][_0x9422('0x1e')]['y']<0x1e0||this[_0x9422('0x25')][_0x9422('0x1e')]['x']>0x12c0){this[_0x9422('0x2e')]();}else if(this[_0x9422('0x25')]['position']['y']>0x0){this[_0x9422('0x2f')]();}});}[_0x9422('0x30')](){this['physics'][_0x9422('0x31')][_0x9422('0x32')](this['player'],this[_0x9422('0xb')],this['characters'][_0x9422('0x1b')],(_0x3213ce,_0x334b74)=>{return!_0x334b74[_0x9422('0x1a')];},this);}['startWind'](){this[_0x9422('0x25')]['wind']=-0x64;this[_0x9422('0x33')]();}['randomWind'](){let _0x4b72ad=Math[_0x9422('0x34')]();let _0x1b95d6=Math[_0x9422('0x34')]();this[_0x9422('0x25')][_0x9422('0x13')]['velocity']['x']-=0x64*_0x4b72ad;this[_0x9422('0x35')][_0x9422('0x27')][_0x9422('0xc')](0x4b0*_0x1b95d6,()=>{this[_0x9422('0x33')]();});}}