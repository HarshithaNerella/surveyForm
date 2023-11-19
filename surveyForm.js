document.addEventListener('DOMContentLoaded',() =>{
    const surveyForm=document.getElementById('surveyForm');
    const resetBtn=document.getElementById('resetBtn');
    const selectDrop=document.querySelector('#country');
    const genderChcekBoxes=surveyForm.querySelectorAll('.genderEl');

    fetch("https://restcountries.com/v3.1/all").then(response => {
        return response.json();
    }).then(data =>{
        console.log(data)
        data.sort((a,b)=>a.name.common.localeCompare(b.name.common))
        let output=""
        data.forEach(country => {
            console.log(country.name.common)
             output +=`<option>${country.name.common}</option>`
         })
        selectDrop.innerHTML=output;
    }).catch(err =>{
        console.log(err)
    })

    
    surveyForm.addEventListener('submit',function (event){
        const atleastOneChecked=Array.from(genderChcekBoxes).some(checkbox => checkbox.checked);
        let isGenderChecked=false;
        genderChcekBoxes.forEach(checkbox => {
            if(checkbox.checked){
                isGenderChecked=true;
            }
        })

        if(!isGenderChecked){
            event.preventDefault();
            alert('Please select a gender.')
        }
        const requiredInputs=surveyForm.querySelectorAll('[required]');
        let isValid=true;
        requiredInputs.forEach(input =>{
            if(input.value.trim()===''){
                input.classList.add('highlight');
                isValid=false;
            }
            else{
                input.classList.remove('highlight');
            }
        });
        if(!isValid){
            event.preventDefault();
        }
    })
    resetBtn.addEventListener('click',function(){
        surveyForm.reset();
        genderChcekBoxes.forEach(checkbox =>{
            checkbox.checked=false;
        })
    })

}) 