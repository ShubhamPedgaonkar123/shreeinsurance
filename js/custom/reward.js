$(document).ready(function() {
    showTable()
});
async function showTable() {
    itemMasterTable = $('#reward').DataTable({
        "bDestroy": true,
        searching: false,
        processing: true,
        serverSide: false,
        pageLength: 10,
        ajax: function(data, callback, settings) {
            $.ajax({
                url: BASE_URL + 'admin/get_rewards/',
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
                        recordsTotal: result.length,
                        recordsFiltered: result.data.length,
                        data: result.data
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
                "title": "User Name",
                render: function(data, type, row, meta) {
                    return row.user_detail.firstname + " " +row.user_detail.lastname
                }
            },
            {
                "title": "Mobile Number",
                render: function(data, type, row, meta) {
                    return row.user_mobile
                }
            },
            {
                "title": "Amount",
                render: function(data, type, row, meta) {
                    return row.amount
                }
            },
            {
                "title": "reference",
                render: function(data, type, row, meta) {
                    return row.reference
                }
            },
            {
                "title": "Payment Option",
                render: function(data, type, row, meta) {
                    return row.payment_option
                }
            },
            {
                "title": "Reward Level",
                render: function(data, type, row, meta) {
                    
                    return  "Reward Level&nbsp;&nbsp;&nbsp;"+row.level
                }
            },
            {
                "title": "Is Paid",
                render: function(data, type, row, meta) {
                    is_paid = row.is_paid   
                    if (is_paid == 'false') {
                        return 'NO'  
                    }else{
                        return 'Yes'
                    }
                }
            },
            {
                "title": "More",
                render: function(data, type, row) {
                    var appendVariable = ' '
                    appendVariable += '<div class="table-data-feature">'
                    appendVariable += '<button class="item" id="edit" data-toggle="tooltip" data-placement="top" title="Edit Category"><i class="zmdi zmdi-edit"></i></button>'
                    appendVariable += '<button class="item" id="delete" data-toggle="tooltip" data-placement="top" title="Delete"><i class="zmdi zmdi-delete"></i></button>'
                    appendVariable += '</div>'
                    return appendVariable
                }
            }
        ]
    });
    $('#reward').on('click', '#edit', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#reward').dataTable().api().row(RowIndex).data();
        id   = data.id
        $('#id').val(id)
        $('#update').modal('show')
    });
    $('#reward').on('click', '#delete', async function(){
        var RowIndex = $(this).closest('tr');
        var data = $('#reward').dataTable().api().row(RowIndex).data();
        id   = data.id
        deletereward(id)
    });
}
$("#add-user-schema").click(function(e) {
    e.preventDefault();
    addusertablereward()    
});
$("#payment_button").click(function(e) {
    e.preventDefault();
    id                =   $('#id').val()
    payment_option    =   $('#payment_option').val()
    reference         =   $('#reference').val()
    var params = JSON.stringify({
            'payment_option': payment_option,
            'reference': reference,
    });
    updatereward(id,params)
});