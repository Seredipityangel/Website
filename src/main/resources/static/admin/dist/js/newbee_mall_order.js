$(function () {
    $("#jqGrid").jqGrid({
        url: '/admin/orders/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'orderId', index: 'orderId', width: 50, key: true, hidden: true},
            {label: 'order number', name: 'orderNo', index: 'orderNo', width: 120},
            {label: 'Total order price', name: 'totalPrice', index: 'totalPrice', width: 60},
            {label: 'Order Status', name: 'orderStatus', index: 'orderStatus', width: 80, formatter: orderStatusFormatter},
            {label: 'payment method', name: 'payType', index: 'payType', width: 80,formatter:payTypeFormatter},
            {label: 'recipient address', name: 'userAddress', index: 'userAddress', width: 10, hidden: true},
            {label: 'Creation time', name: 'createTime', index: 'createTime', width: 120},
            {label: 'operate', name: 'createTime', index: 'createTime', width: 120, formatter: operateFormatter}
        ],
        height: 760,
        rowNum: 20,
        rowList: [20, 50, 80],
        styleUI: 'Bootstrap',
        loadtext: 'Information is being read...',
        rownumbers: false,
        rownumWidth: 20,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "data.list",
            page: "data.currPage",
            total: "data.totalPage",
            records: "data.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order",
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $(window).resize(function () {
        $("#jqGrid").setGridWidth($(".card-body").width());
    });

    function operateFormatter(cellvalue, rowObject) {
        return "<a href=\'##\' onclick=openOrderItems(" + rowObject.rowId + ")>View Order Information</a>" +
            "<br>" +
            "<a href=\'##\' onclick=openExpressInfo(" + rowObject.rowId + ")>View Recipient Information</a>";
    }

    function orderStatusFormatter(cellvalue) {
        //订单状态:0.待支付 1.已支付 2.配货完成 3:出库成功 4.交易成功 -1.手动关闭 -2.超时关闭 -3.商家关闭
        if (cellvalue == 0) {
            return "To be paid";
        }
        if (cellvalue == 1) {
            return "paid";
        }
        if (cellvalue == 2) {
            return "Distribution completed";
        }
        if (cellvalue == 3) {
            return "Successful exit";
        }
        if (cellvalue == 4) {
            return "Successful transaction";
        }
        if (cellvalue == -1) {
            return "manual shutdown";
        }
        if (cellvalue == -2) {
            return "timeout";
        }
        if (cellvalue == -3) {
            return "Merchant closure";
        }
    }

    function payTypeFormatter(cellvalue) {
        //支付类型:0.无 1.支付宝支付 2.微信支付
        if (cellvalue == 0) {
            return "null";
        }
        if (cellvalue == 1) {
            return "Alipay payment";
        }
        if (cellvalue == 2) {
            return "WeChat Payment";
        }
    }

    $(window).resize(function () {
        $("#jqGrid").setGridWidth($(".card-body").width());
    });

});

/**
 * jqGrid重新加载
 */
function reload() {
    initFlatPickr();
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: page
    }).trigger("reloadGrid");
}

/**
 * 订单项信息
 * @param orderId
 */
function openOrderItems(orderId) {
    $('.modal-title').html('Order Details');
    $.ajax({
        type: 'GET',//方法类型
        url: '/admin/order-items/' + orderId,
        contentType: 'application/json',
        success: function (result) {
            if (result.resultCode == 200) {
                $('#orderItemModal').modal('show');
                var itemString = '';
                for (i = 0; i < result.data.length; i++) {
                    itemString += result.data[i].goodsName + ' x ' + result.data[i].goodsCount + ' Product Number ' + result.data[i].goodsId + ";<br>";
                }
                $("#orderItemString").html(itemString);
            } else {
                Swal.fire({
                    text: result.message,
                    icon: "error",iconColor:"#f05b72",
                });
            }
            ;
        },
        error: function () {
            Swal.fire({
                text: "failure of an operation",
                icon: "error",iconColor:"#f05b72",
            });
        }
    });
}

/**
 * 查看收件人信息
 * @param orderId
 */
function openExpressInfo(orderId) {
    var rowData = $("#jqGrid").jqGrid("getRowData", orderId);
    $('.modal-title').html('incoming mail');
    $('#expressInfoModal').modal('show');
    $("#userAddressInfo").html(rowData.userAddress);
}

/**
 * 订单编辑
 */
function orderEdit() {
    reset();
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    var rowData = $("#jqGrid").jqGrid("getRowData", id);
    $('.modal-title').html('Order Editing');
    $('#orderInfoModal').modal('show');
    $("#orderId").val(id);
    $("#userAddress").val(rowData.userAddress);
    $("#totalPrice").val(rowData.totalPrice);
}


