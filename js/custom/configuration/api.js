function listofscheme(data, scheme_name = null, scheme_id = null) {
    var appendVariable = ' ';
    var appendVariable2 = ' ';
    var appendVariable3 = ' ';
    length_of_data = data.length
    for (var i = 0; i < length_of_data; i++) {
        if (data[i]['name'] == scheme_name) {
            appendVariable += '<option selected value="' + data[i]['id'] + '">' + data[i]['name'] + '</option>';
        } else if (scheme_id == data[i]['id']) {
            $('#view_scheme_name').val(data[i]['name'])
            $('#view_details_description').val(data[i]['details'])
            $('#view_start_date').val(data[i]['start_date'])
            $('#view_end_date').val(data[i]['end_date'])
            $('#view_type').val(data[i]['type'])
            $('#view_reward_value_1').val(data[i]['reward_value_1'])
            $('#view_reward_value_2').val(data[i]['reward_value_2'])
            $('#view_qty').val(data[i]['qty'])
            options = data[i]['options']
            for (var j = 0; j < options.length; j++) {
                appendVariable3 += '<tr>'
                appendVariable3 += '<td>' + options[j]['category_name'] + '</td>'
                appendVariable3 += '<td>' + options[j]['qty'] + '</td>'
                appendVariable3 += '</tr>'
            }
            $('#option_append').append(appendVariable3)
        } else {
            appendVariable += '<option value="' + data[i]['id'] + '">' + data[i]['name'] + '</option>'
        }
        appendVariable2 += '<option>' + data[i]['name'] + '</option>'
    }
    $('#edit_scheme').html(appendVariable)
    $('#view_scheme').html(appendVariable)
    $('#scheme_filter').html(appendVariable)
    $('#scheme_filters').html(appendVariable2)
}
async function login(params) {
    $.ajax({
        url: BASE_URL + 'admin/login/',
        method: 'POST',
        data: params,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            $.notify("Access granted", "success");
            updateAPIToken(result.token.access);
            window.location.href = "insurancecategory.html";
            return;
        },
        error: function(data) {
            data = data.responseJSON.errors.non_field_errors
            for (var i = 0; i < data.length; i++) {
                $.notify(data[i], "error");
            }
        }
    });
    // url = BASE_URL + 'admin/login/'
    // fetch(url, {
    //         method: 'POST', // or 'PUT'
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(params),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Success:', data);
    //         $.notify("Access granted", "success");
    //         updateAPIToken(result.token.access);
    //         window.location.href = "insurancecategory.html";
    //         return;
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
}
async function update_password(params) {
    $.ajax({
        url: BASE_URL + 'admin/change_password/',
        method: 'POST',
        data: params,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            $.notify("Updated Successfully", "success");
            // updateAPIToken(result.token.access);
            window.location.href = "index.html";
            return;
        },
        error: function(data) {
            // console.log()
            $.notify(data.responseJSON.errors.detail, "error");
            // data = data.responseJSON.errors.non_field_errors
            // for (var i = 0; i < data.length; i++) {
            // }
        }
    });
}
async function createsubinsurancecategory(params) {
    $.ajax({
        url: BASE_URL + 'admin/add_subcategory/',
        method: 'POST',
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            alert('data added');
            return true;
        },
        error: function(data) {
            // alert(data);
            console.log(data);
            return false;
        }
    });
}
async function createinsurance(params) {

    $.ajax({
        url: BASE_URL + 'admin/create_insurance/',
        method: 'POST',
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            alert('data added');
            return true;
        },
        error: function(data) {
            // alert(data);
            console.log(data);
            return false;
        }
    });
}
async function updatesubcategory(params) {

    $.ajax({
        url: BASE_URL + 'admin/update_subcategory/',
        method: 'PATCH',
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            alert('data added');
            return true;
        },
        error: function(data) {
            // alert(data);
            console.log(data);
            return false;
        }
    });
}

function addusertablereward() {
    $.ajax({
        url: BASE_URL + 'admin/add_to_reward/',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            $.notify('Added Successfully', 'success')
        },
        error: function(data) {
            $.notify('Failed to Added user  in reward table', 'error')
        }
    });
}

