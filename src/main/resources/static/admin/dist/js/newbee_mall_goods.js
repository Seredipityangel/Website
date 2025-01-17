$(function () {
    $("#jqGrid").jqGrid({
        url: '/admin/goods/list',
        datatype: "json",
        colModel: [
            {label: 'Product Number', name: 'goodsId', index: 'goodsId', width: 60, key: true},
            {label: 'trade name', name: 'goodsName', index: 'goodsName', width: 120},
            {label: 'Product Profile', name: 'goodsIntro', index: 'goodsIntro', width: 120},
            {label: 'Product Images', name: 'goodsCoverImg', index: 'goodsCoverImg', width: 120, formatter: coverImageFormatter},
            {label: 'Merchandise inventory', name: 'stockNum', index: 'stockNum', width: 60},
            {label: 'Selling Price', name: 'sellingPrice', index: 'sellingPrice', width: 60},
            {
                label: 'Shelf Status',
                name: 'goodsSellStatus',
                index: 'goodsSellStatus',
                width: 80,
                formatter: goodsSellStatusFormatter
            },
            {label: 'Creation time', name: 'createTime', index: 'createTime', width: 60}
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

    function goodsSellStatusFormatter(cellvalue) {
        //商品上架状态 0-上架 1-下架
        if (cellvalue == 0) {
            return "<button type=\"button\" class=\"btn btn-block btn-success btn-sm\" style=\"width: 80%;\">Selling</button>";
        }
        if (cellvalue == 1) {
            return "<button type=\"button\" class=\"btn btn-block btn-secondary btn-sm\" style=\"width: 80%;\">off the shelves</button>";
        }
    }

    function coverImageFormatter(cellvalue) {
        return "<img src='" + cellvalue + "' height=\"80\" width=\"80\" alt='picture'/>";
    }

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
 * 添加商品
 */
function addGoods() {
    window.location.href = "/admin/goods/edit";
}

/**
 * 修改商品
 */
function editGoods() {
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    window.location.href = "/admin/goods/edit/" + id;
}

/**
 * 上架
 */
function putUpGoods() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    Swal.fire({
        title: "confirmation pop-up",
        text: "Are you sure you want to perform the shelving operation?",
        icon: "warning",iconColor:"#dea32c",
        showCancelButton: true,
        confirmButtonText: 'yes',
        cancelButtonText: 'no'
    }).then((flag) => {
            if (flag.value) {
                $.ajax({
                    type: "PUT",
                    url: "/admin/goods/status/0",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            Swal.fire({
                                text: "Uploaded successfully",
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
 * 下架
 */
function putDownGoods() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    Swal.fire({
        title: "confirmation pop-up",
        text: "Are you sure you want to perform a take-down?",
        icon: "warning",iconColor:"#dea32c",
        showCancelButton: true,
        confirmButtonText: 'yes',
        cancelButtonText: 'no'
    }).then((flag) => {
            if (flag.value) {
                $.ajax({
                    type: "PUT",
                    url: "/admin/goods/status/1",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            Swal.fire({
                                text: "Downgrade Successful",
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