//绑定modal上的保存按钮
$('#saveButton').click(function () {
    var totalPrice = $("#totalPrice").val();
    var userName = $("#userName").val();
    var userPhone = $("#userPhone").val();
    var userAddress = $("#userAddress").val();
    var id = getSelectedRowWithoutAlert();
    var url = '/admin/orders/update';
    var data = {
        "orderId": id,
        "totalPrice": totalPrice,
        "userName": userName,
        "userPhone": userPhone,
        "userAddress": userAddress
    };
    $.ajax({
        type: 'POST',//方法类型
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode == 200) {
                $('#orderInfoModal').modal('hide');
                Swal.fire({
                    text: "Save Successful",
                    icon: "success",iconColor:"#1d953f",
                });
                reload();
            } else {
                $('#orderInfoModal').modal('hide');
                Swal.fire({
                    text: result.message,
                    icon: "error",iconColor:"#f05b72",
                });
            }
            ;
        },
        error: function () {
            Swal.fire({
                text: "failure of an operation",
                icon: "error",iconColor:"#f05b72",
            });
        }
    });
});

/**
 * 订单拣货完成
 */
function orderCheckDone() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    var orderNos = '';
    for (i = 0; i < ids.length; i++) {
        var rowData = $("#jqGrid").jqGrid("getRowData", ids[i]);
        if (rowData.orderStatus != 'paid') {
            orderNos += rowData.orderNo + " ";
        }
    }
    if (orderNos.length > 0 & orderNos.length < 100) {
        Swal.fire({
            text: orderNos + "The status of the order is not Payment Successful and cannot be fulfilled.",
            icon: "error",iconColor:"#f05b72",
        });
        return;
    }
    if (orderNos.length >= 100) {
        Swal.fire({
            text: "You've selected too many orders with a status other than successful payment.",
            icon: "error",iconColor:"#f05b72",
        });
        return;
    }
    Swal.fire({
        title: "confirmation pop-up",
        text: "Are you sure you want to perform the Dispense Complete operation?",
        icon: "warning",iconColor:"#dea32c",
        showCancelButton: true,
        confirmButtonText: 'yes',
        cancelButtonText: 'no'
    }).then((flag) => {
            if (flag.value) {
                $.ajax({
                    type: "POST",
                    url: "/admin/orders/checkDone",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            Swal.fire({
                                text: "Distribution completed",
                                icon: "success",iconColor:"#1d953f",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            Swal.fire({
                                text: r.message,
                                icon: "error",iconColor:"#f05b72",
                            });
                        }
                    }
                });
            }
        }
    )
    ;
}

/**
 * 订单出库
 */
function orderCheckOut() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    var orderNos = '';
    for (i = 0; i < ids.length; i++) {
        var rowData = $("#jqGrid").jqGrid("getRowData", ids[i]);
        if (rowData.orderStatus != 'paid' && rowData.orderStatus != 'Distribution completed') {
            orderNos += rowData.orderNo + " ";
        }
    }
    if (orderNos.length > 0 & orderNos.length < 100) {
        Swal.fire({
            text: orderNos + "Unable to perform outbound operations",
            icon: "error",iconColor:"#f05b72",
        });
        return;
    }
    if (orderNos.length >= 100) {
        Swal.fire({
            text: "Unable to perform outbound operations",
            icon: "error",iconColor:"#f05b72",
        });
        return;
    }
    Swal.fire({
        title: "confirmation pop-up",
        text: "Are you sure you want to perform an outbound operation?",
        icon: "warning",iconColor:"#dea32c",
        showCancelButton: true,
        confirmButtonText: 'yes',
        cancelButtonText: 'no'
    }).then((flag) => {
            if (flag.value) {
                $.ajax({
                    type: "POST",
                    url: "/admin/orders/checkOut",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            Swal.fire({
                                text: "Successful exit",
                                icon: "success",iconColor:"#1d953f",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            Swal.fire({
                                text: r.message,
                                icon: "error",iconColor:"#f05b72",
                            });
                        }
                    }
                });
            }
        }
    )
    ;
}

function closeOrder() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    Swal.fire({
        title: "confirmation pop-up",
        text: "Are you sure you want to close the order?",
        icon: "warning",iconColor:"#dea32c",
        showCancelButton: true,
        confirmButtonText: 'yes',
        cancelButtonText: 'no'
    }).then((flag) => {
            if (flag.value) {
                $.ajax({
                    type: "POST",
                    url: "/admin/orders/close",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            Swal.fire({
                                text: "Closed successfully",
                                icon: "success",iconColor:"#1d953f",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            Swal.fire({
                                text: r.message,
                                icon: "error",iconColor:"#f05b72",
                            });
                        }
                    }
                });
            }
        }
    )
    ;
}


function reset() {
    $("#totalPrice").val(0);
    $("#userAddress").val('');
    $('#edit-error-msg').css("display", "none");
}