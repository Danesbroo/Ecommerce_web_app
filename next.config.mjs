/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        API_URL: process.env.API_URL,
        FAQ_VIEW_URL: process.env.FAQ_VIEW_URL,
        WHY_CHOOSE_US_URL: process.env.WHY_CHOOSE_US_URL,
        PRODUCTS_VIEW_URL: process.env.PRODUCTS_VIEW_URL,
        PRODUCT_URL: process.env.PRODUCT_URL,
        CATEGORY_VIEW_URL: process.env.CATEGORY_VIEW_URL,
        MATERIAL_VIEW_URL: process.env.MATERIAL_VIEW_URL,
        COLOR_VIEW_URL: process.env.COLOR_VIEW_URL,
        COMPANY_INFO_URL: process.env.COMPANY_INFO_URL,
        CATAGORY_NEATED_VIEW_URL: process.env.CATAGORY_NEATED_VIEW_URL,
        SLIDER_VIEW_URL: process.env.SLIDER_VIEW_URL,
        TESTIMONIAL_VIEW_URL: process.env.TESTIMONIAL_VIEW_URL,
        NEWSLETTER_URL: process.env.NEWSLETTER_URL,
        WEBUSER_REGISTER_URL: process.env.WEBUSER_REGISTER_URL,
        WEBUSER_LOGIN_URL: process.env.WEBUSER_LOGIN_URL,
        WEBUSER_FORGET_PASSWORD_URL: process.env.WEBUSER_FORGET_PASSWORD_URL,
        RESET_PASSWORD_URL: process.env.RESET_PASSWORD_URL,
        WEBUSER_CHANGE_PASSWORD_URL: process.env.WEBUSER_CHANGE_PASSWORD_URL,
        VIEW_PROFILE_URL: process.env.VIEW_PROFILE_URL,
        UPDATE_PROFILE_URL: process.env.UPDATE_PROFILE_URL,
        PRODUCT_DETAILS_URL: process.env.PRODUCT_DETAILS_URL,
    },          
};

export default nextConfig;
