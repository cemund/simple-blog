$(".delete").click(function (e) {
  e.preventDefault();
  const index = $(this).attr("data-index");
  $.ajax({
    type: "DELETE",
    url: `/${index}`,
    success: function (response) {
      window.location.href = "/";
    },
  });
});

console.log("hello");
