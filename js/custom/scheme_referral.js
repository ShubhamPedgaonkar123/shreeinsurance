$("#modal_insurance_details").click(function() {
    $('#mediumModal').modal('show');
});
$("#update-scheme").click(function() {
    $('#editschemamediumModal').modal('show');
});
$(document).ready(function() {
    showTable()
});
async function showTable() {
    itemMasterTable = $('#views_scheme_referral').DataTable({
        "bDestroy": true,
        searching: false,
        processing: true,
        serverSide: true,
        pageLength: 10,

        ajax: function(data, callback, settings) {
            $.ajax({
                url: BASE_URL + 'admin/get_new_scheme_referral/?',
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
                        recordsFiltered: result.results.length,
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
                    return row.scheme_detail.name
                }
            },
            {

                "title": "User Name",
                render: function(data, type, row, meta) {

                    return capitalizeFirstLetter(row.first_name) + ' ' + capitalizeFirstLetter(row.last_name)
                }
            },
            {
                "title": "Email",
                render: function(data, type, row, meta) {
                    email = row.email
                    if (email == null) {
                        email = '-'
                    }
                    return email
                }
            },
            {
                "title": "Mobile",
                render: function(data, type, row, meta) {
                    return row.mobile
                }
            },
            {
                "title": "Insurance Details",
                render: function(data, type, row, meta) {
                    return '<i style="margin-left:60px;" id="modal_insurance_details" class="fa fa-eye"></i>'
                }
            },
            {
                "title": "Status",
                render: function(data, type, row, meta) {
                    return '<span >' + capitalizeFirstLetter(row.status) + '</span>'
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
    $('#views_scheme_referral').on('click', '#modal_insurance_details', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#views_scheme_referral').dataTable().api().row(RowIndex).data();
        main_insurance_id = data.main_insurance_id
        sub_insurance_id = data.sub_insurance_id
        policy_no = data.policy_no
        commission = data.commission
        requirement = data.requirement
        policy_document = data.policy_document
        if (main_insurance_id != null && sub_insurance_id != null) {
            listinsuarance(main_insurance_id, sub_insurance_id)
        } else {
            $('main_insurance_name').html('-')
            $('sub_insurance_name').html('-')
        }
        if (policy_no != null) { $("#policy_no").html(policy_no) } else { $("#policy_no").html("-") }
        if (commission != null) { $("#commission").html(commission) } else { $("#commission").html("-") }
        if (requirement != null) { $("#requirement").html(requirement) } else { $("#requirement").html("-") }
        if (policy_document != null) { $("#pdf").attr("src", BASE_URL_FOR_IMAGE + policy_document) } else { $("#pdf").html("-") }
        $("#mediumModal").modal('show');
    });
    $('#views_scheme_referral').on('click', '#edit', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#views_scheme_referral').dataTable().api().row(RowIndex).data();
        scheme_id = data.scheme_id
        id = data.id
        $('#id').val(id)
        scheme_name = data.scheme_detail.name
        status = data.status
        main_insurance_id = data.main_insurance_id
        sub_insurance_id = data.sub_insurance_id
        policy_no = data.policy_no
        $('#edit_policy_no').val(policy_no)
        if (status == 'approved') {
            $('#edit_status').html('<option value="approved" selected>Approved</option><option value="rewarded" >Rewarded</option><option value="rejected" >Rejected</option>')
        } else if (status == 'rewarded') {
            $('#edit_status').html('<option value="approved">Approved</option><option  value="rewarded" selected>Rewarded</option><option value="rejected" >Rejected</option>')
        } else {
            $('#edit_status').html('<option value="approved">Approved</option><option value="rewarded" >Rewarded</option><option value="rejected"  selected>Rejected</option>')
        }
        getscheme(scheme_name = scheme_name)
        listinsuarance(main_insurance_ids=null, sub_insurance_ids=null, data_type = "category_append")
        $('#editschemamediumModal').modal('show')
    });
    $('#views_scheme_referral').on('click', '#view_details', async function() {
        var RowIndex = $(this).closest('tr');
        var data = $('#views_scheme_referral').dataTable().api().row(RowIndex).data();
        var appendVariable = ''
        appendVariable += '<tr>'
        appendVariable += '<td>' + data['options'][0]['category_name'] + '</td>'
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

$("#update_scheme_referral").click(function(e) {
    e.preventDefault();
    var id = $('#id').val()
    var edit_scheme = $('#edit_scheme').val()
    var edit_status = $('#edit_status').val()
    var edit_category = $('#edit_category').val()
    var edit_sub_category = $('#edit_sub_category').val()
    var edit_policy_no = $('#edit_policy_no').val()
    var edit_document = $('#edit_document').val()
    if (edit_document.length == 0) {
        var params = JSON.stringify({
            'status': edit_status,
            'main_insurance_id': edit_category,
            'sub_insurance_id': edit_sub_category,
            'scheme_id': edit_scheme,
            'policy_no': edit_policy_no
        });
        console.log(params)
        updateschemereferral(params,id);
    } else {
        var document_updated = proccessData('edit_document')
        document_updated.then(value => {
            console.log(value); // 👉️ 13
            var params = JSON.stringify({
                    'status': edit_status,
                    'main_insurance_id': edit_category,
                    'sub_insurance_id': edit_sub_category,
                    'scheme_id': edit_scheme,
                    'policy_no': edit_policy_no,
                    'policy_document': value
                });
            console.log(params)
            updateschemereferral(params,id);
        });
    }
});

$("#edit_category").change(function() {
    category_value = $("#edit_category").val();
    listinsuarance(main_insurance_id = category_value, sub_insurance_id = null, data_type = "update_sub_category")
});

function listofscheme(data, scheme_name = null) {
    var appendVariable = ' ';
    length_of_data = data.length
    for (var i = 0; i < length_of_data; i++) {
        if (data[i]['name'] == scheme_name) {
            appendVariable += '<option selected value="' + data[i]['id'] + '">' + data[i]['name'] + '</option>';
        } else {
            appendVariable += '<option value="' + data[i]['id'] + '">' + data[i]['name'] + '</option>'
        }
    }
    $('#edit_scheme').html(appendVariable)
}