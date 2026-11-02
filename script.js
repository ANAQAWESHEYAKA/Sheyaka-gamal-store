const products=[
{id:1,name:"خمار وجوانتي",price:280,old:350,category:"ملكات الاحتشام"},
{id:2,name:"إسدال محتشم",price:420,old:500,category:"ملكات الاحتشام"},
{id:3,name:"نقاب",price:150,old:180,category:"ملكات الاحتشام"},
{id:4,name:"بدلة رجالي",price:1450,old:1700,category:"الرجال"},
{id:5,name:"قميص رجالي",price:390,old:450,category:"الرجال"},
{id:6,name:"طقم أطفال",price:320,old:380,category:"الأطفال"}
];
let cart=JSON.parse(localStorage.getItem("shyakaCart")||"[]");
const $=id=>document.getElementById(id);
function money(n){return n.toLocaleString("ar-EG")}
function save(){localStorage.setItem("shyakaCart",JSON.stringify(cart));renderCart()}
function renderProducts(){$("productGrid").innerHTML=products.map(p=>`<article class="product"><span class="discount">خصم ${Math.round((1-p.price/p.old)*100)}%</span><h3>${p.name}</h3><p>${p.category}</p><p><span class="old">${money(p.old)} ج</span> <span class="price">${money(p.price)} ج</span></p><button onclick="addToCart(${p.id})">أضف للسلة</button></article>`).join("")}
function addToCart(id){const p=products.find(x=>x.id===id);const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});save()}
function renderCart(){$("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);$("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><span>${x.name} × ${x.qty}</span><b>${money(x.price*x.qty)} ج</b></div>`).join(""):"السلة فارغة";$("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0))}
$("cartToggle").onclick=()=>$("cartPanel").classList.add("open");$("closeCart").onclick=()=>$("cartPanel").classList.remove("open");$("goCheckout").onclick=()=>$("cartPanel").classList.remove("open");
$("orderForm").onsubmit=e=>{e.preventDefault();if(!cart.length){$("orderResult").textContent="أضف منتجًا للسلة أولًا.";return}const data=Object.fromEntries(new FormData(e.target));const total=cart.reduce((s,x)=>s+x.price*x.qty,0);const order={number:"SH-"+Date.now(),date:new Date().toISOString(),customer:data.customer,phone:data.phone,address:data.address,items:cart,total,coupon:data.coupon||"",status:"جديد"};const orders=JSON.parse(localStorage.getItem("shyakaOrders")||"[]");orders.push(order);localStorage.setItem("shyakaOrders",JSON.stringify(orders));$("orderResult").textContent=`تم تسجيل طلبك تجريبيًا برقم ${order.number} بإجمالي ${money(total)} جنيه.`;cart=[];save();e.target.reset()};
$("year").textContent=new Date().getFullYear();renderProducts();renderCart();