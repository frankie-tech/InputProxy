let e,t="value",r=JSON.parse,l=JSON.stringify,o=o=>(o[t]="{}",new Proxy(o,{set:(p,s,y)=>((e=r(o[t]))[s]=y,o[t]=l(e),!0),get:(e,l)=>l==="__"+t?o[t]:r(o[t])[l],deleteProperty:(p,s)=>(delete(e=r(o[t]))[s],o[t]=l(e),!0)}));export{o as IP};
//# sourceMappingURL=input-proxy.js.map
