$("#add-schema").click(function() {
    $("#mediumModal").modal('show');
});
var stopOpening = false;
$("#scheme_filters").change(function(e) {
    e.preventDefault()
    scheme_filter = $('#scheme_filters').val()
    showTable(scheme_filter)
});
$("#category_id").change(function(e) {
    e.preventDefault()
    var count = $(this).val();
    type_value = $('#scheme_type_select').val()
    if (type_value.length == 13) {
        alert('Please Selecet Scheme Type Select ')
        return false
    } else if (type_value == 'total') {
        $('#input_field').hide()
        return false
    } else {
        // var sfas =' '
        // $('#input_field').append(' ');  
        $('#input_field').show()
        $("#mytext").remove();
        for (var i = 0; i < count.length; i++) {
            $('#input_field').append('<input type="text" id="mytext" placeholder="Enter Category Value here" class="form-control mytext" name="mytext[]"/>');
        }
    }

});
$("#scheme_type_select").change(function() {
    currentVal = $(this).val();
    if (currentVal == 'particular') {
        $('#total_qty_hidden').hide();
        // listinsuarance()
    } else if (currentVal == 'total') {
        $('#total_qty_hidden').show();
    }
});
$('.btn-number').click(function(e) {
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {
            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }
        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
});

$(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
async function showTable(scheme_filter = null, start = null, end = null) {
    itemMasterTable = $('#views_scheme').DataTable({
        "bDestroy": true,
        searching: false,
        processing: true,
        serverSide: true,
        pageLength: 22,
        "ordering": false,
                "lengthChange": false,
        ajax: function(data, callback, settings) {
            var pageIndex = data.start / data.length + 1;
            if (scheme_filter != null || start != null || end != null) {
                if (scheme_filter != null) {
                    condition_url = 'admin/get_schemes/?page='+pageIndex+'&name=' + scheme_filter
                }
                if (start != null && end != null) {
                    condition_url = 'admin/get_schemes/?page='+pageIndex+'&start_date=' + start + '&end_date='+end
                }
            } else {
                condition_url = 'admin/get_schemes/?page='+pageIndex
            }
            $.ajax({
                url: BASE_URL + condition_url ,
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
                    return row.id
                }
            },
            {
                "title": "Scheme Name",
                render: function(data, type, row, meta) {
                    return row.name
                }
            },
            {

                "title": "Image",
                render: function(data, type, row, meta) {
                    var appendVariable = '<button id="view_image" class="btn btn-danger">Image</button>'
                    return appendVariable
                }
            },
            {
                "title": "View Details",
                render: function(data, type, row, meta) {
                    var appendVariable = '<button id="view_details" class="btn btn-primary">Details</button>'
                    return appendVariable
                }
            },
            {
                "title": "More",
                render: function(data, type, row, meta) {
                    var appendVariable = ' '
                    appendVariable += '<div class="table-data-feature">'
                    appendVariable += '<button id="edit" class="item" data-toggle="tooltip" data-placement="top" title="Edit Category"><i class="zmdi zmdi-edit"></i></button>'
                    appendVariable += '</div>'
                    return appendVariable
                }
            },
        ]
    });
    $('#views_scheme').on('click', '#view_sub_category', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#tableRegionReport').dataTable().api().row(RowIndex).data();
        listinsuarance(data.id)
        $("#mediumModal_view_subcategory").modal('show');
    });
    $('#views_scheme').on('click', '#view_image', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#views_scheme').dataTable().api().row(RowIndex).data();
        image = data.image
        var appendVariable = '<image src="' + BASE_URL_FOR_IMAGE + image + '">'
        $('#image_view').html(appendVariable)
        $('#scheme_image').modal('show')
    });
    $('#views_scheme').on('click', '#edit', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#views_scheme').dataTable().api().row(RowIndex).data();
        name = data.name
        details = data.details
        start_date = data.start_date
        end_date = data.end_date
        type = data.type
        reward_value_1 = data.reward_value_1
        reward_value_2 = data.reward_value_2
        qty = data.qty
        $('#edit_scheme_name').val(name)
        $('#edit_scheme_details').val(details)
        $('#edit_start_date').val(start_date)
        $('#edit_end_date').val(end_date)
        $('#edit_reward_value_1').val(reward_value_1)
        $('#edit_reward_value_2').val(reward_value_2)
        $('#edit_qty').val(qty)
        var appendVariable = ' '
        if (type === 'percentage') {
            appendVariable += '<option value="percentage">Percentage</option>'
            appendVariable += '<option value="fixed">Fixed</option>'
        } else {
            appendVariable += '<option value="fixed">Fixed</option>'
            appendVariable += '<option value="percentage">Percentage</option>'
        }
        $('#edit_type').html(appendVariable)
        // $('#edit_category_id').val(edit_category_id)
        var appendVariable1 = ''
        $.ajax({
            url: BASE_URL + 'admin/get_category',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAPIToken()
            },
            mode: 'cors',
            credentials: 'same-origin',
            success: function(result) {
                data = result.results
                for (var i = 0; i < data.length; i++) {
                    if (data[i]['name'] === name) {
                        appendVariable1 += '<option selected value="' + data[i]['id'] + '">' + data[i]['name'] + '</option>'
                    }
                    appendVariable1 += '<option  value="' + data[i]['id'] + '">' + data[i]['name'] + '</option>'

                }
                console.log(appendVariable1)
                $("#edit_category_id").html(appendVariable1)
            },
            error: function(data) {}
        });
        $('#edit_scheme_modal').modal('show')
    });
    $('#views_scheme').on('click', '#view_details', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#views_scheme').dataTable().api().row(RowIndex).data();
        var appendVariable = ''
        appendVariable += '<tr>'
        // appendVariable += '<td>' + data['options'][0]['category_name'] + '</td>'
        appendVariable += '<td>' + data.details + '</td>'
        appendVariable += '<td>' + data.start_date + '</td>'
        appendVariable += '<td>' + data.end_date + '</td>'
        appendVariable += '<td>' + data.type + '</td>'
        appendVariable += '<td>' + data.qty + '</td>'
        appendVariable += '<td>' + data.reward_value_1 + '</td>'
        appendVariable += '<td>' + data.reward_value_2 + '</td>'
        appendVariable += '</tr>'
        $("#scheme_details_variable").html(appendVariable)
        $("#view_scheme_details").modal('show');
    });

}
$(document).ready(function() {
    listinsuarance(main_insurance_id = null, sub_insurance_id = null, data_type = 'category_append')
    showTable()
    getscheme()
});
$("#update_scheme").click(function(e) {
    scheme_name = $('#edit_scheme_name').val()
    scheme_details = $('#edit_scheme_details').val()
    start_date = $('#edit_start_date').val()
    end_date = $('#edit_end_date').val()
    reward_value_1 = $('#edit_reward_value_1').val()
    reward_value_2 = $('#edit_reward_value_2').val()
    qty = $('#edit_qty').val()
    type = $('#edit_type').val()
    category_id = $('#edit_category_id').val()
    // image      = $('#edit_image').val()
    if (document.getElementById("edit_image").files.length == 0) {

    } else {

    }
});
$("#sumbit-button").click(function(e) {
    e.preventDefault();
    var scheme_name = $('#scheme_name').val()
    var scheme_details = $('#scheme_details').val()
    var reward_value_1 = $('#reward_value_1').val()
    var reward_value_2 = $('#reward_value_2').val()
    var qty = $('#qty').val()
    var type = $('#type').val()
    var start_date = $('#start_date').val()
    var end_date = $('#end_date').val()
    // var image = proccessData()
    var scheme_type_select = $('#scheme_type_select').val()
    var category_id = $('#category_id').val()

    var image = $('#image').val()
    if (category_id.length == 0) {
        $.notify("Please Fill category", "warn");
        return false
    } else if (scheme_name.length == 0) {
        $.notify("Please Fill Scheme Name", "warn");
        return false
    } else if (reward_value_1.length == 0) {
        $.notify("Please Fill Reward Value", "warn");
        return false
    } else if (reward_value_2.length == 0) {
        $.notify("Please Fill Reward Value 2", "warn");
        return false
    } else if (qty.length == 0) {
        $.notify("Please Fill Qty", "warn");
        return false
    } else if (start_date.length == 0) {
        $.notify("Please Fill Start Date", "warn");
        return false
    } else if (end_date.length == 0) {
        $.notify("Please Fill End Date", "warn");
        return false
    }
    if (image.length == 0) {
        $.notify("Please Fill Image", "warn");
        return false
        if (scheme_type_select == 'total') {
            options = []
            for (var i = 0; i < category_id.length; i++) {
                options[i] = {
                    'category_id': category_id[i],
                    'qty': 0,
                }
            }
            var params = JSON.stringify({
                'name': scheme_name,
                'details': scheme_details,
                'reward_value_1': reward_value_1,
                'reward_value_2': reward_value_2,
                'options': options,
                'type': type,
                'start_date': start_date,
                'end_date': end_date,
                // 'image': ' ',
            });
            console.log(params)
            createscheme(params);

        } else if (scheme_type_select == 'particular') {
            var mytext = $('.mytext').val()
            var quantityArr = $('.mytext').map(function() {
                return +this.value;
            }).get();
            var quantityCommaSeperatedString = quantityArr.join(',');
            options = []
            var x = new Array();
            x = quantityCommaSeperatedString.split(",");
            for (var i = 0; i < category_id.length; i++) {
                options[i] = {
                    'category_id': category_id[i],
                    'qty': x[i],
                }
            }
            var params = JSON.stringify({
                'name': scheme_name,
                'details': scheme_details,
                'reward_value_1': reward_value_1,
                'reward_value_2': reward_value_2,
                'options': options,
                'type': type,
                'start_date': start_date,
                'end_date': end_date,
                // 'image': ' ',
            });
            console.log(params)
            createscheme(params);

        } else {
            alert('please select scheme type')
            return false
        }
    } else {

        image = proccessData('image')

        if (scheme_type_select == 'total') {
            options = []
            for (var i = 0; i < category_id.length; i++) {
                options[i] = {
                    'category_id': category_id[i],
                    'qty': 0,
                }
            }
            image.then(value => {
                console.log(value); // 👉️ 13
                var params = JSON.stringify({
                    'name': scheme_name,
                    'details': scheme_details,
                    'reward_value_1': reward_value_1,
                    'reward_value_2': reward_value_2,
                    'options': options,
                    'type': type,
                    'start_date': start_date,
                    'end_date': end_date,
                    'image': value,
                });
                console.log(params)
                createscheme(params);
            });
        } else if (scheme_type_select == 'particular') {
            var mytext = $('.mytext').val()
            var quantityArr = $('.mytext').map(function() {
                return +this.value;
            }).get();
            var quantityCommaSeperatedString = quantityArr.join(',');
            options = []
            var x = new Array();
            x = quantityCommaSeperatedString.split(",");
            for (var i = 0; i < category_id.length; i++) {
                options[i] = {
                    'category_id': category_id[i],
                    'qty': x[i],
                }
            }
            image = proccessData('image')
            image.then(value => {
                console.log(value); // 👉️ 13
                var params = JSON.stringify({
                    'name': scheme_name,
                    'details': scheme_details,
                    'reward_value_1': reward_value_1,
                    'reward_value_2': reward_value_2,
                    'options': options,
                    'type': type,
                    'start_date': start_date,
                    'end_date': end_date,
                    'image': value,
                });
                console.log(params)
                createscheme(params);
            });
        } else {
            alert('please select scheme type')
            return false
        }
    }
});