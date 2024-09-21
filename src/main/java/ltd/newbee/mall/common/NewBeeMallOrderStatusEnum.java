package ltd.newbee.mall.common;

public enum NewBeeMallOrderStatusEnum {

    DEFAULT(-9, "ERROR"),
    ORDER_PRE_PAY(0, "To be paid"),
    ORDER_PAID(1, "paid"),
    ORDER_PACKAGED(2, "Distribution completed"),
    ORDER_EXPRESS(3, "Successful exit"),
    ORDER_SUCCESS(4, "Successful transaction"),
    ORDER_CLOSED_BY_MALLUSER(-1, "manual shutdown"),
    ORDER_CLOSED_BY_EXPIRED(-2, "timeout"),
    ORDER_CLOSED_BY_JUDGE(-3, "Merchant closure");

    private int orderStatus;

    private String name;

    NewBeeMallOrderStatusEnum(int orderStatus, String name) {
        this.orderStatus = orderStatus;
        this.name = name;
    }

    public static NewBeeMallOrderStatusEnum getNewBeeMallOrderStatusEnumByStatus(int orderStatus) {
        for (NewBeeMallOrderStatusEnum newBeeMallOrderStatusEnum : NewBeeMallOrderStatusEnum.values()) {
            if (newBeeMallOrderStatusEnum.getOrderStatus() == orderStatus) {
                return newBeeMallOrderStatusEnum;
            }
        }
        return DEFAULT;
    }

    public int getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(int orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
