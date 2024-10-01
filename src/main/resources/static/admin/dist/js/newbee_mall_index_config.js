$(function () {
    var configType = $("#configType").val();

    $("#jqGrid").jqGrid({
        url: '/admin/indexConfigs/list?configType=' + configType,
        datatype: "json",
        colModel: [
            {label: 'id', name: 'configId', index: 'configId', width: 50, key: true, hidden: true},
            {label: 'Configuration Item Name', name: 'configName', index: 'configName', width: 180},
            {label: 'jump link', name: 'redirectUrl', index: 'redirectUrl', width: 120},
            {label: 'sorted value', name: 'configRank', index: 'configRank', width: 120},
            {label: 'Product Number', name: 'goodsId', index: 'goodsId', width: 120},
            {label: 'Add Time', name: 'createTime', index: 'createTime', width: 120}
        ],
        height: 560,
        rowNum: 10,
        rowList: [10, 20, 50],
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
});

/**
 * jqGrid重新加载
 */
function reload() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: page
    }).trigger("reloadGrid");
}

function configAdd() {
    reset();
    $('.modal-title').html('Home Page Configuration Item Addition');
    $('#indexConfigModal').modal('show');
}

//绑定modal上的保存按钮
$('#saveButton').click(function () {
    var configName = $("#configName").val();
    var configType = $("#configType").val();
    var redirectUrl = $("#redirectUrl").val();
    var goodsId = $("#goodsId").val();
    var configRank = $("#configRank").val();
    if (!validCN_ENString2_18(configName)) {
        $('#edit-error-msg').css("display", "block");
        $('#edit-error-msg').html("Please enter a configuration item name that conforms to the specification!");
    } else {
        var data = {
            "configName": configName,
            "configType": configType,
            "redirectUrl": redirectUrl,
            "goodsId": goodsId,
            "configRank": configRank
        };
        var url = '/admin/indexConfigs/save';
        var id = getSelectedRowWithoutAlert();
        if (id != null) {
            url = '/admin/indexConfigs/update';
            data = {
                "configId": id,
                "configName": configName,
                "configType": configType,
                "redirectUrl": redirectUrl,
                "goodsId": goodsId,
                "configRank": configRank
            };
        }
        $.ajax({
            type: 'POST',//方法类型
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.resultCode == 200) {
                    $('#indexConfigModal').modal('hide');
                    Swal.fire({
                        text: "Save Successful",
                        icon: "success",iconColor:"#1d953f",
                    });
                    reload();
                } else {
                    $('#indexConfigModal').modal('hide');
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
});

function configEdit() {
    reset();
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    var rowData = $("#jqGrid").jqGrid("getRowData", id);
    $('.modal-title').html('Home Configurator Edit');
    $('#indexConfigModal').modal('show');
    $("#configId").val(id);
    $("#configName").val(rowData.configName);
    $("#redirectUrl").val(rowData.redirectUrl);
    $("#goodsId").val(rowData.goodsId);
    $("#configRank").val(rowData.configRank);
}

function deleteConfig () {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    Swal.fire({
        title: "confirmation pop-up",
        text: "Are you sure you want to delete the data?",
        icon: "warning",iconColor:"#dea32c",
        showCancelButton: true,
        confirmButtonText: 'yes',
        cancelButtonText: 'no'
    }).then((flag) => {
            if (flag.value) {
                $.ajax({
                    type: "POST",
                    url: "/admin/indexConfigs/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            Swal.fire({
                                text: "Deleted successfully",
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
    $("#configName").val('');
    $("#redirectUrl").val('##');
    $("#configRank").val(0);
    $("#goodsId").val(0);
    $('#edit-error-msg').css("display", "none");
}