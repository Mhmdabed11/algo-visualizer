(this["webpackJsonpalgo-visualizer"]=this["webpackJsonpalgo-visualizer"]||[]).push([[0],[,,,,,,function(t,e,n){t.exports=n(16)},,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},,,function(t,e,n){"use strict";n.r(e);for(var o=n(0),r=n.n(o),a=n(4),c=n.n(a),i=(n(11),n(1)),l=n(5),s=(n(12),n(13),r.a.forwardRef((function(t,e){var n=t.type,o=t.children,a=t.obstacle,c="",i="";return"start"!==n&&"finish"!==n||(c="is-".concat(n)),a&&(i="is-obstacle"),r.a.createElement("div",{ref:e,className:"grid-item ".concat(c," ").concat(i," ")},o)}))),u=n(3),f=function(t,e,n){var o=u(t),r=[],a=[];o[e.row][e.col].visited=!0,r.push(o[e.row][e.col]);for(var c=function(){var t=r.shift();return t.obstacle?"continue":(a.push(t),t.row===n.row&&t.col===n.col?{v:{animatedNodes:a,newGraph:o}}:void h(t,o).forEach((function(e){e.visited||(e.visited=!0,e.parent=t,r.push(e))})))};0!==r.length;){var i=c();switch(i){case"continue":continue;default:if("object"===typeof i)return i.v}}return{animatedNodes:a,newGraph:o}},h=function(t,e){var n=[],o=t.row,r=t.col;return o<e.length-1&&n.push(e[o+1][r]),o>0&&n.push(e[o-1][r]),r<e[0].length-1&&n.push(e[o][r+1]),r>0&&n.push(e[o][r-1]),n=n.filter((function(t){return!t.visited}))},w=function(t){for(var e=t,n=[];e;)n.push(e),e=e.parent;return n},m=n(3),v=function t(e,n){Object(l.a)(this,t),this.row=e,this.col=n,this.visited=!1,this.distance=1/0,this.obstacle=!1},d=100,p=35,b=[],g=0;g<p;g++){for(var E=[],k=0;k<d;k++)E.push(new v(g,k));b.push(E)}function y(){var t=r.a.useState(b),e=Object(i.a)(t,2),n=e[0],o=e[1],a=r.a.useState({row:0,col:0}),c=Object(i.a)(a,2),l=c[0],u=c[1],h=r.a.useState({row:34,col:99}),v=Object(i.a)(h,2),g=v[0],E=v[1],k=r.a.useState(!1),y=Object(i.a)(k,2),j=y[0],L=y[1],N=r.a.useRef(b.map((function(t){return t.map((function(t){return r.a.createRef()}))})));return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){j||function(){L(!0);var t=n[0][0],e=n[34][99];u(t),E(e),console.log(f(n,t,e));var r=f(n,t,e),a=r.animatedNodes,c=r.newGraph,i=w(c[34][99]).reverse();o(c);for(var l=function(n){a[n].row===t.row&&a[n].col===t.col||a[n].row===e.row&&a[n].col===e.col||setTimeout((function(){return N.current[a[n].row][a[n].col].classList.add("animate-node")}),15*n)},s=0;s<a.length;s++)l(s);for(var h=function(n){i[n].row===t.row&&i[n].col===t.col||i[n].row===e.row&&i[n].col===e.col||setTimeout((function(){return N.current[i[n].row][i[n].col].classList.add("animate-path")}),15*(a.length-1)+20*n)},m=0;m<i.length;m++)h(m);L(!1)}()}},"Find Shortest Path"),r.a.createElement("button",{onClick:function(){if(!j){o(b);for(var t=0;t<b.length;t++)for(var e=0;e<b[0].length;e++)N.current[t][e].classList.contains("animate-node")&&N.current[t][e].classList.remove("animate-node"),N.current[t][e].classList.contains("animate-path")&&N.current[t][e].classList.remove("animate-path")}}},"Reset"),r.a.createElement("button",{onClick:function(){for(var t=[],e=m(n),r=0;r<300;r++){var a=Math.floor(Math.random()*p)+0,c=Math.floor(Math.random()*d)+0;e[a][c].obstacle=!0,t.push({row:a,col:c})}return t=t.filter((function(t){return!(t.row===l.row&&t.col===l.col||t.row===g.row&&t.col===g.col)})),o(e),t}},"Generate Walls"),r.a.createElement("div",{className:"grid"},n.map((function(t){return t.map((function(t){return t.row===l.row&&t.col===l.col?r.a.createElement(s,{ref:function(e){return N.current[t.row][t.col]=e},key:"".concat(t.row,"-").concat(t.col),type:"start"}):t.row===g.row&&t.col===g.col?r.a.createElement(s,{ref:function(e){return N.current[t.row][t.col]=e},key:"".concat(t.row,"-").concat(t.col),type:"finish"}):r.a.createElement(s,{ref:function(e){return N.current[t.row][t.col]=e},key:"".concat(t.row,"-").concat(t.col),visited:t.visited,path:t.path,obstacle:t.obstacle})}))}))))}var j=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(y,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[6,1,2]]]);
//# sourceMappingURL=main.47b7cb99.chunk.js.map