//root container
var currentDateEl = $('#currentDay');
var schedulerContainerEl = $('.container');
//get current date using moment menthod
var currentDate = moment();
//create h2 tag
var h2El = $('<h2>');
var divEl = $('<div>');
divEl.addClass('row');;
//assign current date to the h2 tag
h2El.text(currentDate.format('MMMM Do YYYY, dddd, hha'));
h2El.addClass('hour');

//append h2 tag to root
currentDateEl.append(h2El);

//color grey is past, red is present, and green is future
var past = '#d3d3d3';
var current = '#ff6961';
var future = '#77dd77';

//light blue is the default color when it is not in standard businness hours
var defaultColor = 'lightblue';

//standard business hours
var standardBusinessHrs = ['9am', '10am', '11am', '12pm','1pm','2pm','3pm','4pm','5pm'];

dayPlaner(defaultColor);


function dayPlaner(color){
    //get current time 
    var whatTimeIsIt = currentDate.format('ha');
        
    $.each(standardBusinessHrs, function(index, value){
    
        //create div container for textarea
        var form = $('<form>');
        form.addClass('col-12')

        //create textarea
        var textarea = $('<textarea>');;
        textarea.attr('id','textArea'+index);
        //screen layout
        textarea.css('background-color', color);
        textarea.attr('rows', '0');
        textarea.attr('cols', '60');
        textarea.css('font-size','25px');
        
        //create label for textarea
        var label = $('<label>');
        label.addClass('label');
        label.text(value);
        
        //create save button
        var button = $('<button>');
        button.addClass('button');
        button.text('Save');
        form.append(label);
        form.append(textarea);
        form.append(button);

        //append textarea to root contianer
        divEl.append(form);
        schedulerContainerEl.append(divEl);

        button.on('click', function(){
            localStorage.setItem(value,textarea.val());
        });
        textarea.text(localStorage.getItem(value));

        var i;
        //if time is not in the standard business hours, it is in light blue color
       
        if(whatTimeIsIt === value){
            //change color to red for time in the current
            textarea.css('background-color', current);

            i = index;
            //change color to grey for time in the past
            while(i > 0){
                i--;
                $('#textArea'+i).css('background-color', past);
            }
        }else{
            //change color to green for time in the future
            $('#textArea'+index).css('background-color', future);
        }
    });
}


    



   



