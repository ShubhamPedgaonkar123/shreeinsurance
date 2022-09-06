function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

async function converImageToBase64(inputId) {
  let image = $('#'+inputId)[0]['files']

  if (image && image[0]) {
    const reader = new FileReader();

    return new Promise(resolve => {
      reader.onload = ev => {
        resolve(ev.target.result)
      }
      reader.readAsDataURL(image[0])
    })
  }
}

async function proccessData(image =null) {
    var images
    if (image != null) {
         images = await converImageToBase64(image)
    }else{
         images = await converImageToBase64('image')
    }
    return images
}
var return_first;
function callback(response) {
  return_first = response;
  //use return_first variable here
  return return_first;
}
$("#logo").html('<img src="images/logo/logo_.png" alt="Shree" style="width:100%;height:100%;" />');
    