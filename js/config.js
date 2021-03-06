$(document).ready(function() {
    $('.Default').find('input').attr('readonly', true);
    $('.Default').find('input').css({'font-style' : 'italic', 'border':'1px solid #e0e0e0'});
     
    //        $("#tabs").tabs();
    $('#tab-side-container').easytabs({
        animate: false,
        tabActiveClass: "selected-tab",
        panelActiveClass: "displayed"
    }); 
    $("#addNewToEmail").click(function(){
        var htmlStr  = "<td><input  style=\"width: 150px;\" name=\"data[to_emails]["+ (parseInt($('.table_to_emails tr:last').index())+1) +"][name]\" value=\"\" /></td>";
        htmlStr += "<td><input  style=\"width: 150px;\" name=\"data[to_emails]["+ (parseInt($('.table_to_emails tr:last').index())+1) +"][email]\" value=\"\" /></td>";
        $('.table_to_emails tr:last').after('<tr>'+ htmlStr + '</tr>');
        return false;
    })
    $("#removeToEmail").click(function(){
        if($('.table_to_emails tr:last').index() > 1 ){
            $('.table_to_emails tr:last').remove();
        }
        return false;
    });
    /* extensions */
    $("#addExtensions").click(function(){
        var trIndex = parseInt($('.table_extensions tr:last').index())+1;
        var htmlStr  = "<td><input id=\"data["+trIndex+"][extensions]\" style=\"width: 150px;\" name=\"data[upload]["+ trIndex +"][extensions]\" value=\"\" />\n\
                            <a href=\"#\"  class=\"removeExtensions\" data-tr_index=\""+ trIndex +"\" href=\"#\" style=\"display:none; padding-left: 5px\"><img src=\"/images\/delete.png\"  /> </a>    </td>";
        var content = "<tr id=\"tr_"+ trIndex +"\">"+ htmlStr + '</tr>';
        if(trIndex == 0){
            $('.table_extensions').append(content);
        }else{
            $('.table_extensions tr:last').after(content);
        }
            
        return false;
    })
    $('.table_extensions tr').live('mouseover mouseout',function(event){
        if (event.type == 'mouseover') {
            $(this).find("a.removeExtensions").show();
        } else {
            $(this).find("a.removeExtensions").hide();
        }
    });

    $("a.removeExtensions").live("click", function(){  
        $('.table_extensions #tr_'+$(this).data('tr_index')).remove();
        return false; 
    });
    /* mimetypes */
    $("#addMimetypes").click(function(){
        var trIndex = parseInt($('.table_mimetypes tr:last').index())+1;
        var htmlStr  = "<td><input id=\"data["+trIndex+"][mimetypes]\" style=\"width: 150px;\" name=\"data[upload]["+ trIndex +"][mimetypes]\" value=\"\" />\n\
        <a href=\"#\"  class=\"removeMimetypes\" data-tr_index=\""+ trIndex +"\" href=\"#\" style=\"display:none; padding-left: 5px\"><img src=\"/images\/delete.png\"  /> </a>    </td>";
        var content = "<tr id=\"tr_"+ trIndex +"\">"+ htmlStr + '</tr>';
        if(trIndex == 0){
            $('.table_mimetypes').append(content);
        }else{
            $('.table_mimetypes tr:last').after(content);
        }
        return false;
    })
        
    $('.table_mimetypes tr').live('mouseover mouseout',function(event){
        if (event.type == 'mouseover') {
            $(this).find("a.removeMimetypes").show();
        } else {
            $(this).find("a.removeMimetypes").hide();
        }
    });
    $("a.removeMimetypes").live("click", function(){  
        $('.table_mimetypes #tr_'+$(this).data('tr_index')).remove();
        return false; 
    });
        
    /***************    *******/
        
    $(".hcms_button").click(function(){
        var data = $(".panel-container").find(".displayed").find("form").serialize();
        var editUrl =  $(".panel-container").find(".displayed").find("form").attr('action') +"/tab/" + $(".panel-container").find(".displayed").attr('id');
        saveConfig(editUrl, data);
        return false;
    });
    
    
    /*FB OG property setinngs */
    var fileInputImg = ("#data\\[image\\]");
    var opts = {};
    opts.fileWebRoot = window.fileWebRoot;
    opts.initPath = $(fileInputImg).val();
    opts.extensions = "gif,png,jpg,jpeg";
    opts.maxwidth = 400;
    opts.maxheight = 400;
    opts.minwidth = 200;
    opts.minheight = 200;
  
    $(fileInputImg).imagebrowserdialog(opts);
    $("#imageClear").click(function (e) {
        e.preventDefault();
        $('#data\\[image\\]').val("");
        return false;
    });
    
});
    
function saveConfig(editUrl, data){
    $(".error").remove();
    $.ajax({
        url: editUrl,
        type: "POST",
        data: data, 
        success: function(res){
            if(res.success){
                    $.flashMessenger(res.message,{clsName:"ok"});
            }else{
                var errors = {};
                ajaxForm.parseErrors('data',null,res['message'],errors);
                for(var field in errors){
                    var errorUl = '<ul class="error">';
                    for(var i = 0; i < errors[field].length; i++){
                        errorUl += '<li>' + errors[field][i] + '</li>';
                    }
                    errorUl += '</ul>';
                    $(ajaxForm.jqId(field)).parent().append(errorUl);
                }
            }
        }
    });
}


