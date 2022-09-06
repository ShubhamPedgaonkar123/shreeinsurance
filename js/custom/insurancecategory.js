$(".item-create").click(function() {
    alert('ss')
    $(".sub-category-add").modal('show');
});

$("#view_sub_category").click(function() {
    $("#mediumModal_view_subcategory").modal('show');
});
$("#add-insurance-category").click(function() {
    $("#mediumModalCreateCategory").modal('show');
});
$("#edit_sub_category").click(function() {
    $("#sub_category_name").hide();
    $("#edit_sub_category").hide();
    $("#delete_sub_category").hide();
    console.log("asssd")
    $("#edited_sub_created_category").show();
    $("#send_sub_create_category").show();
});

$("#subcategorycreate").click(function(e) {
    e.preventDefault()
    var sub_category = $('#sub_category').val();
    var category_name = $('#category_name').val();
    subcategories = [{ 'name': sub_category }]
    var params = JSON.stringify({
        'name': category_name,
        'subcategories': subcategories
    });
    createsubinsurancecategory(params)
});
$("#create-insurance-category").click(function(e) {
    e.preventDefault();
    var name = $('#txt_name').val();
    // name                =   document.getElementById("create_category").value ; 
    // console.log(name)

    status = $("#status").val();
    if (name.length == 0) {
        $.notify("Please Enter Name", "info");
        return false
    } else if (status.length == 0) {
        $.notify("Please Enter Status", "info");
        return false
    } else {
        subcategories = []
        var params = JSON.stringify({
            'name': name,
            'status': status,
            'subcategories': subcategories
        });
        console.log(params);
        var return_value = createinsurance(params)
        console.log(return_value)
    }

});
$(document).ready(function() {
    $("#sub_created_category").hide();
    $("#edited_sub_created_category").hide();
    $("#send_sub_create_category").hide();
    // listinsuarance()
    showTables()
});

async function showTables() {
    itemMasterTable = $('#tableRegionReport').DataTable({
        "bDestroy": true,
        searching: false,
        processing: true,
        serverSide: true,
        pageLength: 22,
        "ordering": false,
        "lengthChange": false,
        ajax: function(data, callback, settings) {
            var pageIndex = data.start / data.length + 1;
            $.ajax({
                url: BASE_URL + 'admin/get_category?&page='+pageIndex,
                method: 'get',
                // data: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAPIToken()
                },
                mode: 'cors',
                credentials: 'same-origin',
                success: function(result) {
                    callback({
                        draw: data.draw,
                        recordsTotal: result.count,
                        recordsFiltered: result.count,
                        data: result.results
                    });
                },
                error: function(data) {
                    // alert(data);
                    console.log(data);
                    return false;
                }
            });

        },
        columns: [

            {
                "title": "Sr No",
                render: function(data, type, row, meta) {
                    console.log(JSON.stringify(row, null, 2))
                    return row.id
                }
            },
            {
                "title": "Name",
                render: function(data, type, row, meta) {
                    console.log(JSON.stringify(row, null, 2))
                    return row.name
                }
            },
            {
                "title": "Status",
                render: function(data, type, row, meta) {
                    console.log(JSON.stringify(row, null, 2))
                    return row.status
                }
            },
            {
                "title": "More",
                render: function(data, type, row) {
                    var appendVariable = ' '
                    appendVariable += '<div class="table-data-feature">'
                    appendVariable += '<button class="item item-create" value=' + name + ' data-toggle="tooltip" id="create_category" data-placement="top" title="Create Sub Category"><i class="zmdi zmdi-mail-send"></i></button>'
                    appendVariable += '<button class="item" data-toggle="tooltip" id="delete" data-placement="top" title="Delete"><i class="zmdi zmdi-delete"></i></button>'
                    appendVariable += '<button class="item" data-toggle="tooltip" data-placement="top" title="View Sub Category" id="view_sub_category"><i class="zmdi zmdi-more"></i></button>'
                    appendVariable += '</div>'
                    return appendVariable
                }
            }
        ]
    });
    $('#tableRegionReport').on('click', '#view_sub_category', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableRegionReport').dataTable().api().row(RowIndex).data();
        listinsuarance(data.id)
        $("#mediumModal_view_subcategory").modal('show');
    });
    $('#tableRegionReport').on('click', '#delete', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableRegionReport').dataTable().api().row(RowIndex).data();
        $('#category_name').val(data.name)
        text = 'Are you sure to delete category'
        if (confirm(text) == true) {
            deletecategory(data.name)
            showTables()
        } else {
            return false
        }
    });
    $('#tableRegionReport').on('click', '#create_category', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableRegionReport').dataTable().api().row(RowIndex).data();
        $('#category_name').val(data.name)
        $("#mediumModal").modal('show');
    });
}
$("#subcategorytable").on('click', '.update_subcategory', async function(e) {
    e.preventDefault();
    id = $(this).val();
    // var comapnyname = $(this).closest(".trclass").find(".companyname").text();
    // var currentRow = $(this).closest("tr");
    // currentRow.find(".pd-price").html();
    name = $('#category_name_' + id).val();

    category_name = $('#sub_category_name_' + id).val();
    updated_name = $('#updated_sub_category_value_' + id).val();
    var params = JSON.stringify({
        'category_name': name,
        'name': category_name,
        'updated_name': updated_name
    });
    console.log(params)

    updatesubcategory(params)
});
$("#subcategorytable").on('click', '.edit_sub_category', async function() {
    id = $(this).val();
    $('#edit_sub_category_' + id).hide()
    $('#sub_categories_list_' + id).html('<button class="item update_subcategory" value="' + id + '"  data-toggle="tooltip" id="send_sub_create_category" data-placement="top" title="Send Updated category Name"><i class="zmdi zmdi-mail-send"></i></button>')
    $('#editfield_' + id).html('<input type="text" class="form-control" placeholder="Enter updated name" id="updated_sub_category_value_' + id + '">')

});

