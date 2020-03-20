// menu
$(".child1")
  .prev()
  .click(function() {
    $(this)
      .next()
      .slideToggle();
    if (
      $(this)
        .find(".hidebar_icon")
        .attr("src") != "../images/show2.png"
    ) {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/show2.png");
    } else {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/hide2.png");
    }
  });
$(".child2")
  .prev()
  .click(function() {
    $(this)
      .next()
      .slideToggle();
    if (
      $(this)
        .find(".hidebar_icon")
        .attr("src") != "../images/show2.png"
    ) {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/show2.png");
    } else {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/hide2.png");
    }
  });
$(".child3")
  .prev()
  .click(function() {
    $(this)
      .next()
      .slideToggle();
    if (
      $(this)
        .find(".hidebar_icon")
        .attr("src") != "../images/show2.png"
    ) {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/show2.png");
    } else {
      $(this)
        .find(".hidebar_icon")
        .attr("src", "../images/hide2.png");
    }
  });
// hover
var hover_arrow;
var hover_icon;
$(".hidebar_icon")
  .parent()
  .hover(
    function() {
      hover_arrow = $(this)
        .find(".hidebar_icon")
        .attr("src");
      hover_arrow = hover_arrow.substr(0, 14);
      hover_icon = $(this)
        .find(".scrollbarIcon")
        .attr("src");
      if (hover_icon != undefined) {
        hover_icon = hover_icon.replace(".png", "");
        $(this)
          .find(".scrollbarIcon")
          .attr("src", hover_icon + "2.png");
      }
      $(this).css("color", "red");
      $(this)
        .find(".hidebar_icon")
        .attr("src", hover_arrow + "2.png");
    },
    function() {
      hover_arrow = $(this)
        .find(".hidebar_icon")
        .attr("src");
      hover_arrow = hover_arrow.substr(0, 14);
      $(this).removeAttr("style");
      $(this)
        .find(".hidebar_icon")
        .attr("src", hover_arrow + ".png");

      if (hover_icon != undefined) {
        hover_icon = hover_icon.replace(".png", "");
        $(this)
          .find(".scrollbarIcon")
          .attr("src", hover_icon + ".png");
      }
    }
  );
