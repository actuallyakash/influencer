// var today = new Date();
// var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
// var time = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
// var dateTime = date+' '+time;
// alert(dateTime);

$('#feedback-form-submit').on('click', function(e){
    e.preventDefault();
    var feedback = $('#feedback').val();
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    var feedbackDate = date;
    var feedbackTime = time;
    
    var request = $.ajax({
         type: "POST",
         url: "https://docs.google.com/forms/d/e/1FAIpQLSfrEbCp5tyPz7y8yX1aYahFNWgeXwAob6Jqckr7KF5FJ6aqkg/formResponse",
         data: { "entry.326955045": feedback, "entry.537167745" : feedbackDate, "entry.869519460": feedbackTime  }
    });

    request.always(function(msg)
    {
         document.getElementById('feedback-form-submit').innerHTML = "Sent. <i class='thumbUp far fa-thumbs-up'></i>";
         document.getElementById('feedback').value = '';
    });
});