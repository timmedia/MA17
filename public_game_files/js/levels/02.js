var _0xfd92=['Lab','key','General\x20Key','collectKey','water','animations','down','go_up','add','go_down','play','direction','damagePlayerList','push','button1','General\x20Button','switchGravity','Player\x2001','switchWater','currentAnim','body','setSize','onComplete','physics','arcade','gravity','player','jumpSpeed','angle','tween','Easing','Cubic','Out','door','destroy','build','setup','Level02\x20Map','Level08','Level02\x20Midground','Level02\x20Background','green','switchMusic'];(function(_0x455971,_0x3c63af){var _0x25f834=function(_0x58c5a0){while(--_0x58c5a0){_0x455971['push'](_0x455971['shift']());}};_0x25f834(++_0x3c63af);}(_0xfd92,0xa4));var _0x534b=function(_0x2a1ce2,_0x2c59fb){_0x2a1ce2=_0x2a1ce2-0x0;var _0x4f3924=_0xfd92[_0x2a1ce2];return _0x4f3924;};class Level02 extends GameState{[_0x534b('0x0')](){this[_0x534b('0x1')](_0x534b('0x2'),0x320,0x1e0,0x514,_0x534b('0x3'),null,_0x534b('0x4'),_0x534b('0x5'),_0x534b('0x6'));game[_0x534b('0x7')](_0x534b('0x8'),0x1);this[_0x534b('0x9')]=new Key(this,0x186,0x190,_0x534b('0xa'),0x0,!![],this[_0x534b('0xb')]);this[_0x534b('0xc')]=new StaticGameObject(this,0x158,0x1cc,'Level02\x20Waterfall');this[_0x534b('0xc')][_0x534b('0xd')]['add'](_0x534b('0xe'),[0x0,0x1,0x2,0x3],0xa,!![]);this[_0x534b('0xc')][_0x534b('0xd')]['add'](_0x534b('0xf'),[0x4,0x5,0x6,0x7],0xa,![]);this['water'][_0x534b('0xd')][_0x534b('0x10')](_0x534b('0x11'),[0xc,0xd,0xe,0xf],0xa,![]);this['water'][_0x534b('0xd')][_0x534b('0x10')]('up',[0x8,0x9,0xa,0xb],0xa,!![]);this[_0x534b('0xc')][_0x534b('0xd')][_0x534b('0x12')](_0x534b('0xe'));this[_0x534b('0xc')][_0x534b('0x13')]=_0x534b('0xe');this[_0x534b('0xc')]['body']['setSize'](0x23,0x96,0x2c,0xad);this[_0x534b('0x14')][_0x534b('0x15')](this[_0x534b('0xc')]);this[_0x534b('0x16')]=new Button(this,0x50,0x190,_0x534b('0x17'),0x5a,this[_0x534b('0x18')]);this['button2']=new Button(this,0x2d0,0x78,'General\x20Button',-0x5a,this['switchGravity']);this['player']=new Player(this,0xc8,0x12c,_0x534b('0x19'),0xfa,-0x258);}[_0x534b('0x1a')](){if(this[_0x534b('0xc')]['direction']===_0x534b('0xe')){this[_0x534b('0xc')][_0x534b('0x13')]='up';this[_0x534b('0xc')][_0x534b('0xd')][_0x534b('0x12')](_0x534b('0xf'));this[_0x534b('0xc')][_0x534b('0xd')][_0x534b('0x1b')]['onComplete'][_0x534b('0x10')](()=>{this['water'][_0x534b('0xd')][_0x534b('0x12')]('up');});this['water'][_0x534b('0x1c')][_0x534b('0x1d')](0x23,0x96,0x2c,0x0);}else{this['water'][_0x534b('0x13')]=_0x534b('0xe');this[_0x534b('0xc')][_0x534b('0xd')][_0x534b('0x12')](_0x534b('0x11'));this['water'][_0x534b('0xd')][_0x534b('0x1b')][_0x534b('0x1e')][_0x534b('0x10')](()=>{this['water'][_0x534b('0xd')]['play'](_0x534b('0xe'));});this[_0x534b('0xc')]['body'][_0x534b('0x1d')](0x23,0x96,0x2c,0xad);}}[_0x534b('0x18')](){this[_0x534b('0x1f')][_0x534b('0x20')][_0x534b('0x21')]['y']*=-0x1;this[_0x534b('0x22')][_0x534b('0x23')]*=-0x1;this[_0x534b('0x1a')]();let _0x39377f=(this[_0x534b('0x22')][_0x534b('0x24')]+0xb4)%0x168;this[_0x534b('0x10')][_0x534b('0x25')](this[_0x534b('0x22')])['to']({'angle':_0x39377f},0x1f4,Phaser[_0x534b('0x26')][_0x534b('0x27')][_0x534b('0x28')],!![]);}['collectKey'](){this[_0x534b('0x29')]['unlock']();this['key'][_0x534b('0x2a')]();}}