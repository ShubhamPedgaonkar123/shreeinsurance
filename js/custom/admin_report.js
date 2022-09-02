$(document).ready(function() {
    listinsuarance(main_insurance_id = null, sub_insurance_id = null, data_type = "category_append")
    listofuser()
    showTable()
});
async function showTable() {
    itemMasterTable = $('#view_admin_report').DataTable({
        "bDestroy": true,
        searching: false,
        processing: true,
        serverSide: true,
        pageLength: 10,
        ajax: function(data, callback, settings) {
            $.ajax({
                url: BASE_URL + 'admin/admin_report/?page=1',
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
                "title": "User Name",
                render: function(data, type, row, meta) {
                    return row.firstname + " " + row.lastname
                }
            },
            {
                "title": "Mobile Number",
                render: function(data, type, row, meta) {
                    return row.user_mobile
                }
            },
            {
                "title": "Insurance Category",
                render: function(data, type, row, meta) {
                    main_insurance_id = row.main_insurance_id
                    sub_insurance_id = row.sub_insurance_id
                    return '<span id="#main_insurance_name"></span>'
                    listinsuarance(main_insurance_id, sub_insurance_id)
                }
            },
            {
                "title": "Insurance Sub Category",
                render: function(data, type, row, meta) {
                    main_insurance_id = row.main_insurance_id
                    sub_insurance_id = row.sub_insurance_id
                    return '<span id="#sub_insurance_name"></span>'
                    listinsuarance(main_insurance_id, sub_insurance_id)
                }
            },
            {
                "title": "Status",
                render: function(data, type, row, meta) {
                    return row.status
                }
            },
            {
                "title": "policy_no",
                render: function(data, type, row, meta) {
                    return row.policy_no
                }
            },
            {
                "title": "Download",
                render: function(data, type, row, meta) {
                    policy_document = row.policy_document
                    return '<iframe src="' + BASE_URL_FOR_IMAGE + '' + policy_document + '">'
                }
            },

        ]
    });
}