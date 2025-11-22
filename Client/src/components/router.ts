/*
    HOME / 主頁
    LOGIN / 登入
    REGISTER / 註冊
    PROFILE / 個人資料
    ORDERS / 訂單紀錄
    COUPONS / 優惠券
    ADDRESSES / 地址管理
    PRODUCT / 商品詳情
    CART / 購物車
    CHECKOUT / 結帳
    PAYMENT / 付款
    PAYMENTRESULT / 付款結果
    CATEGORY / 商品分類
    SEARCH / 搜尋結果
    ABOUT / 關於我們
    CONTACT / 聯絡我們
    FAQ / 常見問題
    PRIVACY / 隱私政策
    TERMS / 服務條款
    NOTFOUND / 404頁面
*/
const ROUTER = {
    HOME: "/",
    LOGIN: "/Login",
    REGISTER: "/Register",
    PROFILE: "/user/profile",
    ORDERS: "/orders",
    COUPONS: "/coupons",
    ADDRESSES: "/addresses",
    PRODUCT: "/Product/:id",
    CART: "/Cart",
    CHECKOUT: "/Checkout",
    PAYMENT: "/Payment",
    PAYMENTRESULT: "/PaymentResult",
    CATEGORY: "/Category/:categoryName",
    SEARCH: "/Search",
    ABOUT: "/About",
    CONTACT: "/Contact",
    FAQ: "/FAQ",
    PRIVACY: "/Privacy",
    TERMS: "/Terms",
    SHOP: "/Shop",
    NOTFOUND: "*",
}

export default ROUTER;