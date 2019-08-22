const colors = [
	'blue','green','darkorange','red','deeppink','mediumorchid','blueviolet','indigo'
]
const randomColor = ()=> Math.floor (Math.random() * colors.length);

const resetDom = function () {
	testArea._data.items = [];
}
const pushDom = function (yQty,xQty) {
	ys = Number(yQty) || 1;
	xs = Number(xQty) || 1;
	domQty = xs * ys;
	for(let i=0; i<domQty; i++) {
		testArea.items.push(true);
	}
}

const setDomSize = function (yQty,xQty) {
	ys = Number(yQty) || 1;
	xs = Number(xQty) || 1;
	testArea.flexBasis = `flex-basis:calc((90vw / ${xs}) - 1vw);`;
	testArea.fontSize = ys>=xs? `font-size:calc(85vh / ${ys} /2.5);` : `font-size:calc(100vw / ${xs} /2.5);` ;
} 

const applyDom = function (that,other) {
	if( !that===undefined ) {
		if( that.qty==false || isNaN(that.qty) ) { return; }
	}
	resetDom();
	pushDom(y.qty,x.qty);
	setDomSize(y.qty,x.qty);
}

const qtyPlus = function (that) {
	if(+that.qty<1) {
		that.qty=1;
	} else {
		switch(that.qty){
			case 'NaN': break;
			case '': that.qty=1; break;
			default: that.qty++; break;
		}
	}
}
const qtyMinus = function (that) {
	if(+that.qty<=1) {
		that.qty='';
	} else {
		switch(that.qty){
			case 'NaN': break;
			case '': that.qty=1; break;
			default: that.qty--; break;
		}
	}
}

const toggleTarget = function(id) {
	target=id.replace(/[^0-9]/g, '')-1;//onclickが発動した対象の、idの数字のみ抽出。index用に-1してtargetに代入する。
	testArea.items.splice(target,1,!testArea.items[target]);
	console.log(`${id} is ${testArea.items[target]? 'target': 'notTarget'}.`);

}

const y = new Vue({
	el: '#y',
	data: {
		qty:'',
		inputed:false
	},
	methods: {
		applyDom: function () {
			applyDom(this,x);
		},
		isInput: function() {
			if(this.qty) {
				this.inputed = true;
			}else{
				this.inputed = false;
			}
		},
		plus: function() {
			qtyPlus(this);
		},
		minus: function() {
			qtyMinus(this);
		},
	}
})

const x = new Vue({
	el: '#x',
	data: {
		qty:'',
		inputed:false
	},
	methods: {
		applyDom: function () {
			applyDom(this,y);
		},
		isInput: function() {
			if(this.qty) {
				this.inputed = true;
			}else{
				this.inputed = false;
			}
		},
		plus: function() {
			qtyPlus(this);
		},
		minus: function() {
			qtyMinus(this);
		},
	}
})
const selector = new Vue ({
	el: '#selector',
	data: {
		nthOf: ''
	}
})

const n = new Vue ({
	el: '#n',
	data: {
		selector:'',
		inputed:false
	},
	methods: {
		isInput: function() {
			if(this.selector) {
				this.inputed = true;
			}else{
				this.inputed = false;
			}
		},
	}
})

const testArea = new Vue({
	el: '#testArea',
	data: {
		items: [],
		flexBasis: "",
		fontSize: ""
	},
	computed: {
	 	style: function() {
	 		if(!selector.nthOf) {return;}
	 		if(!n.selector) {return;}
	 		return `
	 			.target::${selector.nthOf}(${n.selector}) {
	 				background-color: ${colors[randomColor()]};

	 			}
	 			`
	 	},
 	 	element: function() {
 	 	html = '';
 	 	for(i=0; i<this.items.length; i++) {
	 	 	html=html+`
	 	 		<${this.items[i]? 'div': 'span'} 
	 	 			id="element${i+1}" 
	 	 			class="element ${this.items[i]? 'target': 'notTarget'}" 
	 	 			style="${this.flexBasis} ${this.fontSize}"
	 	 			onclick="toggleTarget(this.id)" 
 	 			>${i+1}</${this.items[i]? 'div': 'span'}>
 			`
 	 	}
 	 	return html
 	 }
	}
})