function updateschemereferral(params, id) {
    $.ajax({
        url: BASE_URL + 'admin/admin_scheme_referral_update/' + parseInt(id),
        method: 'PATCH',
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            $.notify('Scheme Status updated Successfully', 'success')
            $('#editschemamediumModal').modal('hide')
        },
        error: function(data) {
            $.notify('Failed to updated  Scheme Status', 'error')
        }
    });
}

function update_sub_insurance_list(data, main_insurance_id) {
    var length = data.length;
    var appendVariable = ''
    console.log("data", data)
    $("#edit_sub_category").html(appendVariable)
    for (var i = 0; i < length; i++) {
        subcategories = data[i]['subcategories']
        if (main_insurance_id != null && main_insurance_id == data[i]['id']) {
            for (var j = 0; j < subcategories.length; j++) {
                appendVariable += '<option  value=' + subcategories[j]['id'] + '>' + subcategories[j]['name'] + '</option>'
            }
        }
    }
    $("#edit_sub_category").html(appendVariable)
}

function deletecategory(name) {
    condition_url = 'admin/delete_category/name=' + name
    $.ajax({
        url: BASE_URL + condition_url,
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            console.log('data', result)
            $.notify("Category Deleted Successfully", "warn");
        },
        error: function(data) {}
    });
}

function createinsurancelist(data, main_insurance_id = null, sub_insurance_id = null, data_type = null) {
    var length = data.length;
    var appendVariable = ''
    // second append variable
    var appendVariable2 = ''
    var sub_appendVariable2 = ''
    for (var i = 0; i < length; i++) {
        //---------------------------------------------------------------------------------- 
        subcategories = data[i]['subcategories']
        name = capitalizeFirstLetter(data[i]['name'])
        appendVariable += '<option value=' + data[i]['id'] + '>' + name + '</option>'
        if (main_insurance_id != null && sub_insurance_id != null) {
            $('#main_insurance_name').html(data[i]['name'])
            subcategories = data[i]['subcategories']
            for (var j = 0; j < subcategories.length; j++) {
                if (subcategories[j]['id'] == sub_insurance_id) {
                    $('#sub_insurance_name').html(subcategories[j]['name'])
                }
            }
        }
        //----------------------------------------------------------------------------------
        if (main_insurance_id != null && data_type != null) {
            if (data[i]['id'] == main_insurance_id) {
                appendVariable2 += '<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'
                for (var j = 0; j < subcategories.length; j++) {
                    if (subcategories[j]['id'] == sub_insurance_id) {
                        sub_appendVariable2 += '<option selected value=' + subcategories[j]['id'] + '>' + subcategories[j]['name'] + '</option>'
                    } else {
                        sub_appendVariable2 += '<option  value=' + subcategories[j]['id'] + '>' + subcategories[j]['name'] + '</option>'
                    }
                }
            } else {
                appendVariable2 += '<option value=' + data[i]['id'] + '>' + data[i]['name'] + '</option>'
            }
        }
    }
    // $('#category_id').html(appendVariable)
    // $('.js-example-basic-single').select2();
    $('#edit_category').html(appendVariable2)
    $('#edit_sub_category').html(sub_appendVariable2)
}

function append_category_list(data) {
    var length = data.length;
    var appendVariable = '';
    appendVariable += '<option value="">Please Select Category</option>'
    for (var i = 0; i < length; i++) {
        //---------------------------------------------------------------------------------- 
        subcategories = data[i]['subcategories']
        name = capitalizeFirstLetter(data[i]['name'])
        appendVariable += '<option value=' + data[i]['id'] + '>' + name + '</option>'
        //----------------------------------------------------------------------------------
    }
    $('#category_id').html(appendVariable)
    $('#edit_category').html(appendVariable)
    $('.js-example-basic-single').select2();
}

