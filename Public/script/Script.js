function ChangeImg(){
    document.getElementById("ImgLink").click();
}

function UpdateImg(){
    let img = document.getElementById("UserImg");
    
    if (!document.getElementById("ImgLink").files[0] ||!document.getElementById("ImgLink").files[0].type.startsWith('image/')) {
        return;
    }

    let reader = new FileReader();
    reader.onload = (e)=>{
        img.src = e.target.result;
        document.getElementById("ImgLink").value = e.target.result;
    };
    reader.readAsDataURL(document.getElementById("ImgLink").files[0]);
}