function createinsurancelists(data) {
    var length = data.length;
    var appendVariable = ''
    sr_no = 1
    for (var i = 0; i < length; i++) {
        subcategories = data[i]['subcategories']
        name = capitalizeFirstLetter(data[i]['name'])
        for (var j = 0; j < subcategories.length; j++) {
            appendVariable += '<tr>'
            appendVariable += '<td><span id="sub_category_name">' + sr_no + '</span><input type="hidden" value="" class="form-control" id="edited_sub_created_category"</td>'
            appendVariable += '<td><input type="hidden" id="sub_category_name_' + subcategories[j]['id'] + '" value="' + subcategories[j]['name'] + '"><input type="hidden" id="category_name_' + subcategories[j]['id'] + '" value="' + name + '"><span id="current_value_of_category_' + subcategories[j]['id'] + '">' + name + '</span></td>'
            appendVariable += '<td id= "editfield_' + subcategories[j]['id'] + '"><span id="current_value_of_subcategory' + data[i]['id'] + '">' + subcategories[j]['name'] + '</span></td>'
            appendVariable += '<td>'
            appendVariable += '<div class="table-data-feature" id="sub_categories_list_' + subcategories[j]['id'] + '">'
            appendVariable += '<button class="item edit_sub_category" value="' + subcategories[j]['id'] + '"  id="edit_sub_category_' + subcategories[j]['id'] + '"data-toggle="tooltip" data-placement="top" title="Edit sub Category"><i class="zmdi zmdi-edit"></i></button>'
            appendVariable += '</div>'
            appendVariable += '</td>'
            appendVariable += '</tr>'
        }
        sr_no++;
    }
    $('#view_sub_category_list').html(appendVariable)
}

function listinsuarance(id) {
    $.ajax({
        url: BASE_URL + 'admin/get_category?id=' + id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            createinsurancelists(result.results)
        },
        error: function(data) {}
    });
}