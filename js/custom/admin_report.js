$(document).ready(function() {
    listinsuarance(main_insurance_id = null, sub_insurance_id = null, data_type = "category_append")
    listofuser()
    showTable()
});
$("#filter").click(function(e) {
    e.preventDefault();
    user_id=$('#user_id').val()    
    category_id =$('#category_id').val()    
    rangepicker =$('#rangepicker').val()
    console.log("user_id",user_id)    
    console.log("category_id",category_id)    
    console.log("rangepicker",rangepicker)    
    showTable(user_id,category_id,rangepicker)
});
async function showTable(user_id=null,category_id=null,rangepicker=null) {
    itemMasterTable = $('#view_admin_report').DataTable({
        "bDestroy": true,
        searching: false,
        processing: true,
        serverSide: true,
        pageLength: 10,
        ajax: function(data, callback, settings) {

            if (user_id != null || category_id !=null || rangepicker != null){
                    
                condition_url    =    BASE_URL + 'admin/admin_report/?page=1&user_id='+user_id+'&main_insurance_id='+category_id    
                
            }else{
                condition_url    =    BASE_URL + 'admin/admin_report/?page=1'
            }
            $.ajax({
                url: condition_url,
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
                    return row.first_name + " " + row.last_name
                }
            },
            {
                "title": "Mobile Number",
                render: function(data, type, row, meta) {
                    return row.mobile
                }
            },
            {
                "title": "Insurance Category",
                render: function(data, type, row, meta) {
                    return  row.main_insurance_name
                }
            },
            {
                "title": "Insurance Sub Category",
                render: function(data, type, row, meta) {
                    return row.sub_insurance_name
                }
            },
            {
                "title": "Status",
                render: function(data, type, row, meta) {
                    return row.status
                }
            },
            {
                "title": "Policy no",
                render: function(data, type, row, meta) {
                    return row.commission
           
                }
            },
            {
                "title": "Policy no",
                render: function(data, type, row, meta) {
                    return row.policy_no
                }
            },
            {
                "title": "Download",
                render: function(data, type, row, meta) {
                    policy_document = row.policy_document
                    return '<span class="badge badge-primary">View</span>'
                }
            },

        ]
    });
    $('#view_admin_report').on('click', '.badge-primary', async function(){
        var RowIndex = $(this).closest('tr');
        var data = $('#view_admin_report').dataTable().api().row(RowIndex).data();
        policy_document   = data.policy_document
        var myWindow = window.open(BASE_URL_FOR_IMAGE + policy_document, "_blank");
         // myWindow.document.write("<iframe> </iframe>");
    });
}
