$(document).ready(function() {
    showTable()
});
async function showTable() {
    itemMasterTable = $('#views_eligible_user').DataTable({
        "bDestroy": true,
        searching: false,
        processing: true,
        serverSide: true,
        pageLength: 50,

        ajax: function(data, callback, settings) {
            $.ajax({
                url: BASE_URL + 'admin/all_eligible_users/',
                method: 'get',
                // data: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAPIToken()
                },
                mode: 'cors',
                credentials: 'same-origin',
                success: function(result) {
                    console.log("ss",result)
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
}