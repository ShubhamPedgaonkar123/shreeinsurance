async function login(params) {
    // $.ajax({
    //     url: BASE_URL + 'admin/login/',
    //     method: 'POST',
    //     data: params,
    //     headers: { 'Content-Type': 'application/json' },
    //     mode: 'cors',
    //     credentials: 'same-origin',
    //     success: function(result) {
    //         $.notify("Access granted", "success");
    //         updateAPIToken(result.token.access);
    //         window.location.href = "insurancecategory.html";
    //         return;
    //     },
    //     error: function(data) {
    //         data = data.responseJSON.errors.non_field_errors
    //         for (var i = 0; i < data.length; i++) {
    //             $.notify(data[i], "error");
    //         }
    //     }
    // });
    url = BASE_URL + 'admin/login/'
    fetch(url, {
            method: 'POST', // or 'PUT'
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            $.notify("Access granted", "success");
            updateAPIToken(result.token.access);
            window.location.href = "insurancecategory.html";
            return;
        })
        .catch((error) => {
            console.error('Error:', error);
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
            alert('data added')
            $('#mediumModal').modal('hide')
        },
        error: function(data) {}
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
    for (var i = 0; i < length; i++) {
        //---------------------------------------------------------------------------------- 
        subcategories = data[i]['subcategories']
        name = capitalizeFirstLetter(data[i]['name'])
        appendVariable += '<option value=' + data[i]['id'] + '>' + name + '</option>'
        //----------------------------------------------------------------------------------
    }
    $('#category_id').html(appendVariable)
    $('.js-example-basic-single').select2();
}

function appendlistofuser(data) {
    var appendVariable = ''
    for (var i = 0; i < data.length; i++) {
        appendVariable += '<option value' + data[i]['id'] + '>' + data[i]['firstname'] + '&nbsp;' + data[i]['lastname'] + ' </option>'
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
            if (main_insurance_id != null && data_type === 'scheme_referal') {
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

function getscheme(scheme_name = null) {
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
            }
        },
        error: function(data) {
            // alert(data);
            console.log(data);
            return false;
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
            alert('data added')
            $('#mediumModal').modal('hide')
        },
        error: function(data) {}
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
        url: BASE_URL + 'admin/update_rewards/' + id,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAPIToken()
        },
        data: params,
        mode: 'cors',
        credentials: 'same-origin',
        success: function(result) {
            alert('data added')
            $('#mediumModal').modal('hide')
        },
        error: function(data) {}
    });
}