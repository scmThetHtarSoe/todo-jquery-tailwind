$(document).ready(function () {
  var getform = $("#form");
  var getinput = $("#list");
  var getlistgroup = $("#list-group");

  getlists = JSON.parse(localStorage.getItem("todos")); // []

  if (getlists) {
    for (let i = 0; i < getlists.length; i++) {
      addnew(getlists[i]);
    }
  }

  getform.on("submit", function (e) {
    addnew();
    e.preventDefault();
  });

  function addnew(list) {
    let gettext = getinput.val();
    if (list) {
      gettext = list.text;
    }
    if (gettext) {
      getlistgroup.append(
        `<li class="list-group-item"><input type="checkbox" name="check" class="for-check"><span class="context ml-4">${gettext}</span><i class="removeBtn" id="remove">&times</i></li>`
      );
    }

    var newli = $(".list-group-item");
    var newcheckbox = $(".for-check");
    if (list && list.done) {
      newcheckbox.prop("checked", true);
      newli.addClass("del");
    }

    updatelocalstorage();
    getinput.val("");

    //-------------
    $(".context").dblclick(function () {
      var getVal = $(this).text();
      console.log(getVal);
      var input = `<input class="form-control-edit" value="${getVal}">`;

      $(this).text("");
      $(this).append(input);
      $(".form-control-edit").focus();

      $(".form-control-edit").blur(function () {
        var val = $(this).val();
        console.log(val);
        if (val.trim() != "") {
          $(this).parent(".list-group-item .context").text(val);
        } else {
          $(this).parent(".list-group-item .context").text(getVal);
        }
        updatelocalstorage();
      });
    });
    //----------------

    var removeBtn = $(".removeBtn");
    removeBtn.on("click", function () {
      $(this).parent().remove();
      updatelocalstorage();
    });

    //-------------------
    newcheckbox.click(function () {
      if ($(this).is(":checked")) {
        $(this).parent().addClass("del");
        updatelocalstorage();
      } else {
        $(this).parent().removeClass("del");
        updatelocalstorage();
      }
    });
    //------------------------------
  }

  function updatelocalstorage() {
    const getlis = $(".list-group-item");
    const getcontext = $(".context");

    var todos = [];

    if (getcontext) {
      for (let i = 0; i < getlis.length; i++) {
        todos.push({
          text: getcontext[i].textContent,
          done: getlis[i].classList.contains("del"), // true false
        });
      }
    }
    // --------------------
    var somethingunique = todos.filter(function (getlist) {
      return getlist.done == false;
    });
    $("#zero").text(somethingunique.length);
    //-------------------------
    if (somethingunique.length == "0") {
      $("#checkAll").text("Uncheck All");
    } else {
      $("#checkAll").text("Check All");
    }

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // For All Btn
  $("#all").click("click", function () {
    var getlists = $(".list-group-item");
    if (getlists) {
      getlists.each(function (i) {
        $(this).removeClass("remove");
      });
    }
  });

  // For Done Btn
  $("#done").click(function () {
    var getlists = $(".list-group-item");
    if (getlists) {
      getlists.each(function (i) {
        $(this).addClass("remove");
        if ($(this).hasClass("del")) {
          $(this).removeClass("remove");
        }
      });
    }
  });

  // For NotDone Btn
  $("#notdone").click("click", function () {
    var getlists = $(".list-group-item");
    if (getlists) {
      getlists.each(function (i) {
        $(this).addClass("remove");
        if (!$(this).hasClass("del")) {
          $(this).removeClass("remove");
        }
      });
    }
  });

  // For All Clear Done
  $("#cleardone").click("click", function () {
    var getlists = $(".list-group-item");
    if (getlists) {
      getlists.each(function (i) {
        if ($(this).hasClass("del")) {
          $(this).remove();
          updatelocalstorage();
        }
      });
    }
  });

  // For Check All Btn
  $("#checkAll").click("click", function () {
    if ($("#checkAll").text().trim() == "Check All") {
      var getlists = $(".list-group-item");
      getlists.each(function () {
        if (!$(this).hasClass("del")) {
          $(this).addClass("del");
        }
        $(this).children().prop("checked", true);
      });
      $("#checkAll").text("Uncheck All");
      updatelocalstorage();
    } else {
      var getlists = $(".list-group-item");
      getlists.each(function () {
        if ($(this).has(".del")) {
          $(this).removeClass("del");
        }
        $(this).children().prop("checked", false);
      });

      $("#checkAll").text("Check All");
      updatelocalstorage();
    }
  });
});