function appendlistofuser(data) {
    var appendVariable = ''
    appendVariable += '<option value="">Please Select User List</option>'
    for (var i = 0; i < data.length; i++) {
        appendVariable += '<option value="' + data[i]['fcm_key'] + '" >' + data[i]['firstname'] + '&nbsp;' + data[i]['lastname'] + ' </option>'
    }
    $('#user_id').html(appendVariable)
}

function listofuser() {
    condition_url = 'admin/userfilter/?'
    $.ajax({
        url: BASE_URL + condition_url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            data = result.results
            appendlistofuser(data)
        },
        error: function(data) {}
    });
}

function listinsuarance(main_insurance_id = null, sub_insurance_id = null, data_type = null) {
    if (main_insurance_id != null && sub_insurance_id != null && data_type != null) {
        condition_url = 'admin/get_category'
    } else if (main_insurance_id != null && sub_insurance_id != null) {
        condition_url = 'admin/get_category?id=' + main_insurance_id
    } else if (main_insurance_id != null && data_type == 'update_sub_category') {
        condition_url = 'admin/get_category?id=' + main_insurance_id
    } else {
        condition_url = 'admin/get_category'
    }
    $.ajax({
        url: BASE_URL + condition_url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            if (data_type === 'scheme_referal') {
                createinsurancelist(result.results, main_insurance_id, sub_insurance_id, data_type)
            } else if (main_insurance_id != null && data_type === 'update_sub_category') {
                update_sub_insurance_list(result.results, main_insurance_id, data_type)
            } else if (main_insurance_id != null && sub_insurance_id != null) {
                createinsurancelist(result.results, main_insurance_id, sub_insurance_id)
            } else if (data_type == "category_append") {
                append_category_list(result.results)
            } else {
                console.log("ssasfasfgasfgadgdgasgashqwryhawrhaerssagasg")
                createinsurancelists(result.results)
            }
        },
        error: function(data) {}
    });
}

function getscheme(scheme_name = null, scheme_id = null) {
    // if (scheme_name != null) {
    // condition_url = 'admin/get_schemes/?page=1&name='+scheme_name
    // }else{
    condition_url = 'admin/get_schemes/?page=1'
    // }
    $.ajax({
        url: BASE_URL + condition_url,
        method: 'get',
        // data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            if (scheme_name != null) {
                listofscheme(result.results, scheme_name)
            } else if (scheme_id != null) {
                listofscheme(result.results, scheme_name = null, scheme_id)
            } else {
                listofscheme(result.results)
            }
        },
        error: function(data) {
            // alert(data);
            console.log(data);
            return false;
        }
    });
}

function addschemereferraladmin(argument) {
    $.ajax({
        url: BASE_URL + 'admin/create_scheme_referral/',
        method: 'post',
        data: argument,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            $.notify('Scheme Referral Created Successfully', 'success')
            $('#addschemeModal').modal('hide')
        },
        error: function(data) {
            $.notify('Failed to upload scheme', "error");
            $('#addschemeModal').modal('hide')
        }
    });
}

function createscheme(params) {
    $.ajax({
        url: BASE_URL + 'admin/add_schemes/',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            $.notify('Scheme Created Successfully', 'success')
            $('#mediumModal').modal('hide')
        },
        error: function(data) {
            $.notify('Failed to upload scheme', "error");
            $('#mediumModal').modal('hide')
        }
    });
}

function getreward() {
    $.ajax({
        url: BASE_URL + 'admin/add_schemes/',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            alert('data added')
            $('#mediumModal').modal('hide')
        },
        error: function(data) {}
    });
}

function deletereward(id) {
    $.ajax({
        url: BASE_URL + 'admin/delete_rewards/' + id,
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            alert('data added')
            $('#mediumModal').modal('hide')
        },
        error: function(data) {}
    });
}

function updatereward(id, params) {
    $.ajax({
        url: BASE_URL + 'admin/rewarded/',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        data: params,
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            if (result.hasOwnProperty('errors') == true) {
                $.notify(result.errors, 'warn')
            }
            if (result.hasOwnProperty('msg') == true) {
                $.notify(result.msg, 'success')
            }
        },
        error: function(data) {}
    });
}