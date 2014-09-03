$(document).ready(function() {
    // Globals
    var addTop = 1.25;
    var addBottom = 1.25;
    var addLeft = 1.25;
    var addRight = 1.25;

    // Hides banner form fields on load
    $("#topsize").hide();
    $("#bottomsize").hide();
    $("#leftsize").hide();
    $("#rightsize").hide();
    $("#cutfile").hide();
    $("#psv_rigid").hide();
    $("#bottomtag").hide();



    //  Shows the from that you want to use when you pick the type from drop down 
    $("#choosetype").change(function() {
        var n = $("#choosetype").val();
        //	   alert(n);
        if (n === "PSV") {
            $("#banner").hide();
            $("#prosize").hide();
            $("#cutfileheaderb").hide();
            $("#cutfile").show();
            $("#psv_rigid").show();
            $("#bottomtag").show();
            $("#cutfileheader").show();
            $("#enter_size").html("Enter Your Size");
        }
        if (n === "Banner") {
            $("#banner").show();
            $("#prosize").show();
            $("#cutfile").hide();
            $("#psv_rigid").hide();
            $("#bottomtag").hide();
            $("#enter_size").html("Enter Your Final Size");
        }
        if (n === "Rigid") {
            $("#banner").hide();
            $("#prosize").hide();
            $("#bottomtag").hide();
            $("#cutfileheader").hide();
            $("#cutfile").show();
            $("#psv_rigid").show();
            $("#cutfileheaderb").show();
            $("#enter_size").html("Enter Your Final Size");
        }
    });


    // Calculates the Sq.Ft.
    $("#size").change(function() {
        //function doSomeMath() {
        var h = $("newheight").val;
        var w = $("newwidth").val;
        if (h > 0 && w > 0)
        {
            out.value = ((h * w) / 144).toFixed(0) + " SqFt";
        }

    });

    // Shows or hides pocket size based on choice of Hem	
    $("#toptype").change(function() {
        var n = $("#toptype").val();
        if (n === "Hem") {
            $("#topsize").hide();
        }
        else {
            $("#topsize").show();
        }
    });

    // Shows or hides pocket size based on choice of Hem
    $("#bottomtype").change(function() {
        var n = $("#bottomtype").val();
        if (n === "Hem") {
            $("#bottomsize").hide();
        }
        else {
            $("#bottomsize").show();
        }
    });

    // Shows or hides pocket size based on choice of Hem
    $("#lefttype").change(function() {
        var n = $("#lefttype").val();
        if (n === "Hem") {
            $("#leftsize").hide();
        }
        else {
            $("#leftsize").show();
        }
    });

    // Shows or hides pocket size based on choice of Hem
    $("#righttype").change(function() {
        var n = $("#righttype").val();
        if (n === "Hem") {
            $("#rightsize").hide();
        }
        else {
            $("#rightsize").show();
        }
    });

    // Calcs Top Need to Add for Bleed and White
    $("#toptype, #topsize, #topbleed").change(function() {
        var t = $("#toptype").val(); // Top Pocket Type
        var o = $("#topsize").val(); // Top Pocket Opening
        var b = $("#topbleed").val(); // Top Bleed Value
        if (t === "Hem") {
            $("#topwhite").html(1.25 - b);
            addTop = (1.25);
        }
        else {
            $("#topwhite").html((o - b) + 1);
            addTop = (Number(o) + 1);
        }
    });

    // Calcs Bottom Need to Add for Bleed and White
    $("#bottomtype, #bottomsize, #bottombleed").change(function() {
        var t = $("#bottomtype").val(); // Top Pocket Type
        var o = $("#bottomsize").val(); // Top Pocket Opening
        var b = $("#bottombleed").val(); // Top Bleed Value
        if (t === "Hem") {
            $("#bottomwhite").html(1.25 - b);
            addBottom = (1.25);
        }
        else {
            $("#bottomwhite").html((o - b) + 1);
            addBottom = (Number(o) + 1);
        }
    });

    // Calcs Left Need to Add for Bleed and White
    $("#lefttype, #leftsize, #leftbleed").change(function() {
        var t = $("#lefttype").val(); // Top Pocket Type
        var o = $("#leftsize").val(); // Top Pocket Opening
        var b = $("#leftbleed").val(); // Top Bleed Value
        if (t === "Hem") {
            $("#leftwhite").html(1.25 - b);
            addLeft = (1.25);
        }
        else {
            $("#leftwhite").html((o - b) + 1);
            addLeft = (Number(o) + 1);
        }
    });

    // Calcs Right Need to Add for Bleed and White
    $("#righttype, #rightsize, #rightbleed").change(function() {
        var t = $("#righttype").val(); // Top Pocket Type
        var o = $("#rightsize").val(); // Top Pocket Opening
        var b = $("#rightbleed").val(); // Top Bleed Value
        if (t === "Hem") {
            $("#rightwhite").html(1.25 - b);
            addRight = (1.25);
        }
        else {
            $("#rightwhite").html((o - b) + 1);
            addRight = (Number(o) + 1);
        }
    });

    // Calcs Prodcution Height
    $("#newheight, #toptype, #topsize, #topbleed, #bottomtype, #bottomsize, #bottombleed").change(function() {
        var h = $("#height").val(); // Height
        var hp = Number(h);
        var top = Number(addTop);
        var bot = Number(addBottom);
        if (h > 0)
        {
            $("#pheight").val(top + bot + hp);
        }
    });

    // Calcs Production Width
    $("#newwidth, #width, #lefttype, #leftsize, #leftbleed, #righttype, #rightsize, #rightbleed").change(function() {
        var w = $("#width").val(); // Width
        var wp = Number(w);
        var left = Number(addLeft);
        var right = Number(addRight);
        if (w > 0)
        {
            $("#pwidth").val(left + right + wp);
        }
    });

    // Calcs PSV and Rigid Height
    $("#newheight").change(function() {
        var h = $("#height").val(); // Height
        var hp = Number(h);
        var top = Number(.125);
        var bot = Number(.125);
        if (h > 0)
        {
            $("#psize_height").val(top + bot + hp);
            $("#csize_height").val(hp);
        }
    });

    // Calcs PSV and Rigid Width
    $("#newwidth").change(function() {
        var w = $("#width").val(); // Width
        var wp = Number(w);
        var left = Number(.125);
        var right = Number(.125);
        if (w > 0)
        {
            $("#psize_width").val(left + right + wp);
            $("#csize_width").val(wp);
        }
    });
    $("#newheight").change(function() {

        var heightChangeValue = $("#newheight").val();
        //var heightChangeValue="71'  21''";
        //alert("heloo: "+heightChangeValue);

        // 5' 9''
        var rexBothFeetInchesFormat = /^(\d+)'\s*(\d+(.\d+)?)''$/;
        var matchOne = rexBothFeetInchesFormat.exec(heightChangeValue);

        // 5' 99"
        var rexBothFeetInchesButDoubleQuotesOnInchFormat = /^(\d+)'\s*(\d+(.\d+)?)"$/;
        var matchTwo = rexBothFeetInchesButDoubleQuotesOnInchFormat.exec(heightChangeValue);

        // Just FEET -> 5'
        var rexFeetFormat = /^(\d+)'\s*$/;
        var matchThree = rexFeetFormat.exec(heightChangeValue);


        // Just INCHES : 5''
        var rexInchDoubleSingleQuotesFormat = /^\s*(\d+(.\d+)?)''$/;
        var matchFour = rexInchDoubleSingleQuotesFormat.exec(heightChangeValue);

        // Just INCHES -> 5"
        var rexInchDoubleQuotesFormat = /^\s*(\d+(.\d+)?)"$/;
        var matchFive = rexInchDoubleQuotesFormat.exec(heightChangeValue);

        var rexInchNumberFormat = /^\s*(\d+(.\d+)?)$/;
        var matchSix = rexInchNumberFormat.exec(heightChangeValue);


        //alert("heloo2 "+matchSix);


        //alert("heloo3 ");
        if (matchOne)
        {
            //alert("heloo4 ");
            var feet = parseFloat(matchOne[1]);
            var inch = parseFloat(matchOne[2]);
            //alert("Feet1 "+feet+" "+"inch1 "+inch);  
        }
        else if (matchTwo)
        {
            var feet = parseFloat(matchTwo[1]);
            var inch = parseFloat(matchTwo[2]);
            //alert("Feet2 "+feet+" "+"inch2 "+inch);

        }
        else if (matchThree)
        {
            var feet = parseFloat(matchThree[1]);

            //alert("Feet3 "+feet+" "+"inch3 "+inch);
        }
        else if (matchFour)
        {
            var inch = parseFloat(matchFour[1]);

        }
        else if (matchFive)
        {
            var inch = parseFloat(matchFive[1]);

        }
        else if (matchSix)
        {
            var inch = parseFloat(matchSix[1]);
            //alert();
        }
        else if (heightChangeValue === null || heightChangeValue === "")
        {
            feet = 0;
            inch = 0;



        }
        else
        {
            //alert(heightChangeValue);
            alert("Please enter a valid Height");

        }

        var feetConvertedInches;
        var totalHeightInInches;
        if (!isNaN(feet))
        {
            feetConvertedInches = feet * 12;
            if (!isNaN(inch))
            {
                totalHeightInInches = feetConvertedInches + inch;

            }
            else
            {
                totalHeightInInches = feetConvertedInches;
            }

        }
        else
        {
            totalHeightInInches = inch;

        }
        //alert("Total : "+totalHeightInInches);

        if (!isNaN(totalHeightInInches))
        {
            //if number store that value in the hidden field and display the number in feet inches format.
            var heightFullFeet = parseFloat(totalHeightInInches) / 12;
            //alert("hi"+$("#n_Height").val());

            var heightJustFeet = Math.floor(heightFullFeet);

            var heightJustFeetInInches = parseFloat((heightFullFeet - heightJustFeet) * 12).toFixed(2);

            var heightFeetInInchesArr = heightJustFeetInInches.split(".");

            if (heightFeetInInchesArr[0] === "0")
            {
                heightJustFeetInInches = "." + heightFeetInInchesArr[1];

            }
            if (heightFeetInInchesArr[1] === "00")
            {
                heightJustFeetInInches = heightFeetInInchesArr[0] + "";

            }

            //n_Height in the hidden value
            $("#height").val(Number(totalHeightInInches));
            // Show the Feet' Inches'' format
            $("#newheight").val(heightJustFeet + "' " + heightJustFeetInInches + "\"");
            
            //bullshit to set the field on load cluster fuck...
            var h = $("#height").val(); // Height
            var hp = Number(h);
            var top = Number(addTop);
            var bot = Number(addBottom);
            if (h > 0)
            {
                $("#pheight").val(top + bot + hp);
            }

        }


    });
    $("#newwidth").change(function() {

        var heightChangeValue = $("#newwidth").val();
        //var heightChangeValue="71'  21''";
        //alert("heloo: "+heightChangeValue);

        // 5' 9''
        var rexBothFeetInchesFormat = /^(\d+)'\s*(\d+(.\d+)?)''$/;
        var matchOne = rexBothFeetInchesFormat.exec(heightChangeValue);

        // 5' 99"
        var rexBothFeetInchesButDoubleQuotesOnInchFormat = /^(\d+)'\s*(\d+(.\d+)?)"$/;
        var matchTwo = rexBothFeetInchesButDoubleQuotesOnInchFormat.exec(heightChangeValue);

        // Just FEET -> 5'
        var rexFeetFormat = /^(\d+)'\s*$/;
        var matchThree = rexFeetFormat.exec(heightChangeValue);


        // Just INCHES : 5''
        var rexInchDoubleSingleQuotesFormat = /^\s*(\d+(.\d+)?)''$/;
        var matchFour = rexInchDoubleSingleQuotesFormat.exec(heightChangeValue);

        // Just INCHES -> 5"
        var rexInchDoubleQuotesFormat = /^\s*(\d+(.\d+)?)"$/;
        var matchFive = rexInchDoubleQuotesFormat.exec(heightChangeValue);

        var rexInchNumberFormat = /^\s*(\d+(.\d+)?)$/;
        var matchSix = rexInchNumberFormat.exec(heightChangeValue);


        //alert("heloo2 "+matchSix);


        //alert("heloo3 ");
        if (matchOne)
        {
            //alert("heloo4 ");
            var feet = parseFloat(matchOne[1]);
            var inch = parseFloat(matchOne[2]);
            //alert("Feet1 "+feet+" "+"inch1 "+inch);  
        }
        else if (matchTwo)
        {
            var feet = parseFloat(matchTwo[1]);
            var inch = parseFloat(matchTwo[2]);
            //alert("Feet2 "+feet+" "+"inch2 "+inch);

        }
        else if (matchThree)
        {
            var feet = parseFloat(matchThree[1]);

            //alert("Feet3 "+feet+" "+"inch3 "+inch);
        }
        else if (matchFour)
        {
            var inch = parseFloat(matchFour[1]);

        }
        else if (matchFive)
        {
            var inch = parseFloat(matchFive[1]);

        }
        else if (matchSix)
        {
            var inch = parseFloat(matchSix[1]);
            //alert();
        }
        else if (heightChangeValue === null || heightChangeValue === "")
        {
            feet = 0;
            inch = 0;



        }
        else
        {
            //alert(heightChangeValue);
            alert("Please enter a valid Height");

        }

        var feetConvertedInches;
        var totalHeightInInches;
        if (!isNaN(feet))
        {
            feetConvertedInches = feet * 12;
            if (!isNaN(inch))
            {
                totalHeightInInches = feetConvertedInches + inch;

            }
            else
            {
                totalHeightInInches = feetConvertedInches;
            }

        }
        else
        {
            totalHeightInInches = inch;

        }
        //alert("Total : "+totalHeightInInches);

        if (!isNaN(totalHeightInInches))
        {
            //if number store that value in the hidden field and display the number in feet inches format.
            var heightFullFeet = parseFloat(totalHeightInInches) / 12;
            //alert("hi"+$("#n_Height").val());

            var heightJustFeet = Math.floor(heightFullFeet);

            var heightJustFeetInInches = parseFloat((heightFullFeet - heightJustFeet) * 12).toFixed(2);

            var heightFeetInInchesArr = heightJustFeetInInches.split(".");

            if (heightFeetInInchesArr[0] === "0")
            {
                heightJustFeetInInches = "." + heightFeetInInchesArr[1];

            }
            if (heightFeetInInchesArr[1] === "00")
            {
                heightJustFeetInInches = heightFeetInInchesArr[0] + "";

            }

            //n_Height in the hidden value
            $("#width").val(Number(totalHeightInInches));

            // Show the Feet' Inches'' format
            $("#newwidth").val(heightJustFeet + "' " + heightJustFeetInInches + "\"");
            //bullshit to set the field on load cluster fuck...
            var h = $("#width").val(); // Height
            var hp = Number(h);
            var top = Number(addTop);
            var bot = Number(addBottom);
            if (h > 0)
            {
                $("#pwidth").val(top + bot + hp);
            }

        }


    });
});


