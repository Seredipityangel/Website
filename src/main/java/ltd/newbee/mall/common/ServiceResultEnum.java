package ltd.newbee.mall.common;


public enum ServiceResultEnum {
    ERROR("error"),

    SUCCESS("success"),

    DATA_NOT_EXIST("No records were queried!"),

    SAME_CATEGORY_EXIST("A classification of the same level and name already exists!"),

    SAME_LOGIN_NAME_EXIST("The username already exists!"),

    LOGIN_NAME_NULL("Please enter your login name!"),

    LOGIN_PASSWORD_NULL("Please enter your password!"),

    LOGIN_VERIFY_CODE_NULL("Please enter the verification code!"),

    LOGIN_VERIFY_CODE_ERROR("Captcha error!"),

    SAME_INDEX_CONFIG_EXIST("The same home page configuration item already exists!"),

    GOODS_CATEGORY_ERROR("Categorical data anomalies!"),

    SAME_GOODS_EXIST("The same product information already exists!"),

    GOODS_NOT_EXIST("Merchandise does not exist!"),

    GOODS_PUT_DOWN("Product has been removed from the shelves！"),

    SHOPPING_CART_ITEM_LIMIT_NUMBER_ERROR("Exceeds the maximum number of individual items that can be purchased!"),

    SHOPPING_CART_ITEM_TOTAL_NUMBER_ERROR("Exceeds the maximum capacity of the shopping cart!"),

    LOGIN_ERROR("Login failed!"),

    LOGIN_USER_LOCKED("User has been banned from logging in！"),

    ORDER_NOT_EXIST_ERROR("The order does not exist!"),

    ORDER_ITEM_NOT_EXIST_ERROR("The order item does not exist!"),

    NULL_ADDRESS_ERROR("The address cannot be empty!"),

    ORDER_PRICE_ERROR("Order price anomalies!"),

    ORDER_GENERATE_ERROR("Generate order exceptions!"),

    SHOPPING_ITEM_ERROR("Shopping cart data anomaly!"),

    SHOPPING_ITEM_COUNT_ERROR("Insufficient inventory!"),

    ORDER_STATUS_ERROR("Order status exception!"),

    CLOSE_ORDER_ERROR("Failed to close the order!"),

    OPERATE_ERROR("The operation failed!"),

    NO_PERMISSION_ERROR("No permissions!"),

    DB_ERROR("database error");

    private String result;

    ServiceResultEnum(String result) {
        this.result = result;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}